import { useUpdateRepositoryMutation as genUseUpdateRepositoryMutation } from 'graphql/generated'

type MutationTuple = ReturnType<typeof genUseUpdateRepositoryMutation>

export const useUpdateRepositoryMutation = (): MutationTuple => {
  const mutationTuple = genUseUpdateRepositoryMutation()
  return mutationTuple
}
