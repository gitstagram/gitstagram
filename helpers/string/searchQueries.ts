export const searchUsersQueryString = (searchTerm: string): string => {
  return `${searchTerm} in:description gitstagram-library in:name`
}

export const getFollowingQueryString = (following: string[]): string => {
  return following.map((follow) => `user:${follow}`).join(' ')
}

export const getFeedQueryString = (followings: string[]): string => {
  const followingStr = followings
    .map((following) => `repo:${following}/gitstagram-library`)
    .join(' ')
  return followings.length
    ? `sort:created-desc label:gitstagram-library-post state:open ${followingStr}`
    : ''
}
