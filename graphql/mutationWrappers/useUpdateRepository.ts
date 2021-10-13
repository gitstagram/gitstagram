import { useUpdateRepositoryMutation } from 'graphql/generated'

type MutationTuple = ReturnType<typeof useUpdateRepositoryMutation>

export const useUpdateRepository = (): MutationTuple => {
  const mutationTuple = useUpdateRepositoryMutation()
  return mutationTuple
}
