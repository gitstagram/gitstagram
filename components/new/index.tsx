import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { ProfileIcon } from 'components/profileIcon'
import { NewStyles, removeTooltipId } from 'components/new/newStyles'
import { TextEmboss, Button, useTooltip, Panel, TextArea } from 'components/ui'
import {
  fileToB64,
  async,
  isImage,
  GitstagramPost,
  getUniqueSanitizedFileName,
  captureException,
  getUploadRawUrl,
  getHashtags,
} from 'helpers'
import { useViewerInfo } from 'components/data'
import {
  createCommitMutationPromise,
  createIssueMutationPromise,
} from 'graphql/operations'
import { getProfilePath } from 'routes'

type NewState = 'base' | 'loading'

export const New = (): JSX.Element => {
  const viewerInfo = useViewerInfo()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [loadingState, setLoadingState] = useState<NewState>('base')
  const [caption, setCaption] = useState<string>('')
  const [previewSrc, setPreviewSrc] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleCaption: InputChangeHandler<string> = (val) => {
    setCaption(val)
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const input = e.target
    const file = input?.files && input.files[0]
    if (file) {
      const { res: isFile, err: isFileErr } = await async(isImage(file))
      if (!isFile || isFileErr) {
        setError('Invalid file, try again?')
        return
      }

      const { res: parsedImg, err: parsedErr } = await async(
        fileToB64({ file, withMeta: true })
      )
      if (parsedErr) {
        setError('File unreadable, try again?')
        return
      }
      setError(undefined)
      setPreviewSrc(parsedImg)
    }
  }

  const removeTip = useTooltip({
    baseId: removeTooltipId,
    placement: 'bottom',
    gutter: 4,
  })

  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = () => {
    setPreviewSrc(undefined)
    if (inputRef?.current) inputRef.current.value = ''
    removeTip.props.hide()
  }

  const handleSubmit = async () => {
    setLoadingState('loading')

    const file = inputRef.current?.files && inputRef.current.files[0]
    if (file) {
      const { res: isFile, err: isFileErr } = await async(isImage(file))
      if (!isFile || isFileErr) {
        toast.warn('Invalid file, try again?')
        setLoadingState('base')
        return
      }

      const { res: parsedRawImg, err: parsedErr } = await async(
        fileToB64({ file, withMeta: false })
      )
      if (parsedErr) {
        toast.warn('File unreadable, try again?')
        setLoadingState('base')
        return
      }
      const fileName = getUniqueSanitizedFileName(file.name)

      const { err: uploadErr } = await async(
        createCommitMutationPromise({
          b64Contents: parsedRawImg,
          path: `media/${fileName}`,
          commitMessage: `Add media: ${fileName}`,
        })
      )

      if (uploadErr) {
        toast.warn('Upload failed, try again?')
        captureException({
          inside: 'New:handleSubmit',
          msgs: ['Creating file upload commit failed'],
        })
        setLoadingState('base')
        return
      }

      const creationMsg = `${viewerInfo.login} posted ${fileName}`

      const mediaObj = {
        src: getUploadRawUrl(viewerInfo.login, fileName),
        altText: creationMsg,
        taggedUsers: [],
      }

      const post: GitstagramPost = {
        media: [mediaObj],
        location: '',
        caption,
      }

      const { err: postErr } = await async(
        createIssueMutationPromise({
          title: creationMsg,
          body: JSON.stringify(post, null, 2),
          labels: getHashtags(caption),
        })
      )

      if (postErr) {
        toast.warn('Posting file failed, try again?')
        captureException({
          inside: 'New:handleSubmit',
          msgs: ['Creating issue failed'],
        })
        setLoadingState('base')
        return
      }

      void router.push(getProfilePath(viewerInfo.login))
    }
  }

  return (
    <NewStyles>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className='glb-clip-hide'
          type='file'
          id='image'
          onChange={handleChange}
          accept='image/*'
        />
        <div className='post-square'>
          <div className='post-square-content'>
            {previewSrc && (
              <>
                <Image
                  unoptimized
                  className='post-preview-image'
                  layout='fill'
                  src={previewSrc}
                  alt='Upload preview'
                />
                <removeTip.Ref {...removeTip.props}>
                  <Button
                    className='post-remove-button'
                    variant={{
                      icon: 'x-lg',
                      ariaLabel: 'Remove photo',
                      size: 12,
                    }}
                    intent='rounded'
                    onClick={handleRemove}
                    disabled={loadingState === 'loading'}
                  />
                </removeTip.Ref>
                <removeTip.Tip {...removeTip.props}>Remove photo</removeTip.Tip>
              </>
            )}
            {!previewSrc && (
              <label className='post-select-label' htmlFor='image'>
                <TextEmboss>{error ? error : 'Select a photo...'}</TextEmboss>
              </label>
            )}
          </div>
        </div>
        <Panel className='post-caption-panel'>
          <ProfileIcon className='post-user-icon' useViewer />
          <TextArea
            className='post-caption-input'
            id='post-caption'
            name='post-caption'
            initialValue={caption}
            placeholderText='Write a caption...'
            onChange={handleCaption}
            disabled={loadingState === 'loading'}
          />
        </Panel>
        <Button
          spanClassName='post-submit'
          onClick={handleSubmit}
          disabled={!previewSrc || loadingState === 'loading'}
          loading={loadingState === 'loading'}
          icon={
            loadingState === 'loading'
              ? { icon: 'gear', ariaHidden: true }
              : undefined
          }
        >
          {loadingState === 'base' ? 'Submit Post' : 'Submitting...'}
        </Button>
      </form>
    </NewStyles>
  )
}
