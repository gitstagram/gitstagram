import { compressFile, CompressOptions } from 'helpers/file/compressFile'

type FileToB64 = {
  file: File | Blob
  withHeader?: boolean
  compressOpts?: CompressOptions
}

export const fileToB64 = ({
  file,
  withHeader = false,
  compressOpts,
}: FileToB64): Promise<string> => {
  return new Promise((resolve, reject) => {
    const execute = async () => {
      try {
        const fileData = compressOpts
          ? await compressFile(file, compressOpts)
          : file

        const reader = new FileReader()
        reader.readAsDataURL(fileData)
        reader.onload = () => {
          const resultString = reader?.result as string
          const rawBase64String = resultString
            .replace('data:', '')
            .replace(/^.+,/, '')
          resolve(withHeader ? resultString : rawBase64String)
        }
        reader.onerror = (readerErr) => reject(readerErr)
      } catch (compressErr) {
        reject(compressErr)
      }
    }

    void execute()
  })
}
