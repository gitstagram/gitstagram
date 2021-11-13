import { gql, FetchResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'
import {
  Cache_UserInfo_ViewerPropsQuery,
  Cache_UserInfo_ViewerPropsDocument,
  GetUserGitstagramLibraryQuery,
} from 'graphql/generated'
import { getIssueNodeQueryPromise } from 'graphql/operations'
import { async, nullish } from 'helpers'

type CreateIssueVariablesInput = {
  title: string
  body: string
  labels?: string[]
}

type CreateIssueMutation = {
  createIssue: {
    nodeId: string
  }
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
      nodeId
    }
  }
`

type IssuesNodes = NonNullable<
  NonNullable<GetUserGitstagramLibraryQuery['user']>['repository']
>['issues']

type IssuesTotalCount = NonNullable<
  GetUserGitstagramLibraryQuery['user']
>['issuesTotalCount']

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
      update: async (cache, result, options) => {
        const issueId = result.data?.createIssue.nodeId
        const userLogin = options.variables?.userLogin
        if (!issueId)
          throw new Error('No issueId from createIssueMutationPromise update')
        if (!userLogin)
          throw new Error('No userLogin from createIssueMutationPromise update')

        const { res, err } = await async(
          getIssueNodeQueryPromise({ variables: { issueId } })
        )
        if (err) throw new Error(`${err}`)

        const issue = res?.data.node
        if (!issue)
          throw new Error(
            'No issue fetched from createIssueMutationPromise update'
          )

        cache.modify({
          id: cache.identify({
            __typename: 'Repository',
            nameWithOwner: `${userLogin}/gitstagram-library`,
          }),
          fields: {
            issues(existing: IssuesNodes): IssuesNodes {
              const currentNodes = existing.nodes
              const newNode =
                res?.data?.node?.__typename === 'Issue' && res.data.node
              return currentNodes && newNode
                ? {
                    ...existing,
                    nodes: [newNode, ...currentNodes],
                  }
                : existing
            },
          },
        })

        cache.modify({
          id: cache.identify({ __typename: 'User', login: userLogin }),
          fields: {
            issuesTotalCount(existing: IssuesTotalCount): IssuesTotalCount {
              return nullish(existing) ? existing : existing + 1
            },
          },
        })
      },
    }
  )
}
