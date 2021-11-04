import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'
import { Mistake } from 'components/mistake'
import { ProfilePostsStyles } from 'components/profile/profilePostsStyles'
import { useBodyScrollListener } from 'components/hooks'
import { Icon, TextSecondary, TextLink, TextInfo } from 'components/ui'
import { useViewerInfo } from 'components/data'
import {
  splitBy,
  padTo,
  isGitstagramPost,
  parseIfJson,
  GitstagramPost,
  toReadableNum,
} from 'helpers'
import {
  useGetViewerGitstagramLibraryQuery,
  useGetUserGitstagramLibraryQuery,
  GetViewerGitstagramLibraryQuery,
  GetViewerGitstagramLibraryQueryVariables,
} from 'graphql/generated'
import { NEW } from 'routes'

type ProfilePostsProps = {
  userLogin: string
}

export const ProfilePosts = ({ userLogin }: ProfilePostsProps): JSX.Element => {
  const viewerInfo = useViewerInfo()
  const isViewer = userLogin === viewerInfo.login

  const {
    data: userData,
    loading: userLoading,
    fetchMore: userFetchMore,
  } = useGetUserGitstagramLibraryQuery({
    skip: isViewer,
    notifyOnNetworkStatusChange: true,
    variables: {
      userLogin,
    },
  })

  const {
    data: viewerData,
    loading: viewerLoading,
    fetchMore: viewerFetchMore,
  } = useGetViewerGitstagramLibraryQuery({
    skip: !isViewer,
    notifyOnNetworkStatusChange: true,
    variables: {
      userLogin: viewerInfo.login,
    },
  })

  const profileData = userData?.user || viewerData?.viewer
  const posts = profileData?.repository?.issues.nodes
  const fetchMore = isViewer ? viewerFetchMore : userFetchMore
  const anyLoading = userLoading || viewerLoading

  const handleMore = () => {
    if (profileData?.repository?.issues.pageInfo.hasNextPage && !anyLoading) {
      const cursor = profileData.repository.issues.pageInfo.endCursor
      void fetchMore<
        GetViewerGitstagramLibraryQuery,
        GetViewerGitstagramLibraryQueryVariables
      >({
        variables: {
          userLogin,
          afterIssueCursor: cursor,
        },
      })
    }
  }
  useBodyScrollListener(handleMore)

  const splitPosts = posts && padTo(splitBy(posts, 3), 3)
  return (
    <ProfilePostsStyles>
      {!posts?.length && (
        <Mistake
          className='posts-empty'
          mistake='No Posts Yet'
          mistakeDescription='Why not share something?'
        >
          <TextLink href={NEW} deemph>
            Make a new post
          </TextLink>
        </Mistake>
      )}
      {!!posts?.length && (
        <div className='posts-grid'>
          {splitPosts?.map((row, index) => {
            return (
              <div key={index} className='posts-square-row'>
                {row.map((post, index) => {
                  const validPost = post && isGitstagramPost(post.bodyText)
                  if (post && validPost) {
                    const postData = parseIfJson(
                      post.bodyText
                    ) as GitstagramPost
                    const { src, altText } = postData.media[0]
                    const likeCount = toReadableNum(post.reactions.totalCount)
                    const commentCount = toReadableNum(post.comments.totalCount)

                    return (
                      <Link key={post.id} href='/'>
                        <a className='posts-square'>
                          <div className='posts-square-content'>
                            <div className='posts-image-container'>
                              <Image
                                className='posts-square-image'
                                unoptimized
                                layout='fill'
                                src={src}
                                alt={altText}
                              />
                            </div>
                            <div className='posts-square-overlay'>
                              <div className='posts-overlay-stats'>
                                <Icon
                                  icon='heart-fill'
                                  ariaLabel={`${likeCount} likes`}
                                />
                                <TextSecondary>{likeCount}</TextSecondary>
                              </div>
                              <div className='posts-overlay-stats'>
                                <Icon
                                  icon='chat-fill'
                                  ariaLabel={`${commentCount} comments`}
                                />
                                <TextSecondary>{commentCount}</TextSecondary>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    )
                  } else {
                    return post === undefined ? (
                      <div
                        key={index}
                        className={cn('posts-square', {
                          'glb-skeleton': anyLoading,
                        })}
                      />
                    ) : (
                      post && (
                        <a
                          key={post.id}
                          href={post.bodyUrl as string}
                          className='posts-square'
                          target='_blank'
                          rel='noreferrer'
                        >
                          <div className='posts-square-invalid'>
                            <Icon icon='exclamation-triangle-fill' ariaHidden />
                            <TextInfo>Invalid post</TextInfo>
                          </div>
                        </a>
                      )
                    )
                  }
                })}
              </div>
            )
          })}
          {anyLoading && (
            <div className='posts-square-row'>
              <div className='posts-square glb-skeleton' />
              <div className='posts-square glb-skeleton' />
              <div className='posts-square glb-skeleton' />
            </div>
          )}
        </div>
      )}
    </ProfilePostsStyles>
  )
}
