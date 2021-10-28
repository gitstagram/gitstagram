import { toast } from 'react-toastify'
import {
  coerceLibraryData,
  LibraryData,
  coerceLibFollowing,
  coerceLibFollowingTags,
  coerceLibSaved,
  toJsonB64,
  async,
  captureException,
} from 'helpers'
import { createCommitMutationPromise } from 'graphql/operations'
import { apolloClient } from 'graphql/apolloClient'
import {
  Cache_UserInfo_ViewerPropsDocument,
  Cache_UserInfo_ViewerPropsQuery,
  Cache_UserInfo_ViewerLibDataFragment,
  Cache_UserInfo_ViewerLibDataFragmentDoc,
} from 'graphql/generated'

const defaultLibData = coerceLibraryData({})

export type CommitOpts = {
  commitMessage: string
}

export const writeLibraryData = async (
  { following, followingTags, saved }: Partial<LibraryData>,
  commitOpts?: CommitOpts
): Promise<boolean> => {
  const newFollowing = following && coerceLibFollowing(following)
  const newFollowingTags =
    followingTags && coerceLibFollowingTags(followingTags)
  const newSaved = saved && coerceLibSaved(saved)

  const newLibData: LibraryData = {
    following: newFollowing ? newFollowing : defaultLibData.following,
    followingTags: newFollowingTags
      ? newFollowingTags
      : defaultLibData.followingTags,
    saved: newSaved ? newSaved : defaultLibData.saved,
  }

  if (commitOpts) {
    const { err } = await async(
      createCommitMutationPromise({
        b64Contents: toJsonB64(newLibData),
        path: 'gitstagram-data.json',
        ...commitOpts,
      })
    )
    if (err) {
      toast.warn('Issue saving your `gitstagram-library` repository.')
      captureException({
        err,
        inside: 'writeLibraryData',
        msgs: [[err, 'Error committing LibraryData']],
      })
      return Promise.reject()
    }
  }

  // Only update cache and resolve(true) after successful write
  const cachedViewer = apolloClient.readQuery<Cache_UserInfo_ViewerPropsQuery>({
    query: Cache_UserInfo_ViewerPropsDocument,
  })
  apolloClient.writeFragment<Cache_UserInfo_ViewerLibDataFragment>({
    id: apolloClient.cache.identify({
      __typename: 'User',
      login: cachedViewer?.viewer.login,
    }),
    fragment: Cache_UserInfo_ViewerLibDataFragmentDoc,
    data: {
      ...(following && { followingUsers: newFollowing }),
      ...(followingTags && { followingTags: newFollowingTags }),
      ...(saved && { saved: newSaved }),
    },
  })

  return Promise.resolve(true)
}
