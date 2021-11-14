import React from 'react'
import { PreWrap, TextLink } from 'components/ui'
import {
  useDisclosureState,
  Disclosure,
  DisclosureContent,
} from 'reakit/Disclosure'

type FeedCaptionProps = {
  caption: string
}

const truncationLength = 150

export const FeedCaption = ({ caption }: FeedCaptionProps): JSX.Element => {
  const lineBrokenParts = caption.split('\n')
  const hasManyLines = lineBrokenParts.length > 1
  const firstPortion = lineBrokenParts[0]
  const firstPortionTooLong = firstPortion.length > truncationLength
  const truncatedFirstPortion = firstPortionTooLong
    ? firstPortion.slice(0, truncationLength)
    : firstPortion

  const disclosure = useDisclosureState({ visible: false })

  const handleMoreClick = () => {
    disclosure.setVisible(true)
  }

  if (hasManyLines || firstPortionTooLong) {
    return (
      <>
        {!disclosure.visible && (
          <PreWrap str={`${truncatedFirstPortion}... `} />
        )}
        <DisclosureContent {...disclosure}>
          {(props) =>
            disclosure.visible && <PreWrap str={caption} {...props} />
          }
        </DisclosureContent>
        <Disclosure {...disclosure}>
          {(props) =>
            !disclosure.visible && (
              <TextLink
                as='button'
                variant='disclosure'
                onClick={handleMoreClick}
                {...props}
              >
                more
              </TextLink>
            )
          }
        </Disclosure>
      </>
    )
  } else {
    return <PreWrap str={firstPortion} />
  }
}
