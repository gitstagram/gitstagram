import { gql, FetchResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'
import {
  Cache_UserInfo_ViewerPropsQuery,
  Cache_UserInfo_ViewerPropsDocument,
} from 'graphql/generated'

type CreateIssueVariablesInput = {
  title: string
  body: string
  labels?: string[]
}

type CreateIssueMutation = {
  node_id: string
}

type CreateIssueMutationVariables = {
  userLogin: string
  input: CreateIssueVariablesInput
}

const CREATE_ISSUE = gql`
  mutation CreateIssue($userLogin: String!, $input: String!) {
    createIssue(input: $input, userLogin: $userLogin)
      @rest(
        type: "RestStar"
        path: "/repos/{args.userLogin}/gitstagram-library/issues"
        method: "POST"
      ) {
      node_id
    }
  }
`

export const createIssueMutationPromise = (
  input: CreateIssueVariablesInput
): Promise<FetchResult<CreateIssueMutation>> => {
  const cachedViewer = apolloClient.readQuery<Cache_UserInfo_ViewerPropsQuery>({
    query: Cache_UserInfo_ViewerPropsDocument,
  })
  const viewer = cachedViewer?.viewer

  return apolloClient.mutate<CreateIssueMutation, CreateIssueMutationVariables>(
    {
      mutation: CREATE_ISSUE,
      variables: {
        userLogin: viewer?.login as string,
        input: {
          title: input.title,
          body: input.body,
          labels: input.labels
            ? ['gitstagram-library-post', ...input.labels]
            : ['gitstagram-library-post'],
        },
      },
    }
  )
}
