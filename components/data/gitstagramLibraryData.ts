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
import { createFileCommitPromise } from 'graphql/mutationWrappers'

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
  login: string
  headOid: string
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
    const { res, err } = await async(
      createFileCommitPromise({
        b64Contents: toJsonB64(newLibData),
        path: 'gitstagram-data.json',
        ...commitOpts,
      })
    )
    const headOid = res?.data?.createCommitOnBranch?.commit
      ?.oid as Maybe<string>

    if (err || !headOid) {
      toast.warn(
        'Issue saving changes to your `gitstagram-library` repository.'
      )
      captureException({
        err,
        msgs: [
          [err, 'Error committing LibraryData'],
          [!headOid, 'Cannot read commit oId'],
        ],
      })
      return Promise.reject()
    }
  }

  // Only update reactive vars and resolve(true) after successful write
  following && followingVar(newFollowing)
  followingTags && followingTagsVar(newFollowingTags)
  saved && savedVar(newSaved)
  return Promise.resolve(true)
}
