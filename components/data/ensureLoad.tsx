import React from 'react'
import { useSession } from 'next-auth/client'
import {
  useGetViewerGitstagramLibraryQuery,
  Part_RepositoryFragment,
} from 'graphql/generated'
import {
  useCloneGitstagramLibrary,
  useUpdateRepository,
} from 'graphql/mutationWrappers'
import {
  getLibraryDataQueryPromise,
  addStarQueryPromise,
} from 'graphql/restOperations'
import { useLoadingContext } from 'components/contexts/loading'
import {
  CommitOpts,
  writeLibraryData,
} from 'components/data/gitstagramLibraryData'
import {
  captureException,
  getMetadataJson,
  isLibraryData,
  coerceLibraryData,
  parseJsonIfB64,
  async,
  isApolloClient404,
  exceptApolloClient404,
  defaultFollowings,
  promiseReduce,
} from 'helpers'

type EnsureMetadataExpectedOpts = {
  repositoryId: string
  received: Maybe<string>
  expected: string
}

export const EnsureLoad = (): JSX.Element => {
  const { loadingState, setLoadingState } = useLoadingContext()
  const [cloneGitstagramLibrary] = useCloneGitstagramLibrary()
  const [updateRepository] = useUpdateRepository()
  const [session] = useSession()
  const viewerLogin = session?.user?.name

  const starDefaultFollowingCollection = () => {
    const defaultFollowingsPromiseCollection = defaultFollowings.map(
      (defaultFollowing) => {
        return addStarQueryPromise({ userLogin: defaultFollowing })
      }
    )
    void promiseReduce(defaultFollowingsPromiseCollection).catch(
      (err: unknown) => {
        captureException({
          err,
          msgs: ['Error following default followings'],
        })
        // No need to change state flag, metadata write failure is benign
      }
    )
  }

  const createGitstagramLibrary = async (
    ownerId: string,
    descriptionMetadata: string
  ): Promise<Maybe<Part_RepositoryFragment>> => {
    const { res, err } = await async(
      cloneGitstagramLibrary({
        variables: { ownerId, description: descriptionMetadata },
        refetchQueries: ['GetViewerGitstagramLibrary'],
      })
    )
    const repository = res?.data?.cloneTemplateRepository?.repository

    if (err || !repository) {
      setLoadingState('libCreateFailure')
      captureException({
        err,
        msgs: [
          [err, 'Error cloning template'],
          [!repository, 'Library cloned but no repository received'],
        ],
      })
      return
    }

    starDefaultFollowingCollection()

    setLoadingState('libCreateSuccess')
    return repository
  }

  const ensureMetadataExpected = async ({
    repositoryId,
    received,
    expected,
  }: EnsureMetadataExpectedOpts) => {
    if (received !== expected) {
      const { err } = await async(
        updateRepository({
          variables: {
            repositoryId,
            description: expected,
          },
        })
      )
      if (err) {
        captureException({ err, msgs: ['Metadata update failure'] })
        // No need to change state flag, metadata write failure is benign
      }
    }
  }

  const ensureLibraryDataExpected = async (
    libraryData: unknown,
    commitOpts: CommitOpts
  ) => {
    if (isLibraryData(libraryData)) {
      await writeLibraryData(libraryData)
      setLoadingState('libFound')
    } else {
      const correctedLibraryData = coerceLibraryData(libraryData)
      const { err } = await async(
        writeLibraryData(correctedLibraryData, commitOpts)
      )
      if (err) {
        setLoadingState('libGetFailure')
        captureException({ err, msgs: ['Error committing LibraryData'] })
      }
      setLoadingState('libFound')
    }
  }

  useGetViewerGitstagramLibraryQuery({
    skip: !viewerLogin || loadingState !== 'initiating',
    variables: {
      userLogin: viewerLogin as string,
    },
    onCompleted: async (libData) => {
      const viewer = libData?.viewer
      const repository = viewer.repository
      const headOid = repository?.defaultBranchRef?.target?.oid as string

      const descriptionMetadata = getMetadataJson(viewer.login, viewer.name)

      if (repository) {
        void ensureMetadataExpected({
          repositoryId: repository.id,
          received: repository.description,
          expected: descriptionMetadata,
        })

        const { res, err } = await async(
          getLibraryDataQueryPromise({
            userLogin: viewer.login,
          })
        )
        const not404Error = err && exceptApolloClient404(err)

        /*
         * Treat 404 (no gitstagram-library.json) as bad data
         *   - Set contents as arbitrary string to distinguish it from no response contents
         *   - But bad contents will invoke coercion and committing of corrected data
         */
        const fileContents = isApolloClient404(err)
          ? '404NoContent'
          : res?.data?.getLibraryData?.content

        // Only fatally terminate if err is not 404
        if (not404Error || !fileContents || !headOid) {
          setLoadingState('libGetFailure')
          captureException({
            err,
            msgs: [
              [err, 'Error fetching LibraryData'],
              [!fileContents, 'Cannot read LibraryData file contents'],
              [!headOid, 'Cannot read repository head oid'],
            ],
          })
          return
        }

        const libraryData = parseJsonIfB64(fileContents)

        void ensureLibraryDataExpected(libraryData, {
          repoWithLogin: `${viewer.login}/gitstagram-library`,
          headOid,
          commitMessage: 'Correct errors found in `gitstagram-library.json`',
        })
      } else {
        void createGitstagramLibrary(viewer.id, descriptionMetadata)
      }
    },
    onError: (err) => {
      setLoadingState('libGetFailure')
      captureException({ err, msgs: ['GetViewer Library failed'] })
    },
  })

  return <></>
}
