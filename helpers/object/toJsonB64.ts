export const toJsonB64 = (object: AnyRecord): string => {
  const jsonStr = JSON.stringify(object, null, 2)

  return window === undefined
    ? Buffer.from(jsonStr).toString('base64')
    : window.btoa(jsonStr)
}
