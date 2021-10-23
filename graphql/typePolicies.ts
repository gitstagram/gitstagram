import { TypePolicies } from '@apollo/client'
import type { StrictTypedTypePolicies } from 'graphql/generated/apolloHelpers'
import {
  Cache_Generate_ViewerInfoFragmentDoc,
  Cache_Generate_ViewerInfoFragment,
  Cache_ViewerInfoQuery,
  Cache_ViewerInfoDocument,
  User,
  Cache_Generate_UserInfoFragmentDoc,
  Cache_Generate_UserInfoFragment,
  Cache_UserInfoDocument,
  Cache_UserInfoQuery,
} from 'graphql/generated'
import { nullish, captureException } from 'helpers'

export const typePolicies: TypePolicies & StrictTypedTypePolicies = {
  User: {
    keyFields: ['login'],
    merge(_, incoming: User, options) {
      const { cache, variables, fieldName } = options

      if (fieldName === 'viewer') {
        const user = cache.readFragment<Cache_Generate_ViewerInfoFragment>({
          id: cache.identify(incoming),
          fragment: Cache_Generate_ViewerInfoFragmentDoc,
          variables,
        })

        if (user) {
          const { login, name, location, twitterUsername, bio } = user
          const currentOid = user.repository?.defaultBranchRef?.target
            ?.oid as Maybe<string>
          const stargazerCount = user.repository?.stargazerCount
          const issuesTotalCount = user.repository?.issues.totalCount

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

          cache.writeQuery<Cache_ViewerInfoQuery>({
            query: Cache_ViewerInfoDocument,
            data: {
              viewerInfo: {
                login,
                avatarUrl: user.avatarUrl as Maybe<string>,
                name,
                location,
                twitterUsername,
                bio,
                currentOid,
                stargazerCount,
                issuesTotalCount,
                following: [],
                followingTags: [],
                saved: [],
              },
            },
          })
        }
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
              inside: 'typePolicies:User',
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
              },
            },
          })
        }
      }

      return incoming
    },
  },
  Repository: {
    keyFields: ['nameWithOwner'],
  },
  Issue: {
    keyFields: ['number'],
  },
  UserInfo: {
    keyFields: ['login'],
  },
}
