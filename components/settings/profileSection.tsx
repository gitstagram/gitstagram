import React, { useState } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useViewerInfo } from 'components/data'
import { theme } from 'styles/themes'
import {
  Panel,
  TextInput,
  Button,
  TextArea,
  TextLink,
  Icon,
} from 'components/ui'
import { ProfileIcon } from 'components/profileIcon'
import { updateUserMutationPromise } from 'graphql/operations'
import { captureException } from 'helpers'

const ProfileSectionStyles = styled(Panel)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    width: 100%;
  }

  button {
    max-width: ${theme('sz192')};
  }

  .profile-image {
    margin-bottom: ${theme('sz8')};
  }

  .profile-input {
    width: 100%;
    margin-bottom: ${theme('sz24')};
  }

  .profile-edit {
    display: flex;
    align-items: center;
    margin-top: ${theme('sz32')};

    i {
      margin-right: ${theme('sz8')};
    }
  }
`
type SubmitState = 'base' | 'loading'

export const ProfileSection = (): JSX.Element => {
  const viewerInfo = useViewerInfo()
  const [submitState, setSubmitState] = useState<SubmitState>('base')

  const profileForm = useFormik({
    initialValues: {
      name: viewerInfo.name || '',
      location: viewerInfo.location || '',
      twitterUsername: viewerInfo.twitterUsername || '',
      bio: viewerInfo.bio || '',
    },
    onSubmit: (values) => {
      setSubmitState('loading')
      void updateUserMutationPromise({ ...values })
        .catch((err: unknown) => {
          toast.warn(`Problem processing this request.`)
          captureException({
            err,
            inside: 'ProfileSection',
            msgs: ['User update failed'],
          })
        })
        .finally(() => setSubmitState('base'))
    },
  })

  const isLoading = submitState === 'loading'
  const icon = isLoading ? 'gear' : 'person'

  const handleChange = (field: string) => {
    return (e: string) => profileForm.setFieldValue(field, e)
  }

  return (
    <ProfileSectionStyles>
      <ProfileIcon className='profile-image' size={96} useViewer />
      <form onSubmit={profileForm.handleSubmit}>
        <TextInput
          className='profile-input'
          id='profile-username'
          name='profile-username'
          initialValue={viewerInfo.login}
          label='Username'
          disabled
        />
        <TextInput
          className='profile-input'
          id='profile-name'
          name='profile-name'
          initialValue={profileForm.values.name}
          onChange={handleChange('name')}
          placeholderText='Name...'
          label='Name'
        />
        <TextInput
          className='profile-input'
          id='profile-location'
          name='profile-location'
          initialValue={profileForm.values.location}
          onChange={handleChange('location')}
          placeholderText='Location...'
          label='Location'
        />
        <TextInput
          className='profile-input'
          id='profile-twitter'
          name='profile-twitter'
          initialValue={profileForm.values.twitterUsername}
          onChange={handleChange('twitterUsername')}
          placeholderText='Twitter handle...'
          label='Twitter handle'
        />
        <TextArea
          className='profile-input'
          id='profile-bio'
          name='profile-bio'
          initialValue={profileForm.values.bio}
          onChange={handleChange('bio')}
          placeholderText='Bio...'
          label='Bio'
        />
        <Button
          type='submit'
          onClick={profileForm.handleSubmit}
          intent='success-invert'
          disabled={isLoading}
          loading={isLoading}
          icon={{ icon, ariaHidden: true }}
          expand
        >
          {isLoading ? 'Updating profile' : 'Update profile'}
        </Button>
      </form>
      <TextLink
        className='profile-edit'
        href='https://github.com/settings/profile'
        variant='deemph'
        external
      >
        <Icon icon='github' ariaHidden />
        Edit on Github
      </TextLink>
    </ProfileSectionStyles>
  )
}
