import { useCreateFileCommitMutation } from 'graphql/generated'

type MutationTuple = ReturnType<typeof useCreateFileCommitMutation>

export const useCreateFileCommit = (): MutationTuple => {
  const mutationTuple = useCreateFileCommitMutation()
  return mutationTuple
}
