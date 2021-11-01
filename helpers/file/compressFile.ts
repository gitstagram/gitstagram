import Compressor from 'compressorjs'

export type CompressOptions = Omit<Compressor.Options, 'success' | 'error'>

export const compressFile = (
  file: File | Blob,
  options: CompressOptions
): Promise<File | Blob> => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      ...options,
      success(result) {
        resolve(result)
      },
      error(err) {
        reject(err)
      },
    })
  })
}
