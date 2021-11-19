export const HOME = '/'
export const SETTINGS = '/settings'

export const PROFILE = '/[userLogin]'
export const getProfilePath = (userLogin: string): string => {
  return `/${userLogin}`
}

export const NEW = '/new'

export const POSTS = '/posts/[issueId]'
export const getPostPath = (issueId: string): string => {
  return `/posts/${issueId}`
}

export const COMMENTS = `/comments/[issueId]`
export const getCommentsPath = (issueId: string): string => {
  return `/comments/${issueId}`
}
