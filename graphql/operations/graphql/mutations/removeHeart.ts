import {
  useRemoveHeartMutation as genUseRemoveHeartMutation,
  AddHeartMutationVariables,
} from 'graphql/generated'

type MutationTuple = ReturnType<typeof genUseRemoveHeartMutation>

export const useRemoveHeartMutation = ({
  subjectId,
}: AddHeartMutationVariables): MutationTuple => {
  const mutationTuple = genUseRemoveHeartMutation({
    variables: { subjectId },
  })

  return mutationTuple
}
