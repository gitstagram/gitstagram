export const isImage = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const url = window.URL || window.webkitURL
    const image = new Image()
    image.onload = () => {
      resolve(true)
      URL.revokeObjectURL(image.src)
    }
    image.onerror = () => {
      resolve(false)
      URL.revokeObjectURL(image.src)
    }
    image.src = url.createObjectURL(file)
  })
}
