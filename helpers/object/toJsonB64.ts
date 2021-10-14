export const toJsonB64 = (object: Record<string, unknown>): string => {
  const jsonStr = JSON.stringify(object, null, 2)

  return window === undefined
    ? Buffer.from(jsonStr).toString('base64')
    : window.btoa(jsonStr)
}
