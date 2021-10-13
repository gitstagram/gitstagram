import React from 'react'
import {
  useGetViewerGitstagramLibraryQuery,
  Part_Repository_With_IssuesFragment,
} from 'graphql/generated'
import {
  useCloneGitstagramLibrary,
  useUpdateRepository,
} from 'graphql/mutationWrappers'
import { getLibraryDataQueryPromise } from 'graphql/restOperations'
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

  const createGitstagramLibrary = async (
    ownerId: string,
    descriptionMetadata: string
  ): Promise<Maybe<Part_Repository_With_IssuesFragment>> => {
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
      if (err) setLoadingState('libGetFailure')
    }
  }

  useGetViewerGitstagramLibraryQuery({
    skip: loadingState !== 'initiating',
    onCompleted: async (libData) => {
      const viewer = libData?.viewer
      const repository = viewer.repository
      const headOid = repository?.defaultBranchRef?.target?.oid as string

      const descriptionMetadata = getMetadataJson(viewer.login)

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
        const fileContents = res?.data.getLibraryData.content

        if (err || !fileContents || !headOid) {
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
