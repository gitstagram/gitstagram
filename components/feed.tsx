import React from 'react'
import {
  useGetViewerQuery,
  useGetViewerGitstagramLibraryQuery,
} from 'graphql/generated'

import { createFileCommitPromise } from 'graphql/mutationWrappers'
import { fileToB64, nanoid } from 'helpers'

export const Feed = (): JSX.Element => {
  const { data: loginData } = useGetViewerQuery()
  const viewerLogin = loginData?.viewer.login
  const { data, loading } = useGetViewerGitstagramLibraryQuery({
    skip: !viewerLogin,
    variables: {
      userLogin: viewerLogin as string,
    },
  })

  const handleClick = async () => {
    const input = document.getElementById('file') as HTMLInputElement
    const file = input?.files && input.files[0]
    const viewerLogin = data?.viewer.login
    const fileId = nanoid()

    if (file && viewerLogin) {
      const base64 = await fileToB64(file)

      void createFileCommitPromise({
        b64Contents: base64,
        path: `media/${fileId}.png`,
        commitMessage: 'Add media',
      })
    }
  }

  return loading ? (
    <>Loading</>
  ) : (
    <>
      Data: {JSON.stringify(data)}
      <input type='file' id='file' />
      <button onClick={handleClick}>upload</button>
    </>
  )
}
