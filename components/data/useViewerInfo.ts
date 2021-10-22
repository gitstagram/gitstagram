import { signOut } from 'next-auth/client'
import { toast } from 'react-toastify'
import {
  useCache_ViewerInfoQuery,
  Cache_ViewerInfoQuery,
} from 'graphql/generated'
import { captureException } from 'helpers'

type ViewerInfo = NonNullable<Cache_ViewerInfoQuery['viewerInfo']>

export const useViewerInfo = (): ViewerInfo => {
  const { data } = useCache_ViewerInfoQuery()
  const viewerInfo = data?.viewerInfo
  if (!viewerInfo) {
    captureException({ inside: 'useViewerInfo', msgs: ['No ViewerInfo'] })
    toast.warn('Cannot access logged-in user')
    void signOut()
    throw new Error('No viewerInfo')
  }
  return viewerInfo
}
