export const isJson = <T>(str: string): T | false => {
  try {
    const parsed = JSON.parse(str) as T
    if (parsed && typeof parsed === 'object') {
      return parsed
    }
  } catch (e) {
    // noop
  }

  return false
}
