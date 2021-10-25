import { signOut } from 'next-auth/client'
import { toast } from 'react-toastify'
import {
  useCache_UserInfo_ViewerPropsQuery,
  Cache_UserInfo_ViewerPropsQuery,
} from 'graphql/generated'
import { captureException } from 'helpers'

type ViewerProperties = Cache_UserInfo_ViewerPropsQuery['viewer']

export const useViewerInfo = (): ViewerProperties => {
  const { data } = useCache_UserInfo_ViewerPropsQuery()
  const viewerInfo = data?.viewer
  if (!viewerInfo) {
    captureException({ inside: 'useViewerInfo', msgs: ['No ViewerInfo'] })
    toast.warn('Cannot access logged-in user')
    void signOut()
    throw new Error('No viewerInfo')
  }
  return viewerInfo
}
