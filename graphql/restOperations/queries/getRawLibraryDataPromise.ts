import { LibraryData } from 'helpers'
import { customFetch } from 'graphql/apolloClient'

/*
 * Fetch requests Github sends cached response
 *   - fetch({ cache: 'no-store' }) only disabled local cache
 *   - and CORS prevents setting headers like 'cache-control': 'max-age=0'
 *   - So only use for time-insensitive information such as other users profiles
 *
 *   - This is a tool to save gQL requests
 *   - For Viewer and Viewer related info, use gQL `getLibraryDataQueryPromise`
 */

export const getRawLibraryDataPromise = (
  userLogin: string
): Promise<LibraryData> => {
  return customFetch(
    `https://raw.githubusercontent.com/${userLogin}/gitstagram-library/main/gitstagram-data.json`
  ).then((res) => {
    return res.json() as unknown as LibraryData
  })
}
