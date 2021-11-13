import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { Panel, TextLink, Button, PreWrap, TextAttn } from 'components/ui'
import { ProfileIcon } from 'components/profileIcon'
import { theme } from 'styles/themes'
import { parseIfJson, GitstagramPost, toReadableNum, pluralize } from 'helpers'
import { Frag_Issue_FieldsFragment } from 'graphql/generated'
import { getProfilePath, HOME } from 'routes'

const FeedPostStyles = styled.div`
  margin-bottom: ${theme('sz24')};

  .post-panel {
    padding: 0;
  }

  .post-header {
    display: flex;
    align-items: center;
    height: ${theme('sz64')};
  }

  .post-user {
    margin-right: ${theme('sz12')};
    margin-left: ${theme('sz24')};
  }

  .post-square {
    position: relative;
    width: 100%;
    border-top-left-radius: ${theme('roundedNone')};
    border-top-right-radius: ${theme('roundedNone')};
  }

  .post-square::after {
    display: block;
    padding-bottom: 100%;
    content: '';
  }

  .post-action-row {
    display: flex;
    padding: ${theme('sz16')};

    i {
      margin-right: ${theme('sz8')};
    }
  }

  .post-likes {
    padding: ${theme('sz16')};
    padding-top: 0;
  }

  .post-description {
    padding: ${theme('sz16')};
    padding-top: 0;
  }

  .post-comments {
    padding: ${theme('sz16')};
    padding-top: 0;
  }

  .post-time-ago {
    padding: ${theme('sz16')};
    padding-top: 0;
  }
`

type FeedPostProps = {
  issue: Frag_Issue_FieldsFragment
}

export const FeedPost = ({ issue }: FeedPostProps): JSX.Element => {
  const postData = parseIfJson(issue.bodyText) as GitstagramPost
  const { src, altText } = postData.media[0]
  const likeCount = toReadableNum(issue.reactions.totalCount)
  const commentCount = toReadableNum(issue.comments.totalCount)
  const avatarUrl = issue?.author?.avatarUrl as string
  const authorLogin = issue?.author?.login as string

  const handleLike = () => {
    console.log('like')
  }

  const handleLikesClick = () => {
    console.log('likesCliced')
  }

  const handleCommentsClick = () => {
    console.log('commentsClicked')
  }

  return (
    <FeedPostStyles>
      <Panel className='post-panel'>
        <div className='post-header'>
          <ProfileIcon
            className='post-user'
            url={avatarUrl}
            userLogin={authorLogin}
          />
          <TextLink href={getProfilePath(authorLogin)} variant='title'>
            {authorLogin}
          </TextLink>
        </div>
        <div className='post-square'>
          <Image
            className='posts-square-image'
            unoptimized
            layout='fill'
            src={src}
            alt={altText}
          />
        </div>
        <div className='post-action-row'>
          <Button
            onClick={handleLike}
            variant={{
              icon: 'heart',
              ariaLabel: `Like this post`,
              size: 24,
            }}
          />
          <Button
            href={HOME}
            variant={{
              icon: 'chat',
              ariaLabel: `Comment on this post`,
              size: 24,
            }}
          />
        </div>
        <div className='post-likes'>
          <TextLink variant='title' as='button' onClick={handleLikesClick}>
            {likeCount}{' '}
            {pluralize({ word: 'like', number: issue.reactions.totalCount })}
          </TextLink>
        </div>
        {postData.caption.length >= 1 && (
          <div className='post-description'>
            <TextLink href={getProfilePath(authorLogin)} variant='title'>
              {authorLogin}
            </TextLink>{' '}
            <PreWrap str={postData.caption} />
          </div>
        )}
        {issue.comments.totalCount >= 1 && (
          <div className='post-comments'>
            <TextLink
              as='button'
              variant='deemph'
              onClick={handleCommentsClick}
            >
              View {commentCount}{' '}
              {pluralize({
                word: 'comment',
                number: issue.comments.totalCount,
              })}
            </TextLink>
          </div>
        )}
        <TextAttn className='post-time-ago'>5 hours ago</TextAttn>
      </Panel>
    </FeedPostStyles>
  )
}
