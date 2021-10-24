import React from 'react'
import { useSession } from 'next-auth/client'
import { useGetViewerGitstagramLibraryQuery } from 'graphql/generated'
import {
  useCloneGitstagramLibraryMutation,
  useUpdateRepositoryMutation,
  getViewerGitstagramLibraryQueryPromise,
  GetViewerGitstagramLibraryQueryPromise,
  getLibraryDataQueryPromise,
  addStarMutationPromise,
} from 'graphql/operations'
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
  wait,
} from 'helpers'

type EnsureMetadataExpectedOpts = {
  repositoryId: string
  received: Maybe<string>
  expected: string
}

export const EnsureLoad = (): JSX.Element => {
  const { loadingState, setLoadingState } = useLoadingContext()
  const [cloneGitstagramLibrary] = useCloneGitstagramLibraryMutation()
  const [updateRepository] = useUpdateRepositoryMutation()
  const [session] = useSession()
  const viewerLogin = session?.user?.name

  const starDefaultFollowingCollection = () => {
    const defaultFollowingsPromiseCollection = defaultFollowings.map(
      (defaultFollowing) => {
        return addStarMutationPromise({ userLogin: defaultFollowing })
      }
    )
    void promiseReduce(defaultFollowingsPromiseCollection).catch(
      (err: unknown) => {
        captureException({
          err,
          inside: 'EnsureLoad:starDefaultFollowingCollection',
          msgs: ['Error following default followings'],
        })
        // No need to change state flag, metadata write failure is benign
      }
    )
  }

  const createGitstagramLibrary = async (
    ownerId: string,
    ownerLogin: string,
    descriptionMetadata: string
  ): Promise<Maybe<GetViewerGitstagramLibraryQueryPromise>> => {
    const { res, err } = await async(
      cloneGitstagramLibrary({
        variables: { ownerId, description: descriptionMetadata },
      })
    )
    const repository = res?.data?.cloneTemplateRepository?.repository

    if (err || !repository) {
      setLoadingState('libCreateFailure')
      captureException({
        err,
        inside: 'EnsureLoad:createGitstagramLibrary',
        msgs: [
          [err, 'Error cloning template'],
          [!repository, 'Library cloned but no repository received'],
        ],
      })
      return
    }

    starDefaultFollowingCollection()

    // Wait required after clone, or Github defaultBranchRef returns `null`
    await wait(500)
    const { res: refetchRes, err: refetchError } = await async(
      getViewerGitstagramLibraryQueryPromise({
        variables: { userLogin: ownerLogin },
        // Force refetch to refresh from network
        fetchPolicy: 'network-only',
      })
    )

    if (refetchError) {
      setLoadingState('libGetFailure')
      captureException({
        err,
        inside: 'EnsureLoad:createGitstagramLibrary',
        msgs: ['Refetch GetViewerLibrary failed'],
      })
      return
    }

    return refetchRes
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
        captureException({
          err,
          inside: 'EnsureLoad:ensureMetadataExpected',
          msgs: ['Metadata update failure'],
        })
        // No need to change state flag, metadata write failure is benign
        return
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
        captureException({
          err,
          inside: 'EnsureLoad:ensureLibraryDataExpected',
          msgs: ['Error committing LibraryData'],
        })
        return
      }
      setLoadingState('libFound')
    }
  }

  const readAndEnsureLibraryData = async (userLogin: string) => {
    const { res, err } = await async(getLibraryDataQueryPromise({ userLogin }))
    const not404Error = err && exceptApolloClient404(err)

    /*
     * Treat 404 (no gitstagram-library.json) as bad data
     *   - Set contents as arbitrary string to distinguish it from no response contents
     *   - But bad contents will invoke coercion and committing of corrected data
     */
    const fileContents = isApolloClient404(err)
      ? '404NoContent'
      : res?.data?.libraryData?.content

    // Only fatally terminate if err is not 404
    if (not404Error || !fileContents) {
      setLoadingState('libGetFailure')
      captureException({
        err,
        inside: 'EnsureLoad:readAndEnsureLibraryData',
        msgs: [
          [err, 'Error fetching LibraryData'],
          [!fileContents, 'Cannot read LibraryData file contents'],
        ],
      })
      return
    }

    const libraryData = parseJsonIfB64(fileContents)

    void ensureLibraryDataExpected(libraryData, {
      commitMessage: 'Correct errors found in `gitstagram-library.json`',
    })
  }

  useGetViewerGitstagramLibraryQuery({
    skip: !viewerLogin || loadingState !== 'initiating',
    variables: {
      userLogin: viewerLogin as string,
    },
    onCompleted: async (libData) => {
      const viewer = libData?.viewer
      const repository = viewer.repository
      const descriptionMetadata = getMetadataJson(viewer.login, viewer.name)

      if (repository) {
        void ensureMetadataExpected({
          repositoryId: repository.id,
          received: repository.description,
          expected: descriptionMetadata,
        })

        void readAndEnsureLibraryData(viewer.login)
      } else {
        const gitstagramLibraryData = await createGitstagramLibrary(
          viewer.id,
          viewer.login,
          descriptionMetadata
        )
        if (gitstagramLibraryData) void readAndEnsureLibraryData(viewer.login)
      }
    },
    onError: (err) => {
      setLoadingState('libGetFailure')
      captureException({
        err,
        inside: 'EnsureLoad:onErrorCallback',
        msgs: ['GetViewerLibrary failed'],
      })
    },
  })

  return <></>
}
