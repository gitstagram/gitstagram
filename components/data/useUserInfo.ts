import { apolloClient } from 'graphql/apolloClient'
import {
  Cache_UserInfo_UserPropsFragment,
  Cache_UserInfo_UserPropsFragmentDoc,
  UserHasBeen,
} from 'graphql/generated'
import { captureException } from 'helpers'
import type { Merge } from 'type-fest'

type UserProperties = NonNullable<Cache_UserInfo_UserPropsFragment>
type UserInfo = Merge<
  UserProperties,
  {
    avatarUrl: Maybe<string>
    hasBeen: UserHasBeen
  }
>

export const useUserInfo = (login: string): UserInfo => {
  const userInfo = apolloClient.readFragment<Cache_UserInfo_UserPropsFragment>({
    id: apolloClient.cache.identify({ __typename: 'User', login }),
    fragment: Cache_UserInfo_UserPropsFragmentDoc,
  })
  const hasBeen = userInfo?.hasBeen

  if (!userInfo || !hasBeen) {
    captureException({
      inside: 'useUserInfo',
      msgs: [
        [!userInfo, 'No User info'],
        [!hasBeen, 'No user info hasBeen'],
      ],
    })
    throw new Error('Bad user info')
  }
  return {
    ...userInfo,
    avatarUrl: userInfo?.avatarUrl as Maybe<string>,
    hasBeen,
  }
}
