type FileToB64 = {
  file: File
  withMeta?: boolean
}

export const fileToB64 = ({
  file,
  withMeta = false,
}: FileToB64): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const resultString = reader?.result as string
      const rawBase64String = resultString
        .replace('data:', '')
        .replace(/^.+,/, '')
      resolve(withMeta ? resultString : rawBase64String)
    }
    reader.onerror = (error) => reject(error)
  })
}
