export const nonAlphaNum = /[^A-Za-z0-9]/g
export const nonAlphaNumHyphen = /[^A-Za-z0-9-]/g

// Matches everything before the last dot
export const unsafeFileName = /[\s\S]+(?=\.)/

// Tagged user should only have alphaNumHyphen chars
export const taggedUser = /^[A-Za-z0-9-]+$/

// User/Filename is alphaNumHyphen, and extension is alphaNum
export const githubMedia =
  /^https:\/\/raw.githubusercontent.com\/[A-Za-z0-9-]+\/gitstagram-library\/main\/media\/[A-Za-z0-9-]+.[A-Za-z0-9]+$/

// Matches all words insensitively that begins with #, terminating with a whitespace char
export const hashtags = /\B#[\S]*/gi
