import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useDialogState } from 'reakit/Dialog'
import { Panel, TextLink, Button, Icon, ReadableTime } from 'components/ui'
import { ProfileIcon } from 'components/profileIcon'
import { FeedCaption } from 'components/feed/feedCaption'
import { LikesDialog } from 'components/feed/likesDialog'
import { FeedPostStyles } from 'components/feed/feedPostStyles'
import {
  parseIfJson,
  GitstagramPost,
  toReadableNum,
  pluralize,
  captureException,
} from 'helpers'
import { Frag_Issue_FieldsFragment } from 'graphql/generated'
import { useAddHeartMutation, useRemoveHeartMutation } from 'graphql/operations'
import { getProfilePath, getCommentsPath } from 'routes'

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
    const timeout = setTimeout(() => likeOverlay && setLikeOverlay(false), 500)
    return () => clearTimeout(timeout)
  }, [likeOverlay, setLikeOverlay])

  const [likesDialogMounted, setLikesDialogMounted] = useState(false)
  const likesDialog = useDialogState({
    animated: true,
    modal: true,
    baseId: 'LikesDialog',
  })

  useEffect(() => {
    if (likesDialog.visible && !likesDialogMounted) setLikesDialogMounted(true)
  }, [likesDialog.visible, likesDialogMounted])

  const handleLikesClick = () => likesDialog.toggle()

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
          <Link href={getCommentsPath(issue.id)}>
            <a>
              <Icon
                clickable
                icon='chat'
                ariaLabel='Comment on this post'
                size={24}
              />
            </a>
          </Link>
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
            <TextLink variant='disclosure' href={getCommentsPath(issue.id)}>
              View {commentCount}{' '}
              {pluralize({
                word: 'comment',
                number: issue.comments.totalCount,
              })}
            </TextLink>
          </div>
        )}
        <ReadableTime
          className='post-time-ago'
          isoString={issue.createdAt as string}
        />
      </Panel>
      {likesDialogMounted && (
        <LikesDialog issueId={issue.id} dialogProps={likesDialog} />
      )}
    </FeedPostStyles>
  )
}
