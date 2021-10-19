import React from 'react'
import { DialogStateReturn } from 'reakit/Dialog'
import { FollowDialogStyles } from 'components/profile/followDialogStyles'

type FollowingDialogProps = BaseProps & {
  dialogProps: DialogStateReturn
}

export const FollowingDialog = ({
  dialogProps,
}: FollowingDialogProps): JSX.Element => {
  return (
    <FollowDialogStyles
      {...dialogProps}
      ariaLabel='Following list dialog'
      title='Following'
    >
      Following
    </FollowDialogStyles>
  )
}
