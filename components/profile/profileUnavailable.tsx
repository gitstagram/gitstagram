import React from 'react'
import { Mistake } from 'components/mistake'
import { TextLink } from 'components/ui'
import { HOME } from 'routes'

export const ProfileUnavailable = (): JSX.Element => {
  return (
    <Mistake
      mistake='USER UNVIEWABLE'
      mistakeDescription='This user is not available. User may not exist, or the library has bad data.'
    >
      <TextLink href={HOME} deemph>
        Return to Home Page
      </TextLink>
    </Mistake>
  )
}
