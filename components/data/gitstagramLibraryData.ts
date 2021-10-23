import { makeVar, useReactiveVar } from '@apollo/client'
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
import { createCommitMutationPromise } from 'graphql/operationWrappers'
import { apolloClient } from 'graphql/apolloClient'
import {
  Cache_ViewerInfoDocument,
  Cache_ViewerInfoQuery,
} from 'graphql/generated'

const defaultLibData = coerceLibraryData({})

export const followingVar = makeVar(defaultLibData.following)
export const useFollowingVar = (): LibraryData['following'] => {
  return useReactiveVar(followingVar)
}

export const followingTagsVar = makeVar(defaultLibData.followingTags)
export const useFollowingTagsVar = (): LibraryData['followingTags'] => {
  return useReactiveVar(followingTagsVar)
}

export const savedVar = makeVar(defaultLibData.saved)
export const useSavedVar = (): LibraryData['saved'] => {
  return useReactiveVar(savedVar)
}

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
    following: newFollowing ? newFollowing : followingVar(),
    followingTags: newFollowingTags ? newFollowingTags : followingTagsVar(),
    saved: newSaved ? newSaved : savedVar(),
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

  // Only update reactive vars and resolve(true) after successful write
  following && followingVar(newFollowing)
  followingTags && followingTagsVar(newFollowingTags)
  saved && savedVar(newSaved)
  // Only update cache and resolve(true) after successful write
  const cacheViewer = apolloClient.readQuery<Cache_ViewerInfoQuery>({
    query: Cache_ViewerInfoDocument,
  })
  const viewerInfo = cacheViewer?.viewerInfo

  viewerInfo &&
    apolloClient.writeQuery<Cache_ViewerInfoQuery>({
      query: Cache_ViewerInfoDocument,
      data: {
        viewerInfo: {
          ...viewerInfo,
          ...(following && { following: newFollowing }),
          ...(followingTags && { followingTags: newFollowingTags }),
          ...(saved && { saved: newSaved }),
        },
      },
    })
  return Promise.resolve(true)
}
