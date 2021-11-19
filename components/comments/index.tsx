import React from 'react'

type CommentsProps = {
  issueId: string
}

export const Comments = ({ issueId }: CommentsProps): JSX.Element => {
  return <>Comments {issueId}</>
}
