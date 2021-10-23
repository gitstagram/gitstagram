import { gql } from '@apollo/client'
import {
  useCloneGitstagramLibraryMutation as genUseCloneGitstagramLibraryMutation,
  GetViewerGitstagramLibraryQuery,
} from 'graphql/generated'

type MutationTuple = ReturnType<typeof genUseCloneGitstagramLibraryMutation>

export const useCloneGitstagramLibraryMutation = (): MutationTuple => {
  const mutationTuple = genUseCloneGitstagramLibraryMutation({
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
