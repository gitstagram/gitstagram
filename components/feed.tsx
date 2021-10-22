import React from 'react'
import { createFileCommitPromise } from 'graphql/mutationWrappers'
import { fileToB64, nanoid } from 'helpers'

export const Feed = (): JSX.Element => {
  const handleClick = async () => {
    const input = document.getElementById('file') as HTMLInputElement
    const file = input?.files && input.files[0]
    const fileId = nanoid()

    if (file) {
      const base64 = await fileToB64(file)

      void createFileCommitPromise({
        b64Contents: base64,
        path: `media/${fileId}.png`,
        commitMessage: 'Add media',
      })
    }
  }

  return (
    <>
      <input type='file' id='file' />
      <button onClick={handleClick}>upload</button>
    </>
  )
}
