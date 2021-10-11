import React from 'react'
import {
  useGetViewerGitstagramLibraryQuery,
  Part_Repository_With_IssuesFragment,
} from 'graphql/generated'
import { useCloneGitstagramLibrary, useUpdateRepository } from 'graphql/hooks'
import { useLoadingContext } from 'components/contexts/loading'
import { captureException, getMetadataJson } from 'helpers'

export const EnsureLoad = (): JSX.Element => {
  const { loadingState, setLoadingState } = useLoadingContext()
  const [cloneGitstagramLibrary] = useCloneGitstagramLibrary()
  const [updateRepository] = useUpdateRepository()

  const createGitstagramLibraryPromise = (
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
        setLoadingState('libFound')

        if (viewer.repository.description !== descriptionMetadata) {
          void updateRepository({
            variables: {
              repositoryId: viewer.repository.id,
              description: descriptionMetadata,
            },
          })
        }
      } else {
        setLoadingState('libNotFound')
        await createGitstagramLibraryPromise(viewer.id, descriptionMetadata)
      }
    },
    onError: (err) => {
      setLoadingState('libGetFailure')
      captureException(err)
    },
  })

  return <></>
}
