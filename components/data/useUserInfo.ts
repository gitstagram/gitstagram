import { useCache_UserInfoQuery, Cache_UserInfoQuery } from 'graphql/generated'
import { captureException } from 'helpers'

type UserInfo = NonNullable<Cache_UserInfoQuery['userInfo']>

export const useUserInfo = (login: string): UserInfo => {
  const { data } = useCache_UserInfoQuery({ variables: { login } })
  const userInfo = data?.userInfo
  if (!userInfo) {
    captureException({ inside: 'useUserInfo', msgs: ['No UserInfo'] })
    throw new Error('No userInfo')
  }
  return userInfo
}
