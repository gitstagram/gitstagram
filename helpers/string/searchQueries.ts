export const searchUsersQueryString = (searchTerm: string): string => {
  return `${searchTerm} in:description gitstagram-library in:name`
}

export const getFollowingQueryString = (following: string[]): string => {
  return following.map((follow) => `user:${follow}`).join(' ')
}
