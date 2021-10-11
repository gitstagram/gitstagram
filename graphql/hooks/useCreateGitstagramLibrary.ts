import { gql } from '@apollo/client'
import {
  useCreateGitstagramLibraryMutation,
  GetViewerGitstagramLibraryQuery,
} from 'graphql/generated'

type MutationTuple = ReturnType<typeof useCreateGitstagramLibraryMutation>

export const useCreateGitstagramLibrary = (): MutationTuple => {
  const mutationTuple = useCreateGitstagramLibraryMutation({
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

  return mutationTuple
}
