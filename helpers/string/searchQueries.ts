export const searchUsersQueryString = (searchTerm: string): string => {
  return `${searchTerm} in:description gitstagram-library in:name`
}
