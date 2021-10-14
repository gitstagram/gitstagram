export const fileToB64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const resultString = reader?.result as string
      const base64String = resultString.replace('data:', '').replace(/^.+,/, '')
      resolve(base64String)
    }
    reader.onerror = (error) => reject(error)
  })
}
