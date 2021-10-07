import React, { useState } from 'react'
import styled from 'styled-components'
import { useDialogState, DialogDisclosure } from 'reakit/Dialog'
import {
  TextAttn,
  Button,
  TextInfo,
  Checkbox,
  Dialog,
  TextInput,
} from 'components/ui'
import { theme } from 'styles/themes'

type AccountDeleteProps = {
  name?: string
}

type DeleteState = 'base' | 'loading'

const AccountDeleteStyles = styled.div`
  .delete-title {
    margin-bottom: ${theme('sz16')};
  }

  .delete-inputs {
    display: flex;
    flex-direction: column;
  }
`

const DeleteDialogStyles = styled(Dialog)`
  .delete-body {
    max-width: 30ch;
  }

  .delete-header {
    color: ${theme('intentDanger_Color')};
  }

  .delete-final-warning {
    margin-bottom: ${theme('sz16')};
  }

  .delete-input {
    margin-bottom: ${theme('sz16')};
    text-align: center;
  }
`

export const AccountDelete = ({ name }: AccountDeleteProps): JSX.Element => {
  const dialog = useDialogState({ animated: true, modal: true })

  const [state, setState] = useState<DeleteState>('base')
  const [unstarState, setUnstarState] = useState<boolean>(true)
  const [confirmVal, setConfirmVal] = useState<string>('')

  const handleCheckboxChange = (value: boolean) => {
    setUnstarState(value)
  }

  const handleInputChange = (value: string) => {
    setConfirmVal(value)
  }

  const handleDeleteClick = () => {
    setState('loading')
  }

  const isLoading = state === 'loading'
  const icon = isLoading ? 'gear' : 'exclamation-triangle-fill'

  const unconfirmed = confirmVal !== `${name}/gitstagram-library`

  return (
    <AccountDeleteStyles>
      <TextAttn className='delete-title'>Delete Repository:</TextAttn>
      <div className='delete-inputs'>
        <Checkbox
          id='unstar'
          name='unstar'
          initialValue={unstarState}
          onChange={handleCheckboxChange}
          disabled={isLoading}
          label={<TextInfo>Also Unstar repositories:</TextInfo>}
        />
        <DialogDisclosure {...dialog}>
          {(props) => (
            <Button
              {...props}
              onClick={dialog.show}
              intent='danger-invert'
              disabled={isLoading}
              loading={isLoading}
              icon={{ icon, ariaHidden: true }}
              expand
            >
              Delete Repository
            </Button>
          )}
        </DialogDisclosure>
        <DeleteDialogStyles
          {...dialog}
          ariaLabel='Delete Gitstagram account dialog'
          disabled={isLoading}
          title={<span className='delete-header'>Delete Repository?</span>}
          footer={
            <Button
              onClick={handleDeleteClick}
              intent='danger-invert'
              disabled={unconfirmed || isLoading}
              loading={isLoading}
              icon={{ icon, ariaHidden: true }}
              expand
            >
              {isLoading ? 'Deleting...' : 'Confirm Deletion'}
            </Button>
          }
        >
          <div className='delete-body'>
            <TextInfo className='delete-final-warning'>
              This action <b>cannot</b> be undone. This will permanently delete
              the <kbd>{name}/gitstagram-library</kbd> repository, wiki, issues,
              comments, packages, secrets, workflow runs, and remove all
              collaborator associations.
            </TextInfo>
            <TextInput
              className='delete-input'
              id='delete-confirmation'
              name='delete-confirmation'
              initialValue={confirmVal}
              label='Please type mongkuen/gitstagram-library to confirm.'
              disabled={isLoading}
              onChange={handleInputChange}
            />
          </div>
        </DeleteDialogStyles>
      </div>
    </AccountDeleteStyles>
  )
}
