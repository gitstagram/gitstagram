import React from 'react'
import {
  useGetViewerGitstagramLibraryQuery,
  Part_Repository_With_IssuesFragment,
} from 'graphql/generated'
import { useCloneGitstagramLibrary, useUpdateRepository } from 'graphql/hooks'
import { getLibraryDataPromise } from 'graphql/restOperations'
import { useLoadingContext } from 'components/contexts/loading'
import * as rxVars from 'components/data/reactiveVars'
import {
  captureException,
  getMetadataJson,
  isLibraryData,
  coerceLibraryData,
  coerceB64ToJson,
} from 'helpers'

export const EnsureLoad = (): JSX.Element => {
  const { loadingState, setLoadingState } = useLoadingContext()
  const [cloneGitstagramLibrary] = useCloneGitstagramLibrary()
  const [updateRepository] = useUpdateRepository()

  const createGitstagramLibrary = (
    ownerId: string,
    descriptionMetadata: string
  ): Promise<Part_Repository_With_IssuesFragment> => {
    return new Promise((resolve, reject) => {
      cloneGitstagramLibrary({
        variables: { ownerId, description: descriptionMetadata },
      })
        .then((results) => {
          const repository = results.data?.cloneTemplateRepository?.repository

          if (repository) {
            setLoadingState('libCreateSuccess')
            resolve(repository)
          } else {
            setLoadingState('libCreateFailure')
            const msg =
              'createGitstagramLibrary mutated but received no repository'
            captureException({
              results,
              msg,
            })
            reject(msg)
          }
          return
        })
        .catch((err) => {
          setLoadingState('libCreateFailure')
          captureException(err)
          reject(err)
        })
    })
  }

  useGetViewerGitstagramLibraryQuery({
    skip: loadingState !== 'initiating',
    onCompleted: async (libData) => {
      const viewer = libData?.viewer
      const descriptionMetadata = getMetadataJson(viewer.login)

      if (viewer.repository) {
        if (viewer.repository.description !== descriptionMetadata) {
          await updateRepository({
            variables: {
              repositoryId: viewer.repository.id,
              description: descriptionMetadata,
            },
          })
        }

        const res = await getLibraryDataPromise({ userLogin: viewer.login })
        const libraryData = coerceB64ToJson(res.data.getLibraryData.content)

        if (isLibraryData(libraryData)) {
          void rxVars.writeLibraryData({ libData: libraryData, commit: false })
        } else {
          const correctedLibraryData = coerceLibraryData(libraryData)
          void rxVars.writeLibraryData({
            libData: correctedLibraryData,
            commit: true,
          })
        }

        setLoadingState('libFound')
      } else {
        setLoadingState('libNotFound')
        await createGitstagramLibrary(viewer.id, descriptionMetadata)
      }
    },
    onError: (err) => {
      setLoadingState('libGetFailure')
      captureException(err)
    },
  })

  return <></>
}
