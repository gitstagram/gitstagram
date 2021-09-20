import React, { FC } from 'react'

const nextImgWrapperStyles = {
  position: 'relative' as const,
  height: '100%',
}

export const NextImgWrapper: FC = ({ children }) => {
  return <div style={nextImgWrapperStyles}>{children}</div>
}
