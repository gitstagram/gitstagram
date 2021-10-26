import {
  useCache_UserInfo_UserPropsQuery,
  Cache_UserInfo_UserPropsQuery,
  UserHasBeen,
} from 'graphql/generated'
import { captureException } from 'helpers'
import type { Merge } from 'type-fest'

type UserProperties = NonNullable<Cache_UserInfo_UserPropsQuery['user']>
type UserInfo = Merge<
  UserProperties,
  {
    avatarUrl: Maybe<string>
    hasBeen: UserHasBeen
  }
>

export const useUserInfo = (login: string): UserInfo => {
  const { data } = useCache_UserInfo_UserPropsQuery({ variables: { login } })
  const userInfo = data?.user
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
