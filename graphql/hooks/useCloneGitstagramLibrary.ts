import { gql } from '@apollo/client'
import {
  useCloneGitstagramLibraryMutation,
  GetViewerGitstagramLibraryQuery,
} from 'graphql/generated'

type MutationTuple = ReturnType<typeof useCloneGitstagramLibraryMutation>

export const useCloneGitstagramLibrary = (): MutationTuple => {
  const mutationTuple = useCloneGitstagramLibraryMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          viewer(existingViewer = {}) {
            const newViewerGitstagramLib = cache.writeFragment({
              data: data?.cloneTemplateRepository?.repository,
              fragment: gql`
                fragment NewGitstagramLibrary on Repository {
                  id
                  __typename
                }
              `,
            })
            return {
              ...existingViewer,
              'repository({"name":"gitstagram-library"})':
                newViewerGitstagramLib,
            } as GetViewerGitstagramLibraryQuery
          },
        },
      })
    },
  })

  return mutationTuple
}
