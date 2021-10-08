export const HOME = '/'
export const SETTINGS = '/settings'

export const PROFILE = '/[userLogin]'
export const getProfilePath = (userLogin: string): string => {
  return `/${userLogin}`
}
