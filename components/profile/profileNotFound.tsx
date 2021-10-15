import React from 'react'
import { Mistake } from 'components/mistake'
import { TextLink } from 'components/ui'
import { HOME } from 'routes'

export const ProfileNotFound = (): JSX.Element => {
  return (
    <Mistake
      mistake='USER NOT FOUND'
      mistakeDescription='This user does not exist. Or it might have been changed or removed.'
    >
      <TextLink href={HOME} deemph>
        Return to Home Page
      </TextLink>
    </Mistake>
  )
}
