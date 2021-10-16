import React, { useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { signOut } from 'next-auth/client'
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

import {
  deleteStarQueryPromise,
  deleteRepoQueryPromise,
} from 'graphql/restOperations'
import { promiseReduce, captureException } from 'helpers'

type AccountDeleteProps = {
  viewerLogin: string
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
    margin-bottom: ${theme('sz8')};
    text-align: center;

    label {
      margin-bottom: ${theme('sz8')};
    }
  }
`

export const AccountDelete = ({
  viewerLogin,
}: AccountDeleteProps): JSX.Element => {
  const dialog = useDialogState({
    animated: true,
    modal: true,
    baseId: 'AccountDelete',
  })

  const [state, setState] = useState<DeleteState>('base')
  const [unstarState, setUnstarState] = useState<boolean>(false)
  const [confirmVal, setConfirmVal] = useState<string>('')

  const handleCheckboxChange = (value: boolean) => {
    setUnstarState(value)
  }

  const handleInputChange = (value: string) => {
    setConfirmVal(value)
  }

  const handleDelete = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setState('loading')
    const followingList: string[] = []

    const unstarLoginList: string[] = unstarState ? followingList : []
    const promises = unstarLoginList.map((userLogin) =>
      deleteStarQueryPromise({ userLogin: userLogin }).catch(() => {
        // noop: this request not important if it fails
      })
    )
    void promiseReduce(promises)
      .then(() => {
        return deleteRepoQueryPromise({ userLogin: viewerLogin })
      })
      .catch((err: unknown) => {
        captureException({ err, msgs: ['Delete repo failed'] })
        toast.warn(`Problem processing this request.`)
      })
      .finally(() => void signOut())
  }

  const isLoading = state === 'loading'
  const icon = isLoading ? 'gear' : 'exclamation-triangle-fill'

  const unconfirmed = confirmVal !== `${viewerLogin}/gitstagram-library`

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
              intent='danger-invert-important'
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
          hasFormAndOnSubmit={handleDelete}
          ariaLabel='Delete Gitstagram account dialog'
          disabled={isLoading}
          title={<span className='delete-header'>Delete Repository?</span>}
          footer={
            <Button
              type='submit'
              onClick={handleDelete}
              intent='danger-invert-important'
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
              the <kbd>{viewerLogin}/gitstagram-library</kbd> repository, wiki,
              issues, comments, packages, secrets, workflow runs, and remove all
              collaborator associations.
            </TextInfo>
            <TextInput
              className='delete-input'
              id='delete-confirmation'
              name='delete-confirmation'
              initialValue={confirmVal}
              label={`Please type ${viewerLogin}/gitstagram-library to confirm.`}
              disabled={isLoading}
              onChange={handleInputChange}
            />
          </div>
        </DeleteDialogStyles>
      </div>
    </AccountDeleteStyles>
  )
}
