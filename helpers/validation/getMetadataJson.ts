import { stringCombinatorials } from 'helpers/string/stringCombinatorials'
import { coerceMetadata } from 'helpers/validation/coerceMetadata'

/*
 * Metadata is stored in `gitstagram-library` repository description
 *   - Description field characters max out at 65536
 *   - Provides additional data to help with gitstagram discoverability, etc
 */
export const getMetadataJson = (login: string): string => {
  /*
   * Breaks up login name into constituent parts
   *   - "foobar" => "foo", "foob", "fooba", "foobar"
   *   - It is usually not possible to search a partial login name for a repo
   *   - This allows Github to find `gitstagram-library`'s with login name partials
   */
  const loginSearchParts = stringCombinatorials(login, 3)
  const metadata = coerceMetadata({ loginSearchParts })
  const jsonStr = JSON.stringify(metadata)
  return jsonStr
}
