import React from 'react'
import styled from 'styled-components'
import { useViewerInfo } from 'components/data'
import { Panel, TextAttn, TextInfo, Button, Hr } from 'components/ui'
import { AccountExportIssues } from 'components/settings/accountExportIssues'
import { AccountDelete } from 'components/settings/accountDelete'
import { theme } from 'styles/themes'

const AccountSectionStyles = styled(Panel)`
  .account-info {
    max-width: 45ch;
    margin-top: ${theme('sz24')};
    margin-bottom: ${theme('sz24')};
  }

  .account-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: ${theme('sz12')};
    margin-bottom: ${theme('sz24')};

    button {
      margin-left: ${theme('sz16')};
    }
  }
`

export const AccountSection = (): JSX.Element => {
  const viewerInfo = useViewerInfo()
  const viewerLogin = viewerInfo.login

  return (
    <AccountSectionStyles>
      <TextInfo className='account-info'>
        The <kbd>`gitstagram-library`</kbd> repository holds Gitstagram posts
        and uploaded images , as well as follower/followings and other metadata
        information.
      </TextInfo>
      <div className='account-action'>
        <TextAttn>Export repository:</TextAttn>
        <Button
          as='a'
          intent='success-invert'
          href={`https://github.com/${viewerLogin}/gitstagram-library/archive/refs/heads/main.zip`}
          icon={{ icon: 'file-earmark-zip', ariaHidden: true }}
        >
          Download Zip
        </Button>
      </div>
      <Hr deemph />
      <TextInfo className='account-info'>
        The repository&apos;s issues holds interactive data with other users
        such as comments and likes. Exporting calls the REST API in batches of
        100 until all issues are exported.
      </TextInfo>
      <div className='account-action'>
        <AccountExportIssues
          viewerLogin={viewerLogin}
          totalIssues={viewerInfo.issuesTotalCount}
        />
      </div>
      <Hr deemph />
      <TextInfo className='account-info'>
        Deleting Gitstagram removes the repository and all data permanently. You
        may also optionally unstar all repositories the app has followed.
      </TextInfo>
      <AccountDelete viewerLogin={viewerLogin} />
    </AccountSectionStyles>
  )
}
