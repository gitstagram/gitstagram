import React, { useState, useRef } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { TextEmboss, Button, useTooltip } from 'components/ui'
import { theme } from 'styles/themes'
import { fileToB64, async, isImage } from 'helpers'

const removeTooltipId = 'remove-tooltip'

const NewStyles = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${theme('sz512')};
  margin-right: auto;
  margin-left: auto;

  .post-image {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    border: 0;
    clip: rect(0 0 0 0);
  }

  .post-square {
    position: relative;
    width: 100%;
    max-width: ${theme('sz384')};
    border-radius: ${theme('roundedLarge_BorderRadius')};
    box-shadow: ${theme('inset_BoxShadow')};

    &:hover,
    &:focus {
      background-color: ${theme('inset_BgColor__Hover')};
    }

    &:active {
      background-color: ${theme('inset_BgColor__Active')};
    }
  }

  .post-square::after {
    display: block;
    padding-bottom: 100%;
    content: '';
  }

  .post-square-content {
    position: absolute;
    width: 100%;
    height: 100%;

    div:first-child {
      border-radius: ${theme('roundedLarge_BorderRadius')};
    }
  }

  [aria-describedby=${removeTooltipId}] {
    position: absolute;
    top: ${theme('sz12')};
    right: ${theme('sz12')};
  }

  .post-remove-button {
    width: ${theme('sz32')};
    height: ${theme('sz32')};
  }

  .post-preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${theme('roundedLarge_BorderRadius')};
    box-shadow: ${theme('float_BoxShadow')};
  }

  .post-select-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    user-select: none;
  }
`

export const New = (): JSX.Element => {
  const [previewSrc, setPreviewSrc] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

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
        setError('File unreadable')
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

  const inputRef = useRef<HTMLInputElement | null>(null)
  return (
    <NewStyles>
      <input
        ref={inputRef}
        className='post-image'
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
                />
              </removeTip.Ref>
              <removeTip.Tip {...removeTip.props}>Remove photo</removeTip.Tip>
            </>
          )}
          {!previewSrc && (
            <label className='post-select-label' htmlFor='image'>
              <TextEmboss>{error ? error : 'Select a photo..'}</TextEmboss>
            </label>
          )}
        </div>
      </div>
    </NewStyles>
  )
}
