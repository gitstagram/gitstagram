/* eslint-disable
  @typescript-eslint/no-unsafe-assignment,
  @typescript-eslint/no-unsafe-member-access,
  @typescript-eslint/no-explicit-any
*/
import { keys } from 'helpers/type/keys'
import type { PartialDeep } from 'type-fest'

export const deepMerge = <T extends AnyRecord>(
  acc: PartialDeep<T>,
  oldData: T,
  newData: PartialDeep<T>
): T => {
  const newLevelObj = {
    ...acc,
    ...oldData,
  }
  const levelKeys = keys(newData)
  levelKeys.forEach((key) => {
    const levelValueNew = newData[key] as any
    const levelValueOld = oldData[key]
    const levelValueObj = newLevelObj[key]
    const isNested = levelValueNew?.constructor.name === 'Object'
    if (isNested) {
      newLevelObj[key] = deepMerge(levelValueObj, levelValueOld, levelValueNew)
    } else {
      newLevelObj[key] = levelValueNew
    }
  })
  return newLevelObj
}
