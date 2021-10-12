import { makeVar } from '@apollo/client'
import {
  coerceLibraryData,
  LibraryData,
  coerceLibFollowing,
  coerceLibFollowingTags,
  coerceLibSaved,
} from 'helpers'

const defaultLibData = coerceLibraryData({})
export const followingVar = makeVar(defaultLibData.following)
export const followingTagsVar = makeVar(defaultLibData.followingTags)
export const savedVar = makeVar(defaultLibData.saved)

type WriteFollowingVarOpts = {
  following: LibraryData['following']
  commit?: boolean
}
export const writeFollowingVar = ({
  following,
  commit = false,
}: WriteFollowingVarOpts): Promise<void> => {
  followingVar(coerceLibFollowing(following))
  return commit ? Promise.resolve() : Promise.resolve()
}

type WriteFollowingTagsVarOpts = {
  followingTags: LibraryData['followingTags']
  commit?: boolean
}
export const writeFollowingTagsVar = ({
  followingTags,
  commit = false,
}: WriteFollowingTagsVarOpts): Promise<void> => {
  followingTagsVar(coerceLibFollowingTags(followingTags))
  return commit ? Promise.resolve() : Promise.resolve()
}

type WriteSavedVarOpts = {
  saved: LibraryData['saved']
  commit?: boolean
}
export const writeSavedVar = ({
  saved,
  commit = false,
}: WriteSavedVarOpts): Promise<void> => {
  savedVar(coerceLibSaved(saved))
  return commit ? Promise.resolve() : Promise.resolve()
}

type WriteLibraryDataOpts = {
  libData: LibraryData
  commit?: boolean
}
export const writeLibraryData = ({
  libData,
  commit = false,
}: WriteLibraryDataOpts): Promise<void> => {
  const correctLibData = coerceLibraryData(libData)
  followingVar(correctLibData.following)
  followingTagsVar(correctLibData.followingTags)
  savedVar(correctLibData.saved)
  return commit ? Promise.resolve() : Promise.resolve()
}
