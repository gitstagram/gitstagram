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
    const oid = data?.viewer?.repository?.defaultBranchRef?.target
      ?.oid as string
    const viewerLogin = data?.viewer.login
    const fileId = nanoid()

    if (file && oid && viewerLogin) {
      const base64 = await fileToB64(file)

      void createFileCommitPromise({
        b64Contents: base64,
        path: `media/${fileId}.png`,
        repoWithLogin: `${viewerLogin}/gitstagram-library`,
        commitMessage: 'Add media',
        headOid: oid,
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
