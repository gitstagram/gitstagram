export const getUploadRawUrl = (viewer: string, fileName: string): string => {
  return `https://raw.githubusercontent.com/${viewer}/gitstagram-library/main/media/${fileName}`
}
