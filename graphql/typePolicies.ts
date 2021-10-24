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
  Cache_UserInfoQueryVariables,
  Cache_GetLibraryDataFragmentDoc,
  Cache_GetLibraryDataFragment,
} from 'graphql/generated'
import { LibraryDataQuery, LibraryDataQueryVariables } from 'graphql/operations'
import {
  nullish,
  captureException,
  parseJsonIfB64,
  isLibraryData,
} from 'helpers'

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
    merge(_, incoming: User, options) {
      const { cache, variables, fieldName } = options

      if (fieldName === 'viewer') {
        const viewer = cache.readFragment<Cache_Generate_ViewerInfoFragment>({
          id: cache.identify(incoming),
          fragment: Cache_Generate_ViewerInfoFragmentDoc,
          variables,
        })

        if (viewer && viewer.repository) {
          const { login, name, location, twitterUsername, bio } = viewer
          const currentOid = viewer.repository.defaultBranchRef?.target
            ?.oid as Maybe<string>
          const stargazerCount = viewer.repository.stargazerCount
          const issuesTotalCount = viewer.repository.issues.totalCount

          if (
            !currentOid ||
            nullish(stargazerCount) ||
            nullish(issuesTotalCount)
          ) {
            captureException({
              inside: 'typePolicies:User::Viewer',
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
                avatarUrl: viewer.avatarUrl as Maybe<string>,
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

      const cacheViewer = cache.readQuery<Cache_ViewerInfoQuery>({
        query: Cache_ViewerInfoDocument,
      })

      const isViewer = cacheViewer?.viewerInfo?.login === variables.userLogin

      if (!isViewer) {
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
