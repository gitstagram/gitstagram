import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { Comments } from 'components/comments'
import { HOME } from 'routes'

const CommentsPage = (): JSX.Element => {
  const [session] = useSession()
  const router = useRouter()
  const { issueId } = router.query

  if (session) {
    return (
      <>
        <Head>
          <title>Comments · Gitstagram</title>
        </Head>
        <Comments issueId={issueId as string} />
      </>
    )
  } else {
    void router.push(HOME)
    return <></>
  }
}

export default CommentsPage
