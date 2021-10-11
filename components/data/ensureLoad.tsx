import React from 'react'
import {
  useGetViewerGitstagramLibraryQuery,
  Part_Repository_With_Issues_On_CreateRepositoryPayloadFragment,
} from 'graphql/generated'
import { useCreateGitstagramLibrary, useUpdateRepository } from 'graphql/hooks'
import { useLoadingContext } from 'components/contexts/loading'
import { captureException, getMetadataJson } from 'helpers'

type CreatedRepository =
  Part_Repository_With_Issues_On_CreateRepositoryPayloadFragment['repository']

export const EnsureLoad = (): JSX.Element => {
  const { loadingState, setLoadingState } = useLoadingContext()
  const [createGitstagramLibrary] = useCreateGitstagramLibrary()
  const [updateRepository] = useUpdateRepository()

  const createGitstagramLibraryPromise = (
    descriptionMetadata: string
  ): Promise<CreatedRepository> => {
    return new Promise((resolve, reject) => {
      createGitstagramLibrary({
        variables: { description: descriptionMetadata },
      })
        .then((results) => {
          const repository = results.data?.createRepository?.repository

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
        await createGitstagramLibraryPromise(descriptionMetadata)
      }
    },
    onError: (err) => {
      setLoadingState('libGetFailure')
      captureException(err)
    },
  })

  return <></>
}
