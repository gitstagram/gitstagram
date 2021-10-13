export const toJsonB64 = (object: Record<string, unknown>): string => {
  return btoa(JSON.stringify(object, null, 2))
}
