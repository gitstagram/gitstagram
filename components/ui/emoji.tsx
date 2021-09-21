import React, { FC } from 'react'
import styled from 'styled-components'

interface EmojiProps extends ComponentProps {
  emoji: string
  ariaLabel: string
}

const EmojiStyles = styled.span``

export const Emoji: FC<EmojiProps> = ({ emoji, ariaLabel, ...props }) => {
  return (
    <EmojiStyles role='img' aria-label={ariaLabel} {...props}>
      {emoji}
    </EmojiStyles>
  )
}
