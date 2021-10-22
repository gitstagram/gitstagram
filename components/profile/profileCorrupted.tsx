import React from 'react'
import { Mistake } from 'components/mistake'
import { TextLink } from 'components/ui'
import { HOME } from 'routes'

export const ProfileCorrupted = (): JSX.Element => {
  return (
    <Mistake
      mistake='USER UNVIEWABLE'
      mistakeDescription='This user is not viewable. Their library might be corrupted or have bad data.'
    >
      <TextLink href={HOME} deemph>
        Return to Home Page
      </TextLink>
    </Mistake>
  )
}
