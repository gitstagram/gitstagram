import { TypePolicies } from '@apollo/client'
import type { StrictTypedTypePolicies } from 'graphql/generated/apolloHelpers'
import {
  Cache_Generate_UserInfo_ViewerPropsFragmentDoc,
  Cache_Generate_UserInfo_ViewerPropsFragment,
  Cache_UserInfo_ViewerPropsQuery,
  Cache_UserInfo_ViewerPropsDocument,
  User,
  Cache_Generate_UserInfoFragmentDoc,
  Cache_Generate_UserInfoFragment,
  Cache_UserInfoDocument,
  Cache_UserInfoQuery,
  Cache_UserInfoQueryVariables,
  Cache_GetLibraryDataFragmentDoc,
  Cache_GetLibraryDataFragment,
  UserHasBeen,
  Cache_UserInfo_LiftedPropsFragment,
  Cache_UserInfo_LiftedPropsFragmentDoc,
} from 'graphql/generated'
import { LibraryDataQuery, LibraryDataQueryVariables } from 'graphql/operations'
import {
  nullish,
  captureException,
  parseJsonIfB64,
  isLibraryData,
} from 'helpers'

const nullOnUndefinedPolicy = {
  read: (existing: unknown): unknown =>
    existing === undefined ? null : existing,
}

export const typePolicies: TypePolicies & StrictTypedTypePolicies = {
  Repository: {
    keyFields: ['nameWithOwner'],
  },
  Issue: {
    keyFields: ['number'],
  },
  UserInfo: {
    keyFields: ['login'],
  },
  User: {
    keyFields: ['login'],
    fields: {
      currentOid: nullOnUndefinedPolicy,
      stargazerCount: nullOnUndefinedPolicy,
      issuesTotalCount: nullOnUndefinedPolicy,
      followingUsers: nullOnUndefinedPolicy,
      followingTags: nullOnUndefinedPolicy,
      saved: nullOnUndefinedPolicy,
      hasBeen: (existing: UserHasBeen = UserHasBeen.Untouched) => existing,
    },
    merge(_, incoming: User, options) {
      const { cache, variables, fieldName } = options

      if (fieldName === 'viewer') {
        const viewer =
          cache.readFragment<Cache_Generate_UserInfo_ViewerPropsFragment>({
            id: cache.identify(incoming),
            fragment: Cache_Generate_UserInfo_ViewerPropsFragmentDoc,
            variables,
          })
        const currentOid = viewer?.repository?.defaultBranchRef?.target
          ?.oid as Maybe<string>
        const stargazerCount = viewer?.repository?.stargazerCount
        const issuesTotalCount = viewer?.repository?.issues.totalCount

        if (
          !currentOid ||
          nullish(stargazerCount) ||
          nullish(issuesTotalCount)
        ) {
          captureException({
            inside: 'typePolicies:User',
            msgs: [
              [!currentOid, 'Cannot read currentOid'],
              [nullish(stargazerCount), 'Cannot read stargazerCount'],
              [nullish(issuesTotalCount), 'Cannot read issuesTotalCount'],
            ],
          })
          throw new Error('Cannot populate viewer info')
        }

        cache.writeFragment<Cache_UserInfo_LiftedPropsFragment>({
          id: cache.identify(incoming),
          fragment: Cache_UserInfo_LiftedPropsFragmentDoc,
          data: {
            currentOid,
            stargazerCount,
            issuesTotalCount,
          },
        })
      }

      if (fieldName === 'user') {
        const user = cache.readFragment<Cache_Generate_UserInfoFragment>({
          id: cache.identify(incoming),
          fragment: Cache_Generate_UserInfoFragmentDoc,
          variables,
        })

        if (user) {
          const { login, name, location, twitterUsername, bio } = user
          const stargazerCount = user.repository?.stargazerCount
          const issuesTotalCount = user.repository?.issues.totalCount
          if (nullish(stargazerCount) || nullish(issuesTotalCount)) {
            captureException({
              inside: 'typePolicies:User::User',
              msgs: [
                [nullish(stargazerCount), 'Cannot read stargazerCount'],
                [nullish(issuesTotalCount), 'Cannot read issuesTotalCount'],
              ],
            })
            throw new Error('Cannot populate viewer info')
          }
          cache.writeQuery<Cache_UserInfoQuery>({
            query: Cache_UserInfoDocument,
            data: {
              userInfo: {
                __typename: 'UserInfo',
                login,
                avatarUrl: user.avatarUrl as Maybe<string>,
                name,
                location,
                twitterUsername,
                bio,
                stargazerCount,
                issuesTotalCount,
                following: [],
                hasBeen: UserHasBeen.Untouched,
              },
            },
            variables: {
              login,
            },
          })
        }
      }

      return incoming
    },
  },
  RestLibraryData: {
    keyFields: ['sha'],
    merge(_, incoming, options) {
      const { cache } = options
      const variables = options.variables as LibraryDataQueryVariables

      const cacheViewer = cache.readQuery<Cache_UserInfo_ViewerPropsQuery>({
        query: Cache_UserInfo_ViewerPropsDocument,
      })

      const isViewer = cacheViewer?.viewer?.login === variables.userLogin

      if (cacheViewer && !isViewer) {
        const userLibraryData =
          cache.readFragment<Cache_GetLibraryDataFragment>({
            id: cache.identify(incoming),
            fragment: Cache_GetLibraryDataFragmentDoc,
          })

        const fileContents = userLibraryData?.content
        if (!fileContents) {
          const noContentErr = 'Cannot read LibraryData file contents'
          captureException({
            inside: 'typePolicies:RestLibraryData',
            msgs: [[!fileContents, noContentErr]],
          })
          throw new Error(noContentErr)
        }

        const libraryData = parseJsonIfB64(fileContents)
        if (!isLibraryData(libraryData)) {
          const parseErr = 'Cannot parse base64 contents'
          captureException({
            inside: 'typePolicies:RestLibraryData',
            msgs: [parseErr],
          })
          throw new Error(parseErr)
        }

        const cacheUser = cache.readQuery<
          Cache_UserInfoQuery,
          Cache_UserInfoQueryVariables
        >({
          query: Cache_UserInfoDocument,
          variables: { login: variables.userLogin },
        })

        const userInfo = cacheUser?.userInfo

        if (!userInfo) {
          const noUserInfoErr = 'Cannot read cached UserInfo'
          captureException({
            inside: 'typePolicies:RestLibraryData',
            msgs: [noUserInfoErr],
          })
          throw new Error(noUserInfoErr)
        }

        cache.writeQuery<Cache_UserInfoQuery>({
          query: Cache_UserInfoDocument,
          data: {
            userInfo: {
              ...userInfo,
              following: libraryData.following,
            },
          },
          variables: {
            login: variables.userLogin,
          },
        })
      }

      return incoming as LibraryDataQuery
    },
  },
}
