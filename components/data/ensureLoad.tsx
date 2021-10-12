import React from 'react'
import {
  useGetViewerGitstagramLibraryQuery,
  Part_Repository_With_IssuesFragment,
} from 'graphql/generated'
import { useCloneGitstagramLibrary, useUpdateRepository } from 'graphql/hooks'
import { getLibraryDataQueryPromise } from 'graphql/restOperations'
import { useLoadingContext } from 'components/contexts/loading'
import * as rxVars from 'components/data/reactiveVars'
import {
  captureException,
  getMetadataJson,
  isLibraryData,
  coerceLibraryData,
  coerceB64ToJson,
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
      const msg = !repository && 'Library cloned but not received repository'
      captureException({ err, msg })
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
      if (err) captureException(err)
    }
  }

  const ensureLibraryDataExpected = (libraryData: unknown) => {
    if (isLibraryData(libraryData)) {
      void rxVars.writeLibraryData({
        libData: libraryData,
        commit: false,
      })
    } else {
      const correctedLibraryData = coerceLibraryData(libraryData)
      void rxVars.writeLibraryData({
        libData: correctedLibraryData,
        commit: true,
      })
    }
  }

  useGetViewerGitstagramLibraryQuery({
    skip: loadingState !== 'initiating',
    onCompleted: async (libData) => {
      const viewer = libData?.viewer
      const descriptionMetadata = getMetadataJson(viewer.login)

      if (viewer.repository) {
        void ensureMetadataExpected({
          repositoryId: viewer.repository.id,
          received: viewer.repository.description,
          expected: descriptionMetadata,
        })

        const { res, err } = await async(
          getLibraryDataQueryPromise({
            userLogin: viewer.login,
          })
        )
        const fileContents = res?.data.getLibraryData.content

        if (err || !fileContents) {
          setLoadingState('libGetFailure')
          captureException(err)
          return
        }

        const libraryData = coerceB64ToJson(fileContents)
        ensureLibraryDataExpected(libraryData)
        setLoadingState('libFound')
      } else {
        void createGitstagramLibrary(viewer.id, descriptionMetadata)
      }
    },
    onError: (err) => {
      setLoadingState('libGetFailure')
      captureException(err)
    },
  })

  return <></>
}
