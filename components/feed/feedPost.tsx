import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import cn from 'classnames'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { Panel, TextLink, Button, TextAttn, Icon } from 'components/ui'
import { ProfileIcon } from 'components/profileIcon'
import { FeedCaption } from 'components/feed/feedCaption'
import { theme } from 'styles/themes'
import {
  parseIfJson,
  GitstagramPost,
  toReadableNum,
  pluralize,
  captureException,
} from 'helpers'
import { Frag_Issue_FieldsFragment } from 'graphql/generated'
import { useAddHeartMutation, useRemoveHeartMutation } from 'graphql/operations'
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

  .post-like-overlay {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: ${theme('trans_All')};

    i {
      transform: scale(2);
    }

    &.active {
      transform: scale(2.5);
      opacity: 1;
    }
  }

  @media screen and (prefers-reduced-motion: reduce) {
    .post-like-overlay {
      transition: none;
    }
  }

  .post-action-row {
    display: flex;
    padding: ${theme('sz16')};

    i {
      margin-right: ${theme('sz8')};
    }

    .bi-heart-fill {
      color: ${theme('intentSplendid_Color')};
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
  const [addHeart, { loading: addHeartLoading }] = useAddHeartMutation({
    subjectId: issue.id,
  })

  const [removeHeart, { loading: removeHeartLoading }] = useRemoveHeartMutation(
    {
      subjectId: issue.id,
    }
  )

  const [likeOverlay, setLikeOverlay] = useState(false)

  const postData = parseIfJson(issue.body) as GitstagramPost
  const { src, altText } = postData.media[0]
  const likeCount = toReadableNum(issue.reactions.totalCount)
  const commentCount = toReadableNum(issue.comments.totalCount)
  const avatarUrl = issue?.author?.avatarUrl as string
  const authorLogin = issue?.author?.login as string
  const heartIcon = issue.reactions.viewerHasReacted ? 'heart-fill' : 'heart'
  const heartAction = issue.reactions.viewerHasReacted ? 'Like' : 'Unlike'

  const problemEncountered = (err: unknown) => {
    toast.warn('Encountered issue handling likes')
    captureException({
      err,
      inside: 'FeedPost:problemEncountered',
      msgs: [[err, 'Error handling like']],
    })
  }

  const handleLike = () => {
    setLikeOverlay(true)
    void addHeart().catch(problemEncountered)
  }

  const handleLikeActionRowClick = () => {
    issue.reactions.viewerHasReacted
      ? void removeHeart().catch(problemEncountered)
      : handleLike()
  }

  const handlePostClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.detail === 2) handleLike()
  }

  const handlePostKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.code === 'Enter') handleLike()
  }

  useEffect(() => {
    setTimeout(() => likeOverlay && setLikeOverlay(false), 500)
  }, [likeOverlay])

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
        <div
          className='post-square'
          onClick={handlePostClick}
          onKeyDown={handlePostKeyDown}
          role='button'
          tabIndex={0}
        >
          <Image
            className='posts-square-image'
            unoptimized
            layout='fill'
            src={src}
            alt={altText}
          />
          <div className={cn('post-like-overlay', { active: likeOverlay })}>
            <Icon icon='heart-fill' ariaLabel='Like this post' />
          </div>
        </div>
        <div className='post-action-row'>
          <Button
            onClick={handleLikeActionRowClick}
            disabled={addHeartLoading || removeHeartLoading}
            variant={{
              icon: heartIcon,
              ariaLabel: `${heartAction} this post`,
              size: 24,
            }}
          />
          <Button
            href={HOME}
            variant={{
              icon: 'chat',
              ariaLabel: 'Comment on this post',
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
            <FeedCaption caption={postData.caption} />
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
