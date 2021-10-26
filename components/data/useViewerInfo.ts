import { signOut } from 'next-auth/client'
import { toast } from 'react-toastify'
import {
  useCache_UserInfo_ViewerPropsQuery,
  Cache_UserInfo_ViewerPropsQuery,
} from 'graphql/generated'
import { captureException, nullish } from 'helpers'
import type { Merge } from 'type-fest'

type ViewerProperties = Cache_UserInfo_ViewerPropsQuery['viewer']
type ViewerInfo = Merge<
  ViewerProperties,
  {
    avatarUrl: Maybe<string>
    currentOid: string
    stargazerCount: number
    issuesTotalCount: number
    followingUsers: Array<string>
    followingTags: Array<string>
    saved: Array<string>
  }
>

export const useViewerInfo = (): ViewerInfo => {
  const { data } = useCache_UserInfo_ViewerPropsQuery()
  const viewerInfo = data?.viewer
  const currentOid = viewerInfo?.currentOid
  const stargazerCount = viewerInfo?.stargazerCount
  const stargazerInvalid = nullish(stargazerCount)
  const issuesTotalCount = viewerInfo?.issuesTotalCount
  const issuesTotalCountInvalid = nullish(issuesTotalCount)
  const followingUsers = viewerInfo?.followingUsers
  const followingTags = viewerInfo?.followingTags
  const saved = viewerInfo?.saved

  if (
    !viewerInfo ||
    !currentOid ||
    stargazerInvalid ||
    issuesTotalCountInvalid ||
    !followingUsers ||
    !followingTags ||
    !saved
  ) {
    captureException({
      inside: 'useViewerInfo',
      msgs: [
        [!viewerInfo, 'No viewer info'],
        [!currentOid, 'No viewer info currentOid'],
        [stargazerInvalid, 'No viewer info stargazerCount'],
        [issuesTotalCountInvalid, 'No viewer info issuesTotalCount'],
        [!followingUsers, 'No viewer info followingUsers'],
        [!followingTags, 'No viewer info followingTags'],
        [!saved, 'No viewer info saved'],
      ],
    })
    toast.warn('Logged-in user data somehow invalid')
    void signOut()
    throw new Error('Bad viewer info')
  }
  return {
    ...viewerInfo,
    avatarUrl: viewerInfo?.avatarUrl as Maybe<string>,
    currentOid,
    stargazerCount,
    issuesTotalCount,
    followingUsers,
    followingTags,
    saved,
  }
}
