import React from 'react'
import {
  useGetViewerGitstagramLibraryQuery,
  useCreateGitstagramLibraryMutation,
  GetViewerGitstagramLibraryQuery,
} from 'graphql/generated'
import { useLoadingContext } from 'components/contexts/loading'

import { gql } from '@apollo/client'

export const EnsureLoad = (): JSX.Element => {
  const { loadingState, setLoadingState } = useLoadingContext()

  const [createGitstagramLibrary] = useCreateGitstagramLibraryMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          viewer(existingViewer = {}) {
            const newViewerGitstagramLib = cache.writeFragment({
              data: data?.createRepository?.repository,
              fragment: gql`
                fragment NewGitStagramLibrary on Repository {
                  id
                  __typename
                }
              `,
            })
            return {
              ...existingViewer,
              'repository({"name":"gitstagram-library"})':
                newViewerGitstagramLib,
            } as GetViewerGitstagramLibraryQuery['viewer']
          },
        },
      })
    },
  })

  useGetViewerGitstagramLibraryQuery({
    skip: loadingState !== 'initiating',
    onCompleted: (libData) => {
      if (!libData?.viewer.repository) {
        setLoadingState('libNotFound')

        void createGitstagramLibrary()
          .then((results) => {
            if (results.data?.createRepository?.repository?.id) {
              setLoadingState('libCreateSuccess')
            } else {
              setLoadingState('libCreateFailure')
            }
            return
          })
          .catch(() => setLoadingState('libCreateFailure'))
      } else {
        setLoadingState('libFound')
      }
    },
    onError: () => setLoadingState('libGetFailure'),
  })

  return <></>
}
