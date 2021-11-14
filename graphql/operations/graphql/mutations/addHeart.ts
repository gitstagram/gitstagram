import {
  useAddHeartMutation as genUseAddHeartMutation,
  AddHeartMutationVariables,
} from 'graphql/generated'

type MutationTuple = ReturnType<typeof genUseAddHeartMutation>

export const useAddHeartMutation = ({
  subjectId,
}: AddHeartMutationVariables): MutationTuple => {
  const mutationTuple = genUseAddHeartMutation({
    variables: { subjectId },
  })

  return mutationTuple
}
