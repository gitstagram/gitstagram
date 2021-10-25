import { gql } from '@apollo/client'

export const CACHE_Generate_UserInfo_ViewerProps = gql`
  fragment CACHE_Generate_UserInfo_ViewerProps on User {
    login
    avatarUrl
    name
    location
    twitterUsername
    bio
    repository(name: $repositoryName) {
      stargazerCount
      defaultBranchRef {
        target {
          oid
        }
      }
      issues(
        first: $firstIssues
        filterBy: {
          labels: "gitstagram-library-post"
          states: $filterIssuesStates
          createdBy: $userLogin
        }
      ) {
        totalCount
      }
    }
  }
`

export const CACHE_UserInfo_LiftedProps = gql`
  fragment CACHE_UserInfo_LiftedProps on User {
    currentOid @client
    stargazerCount @client
    issuesTotalCount @client
  }
`

export const CACHE_UserInfo_ViewerLibData = gql`
  fragment CACHE_UserInfo_ViewerLibData on User {
    followingUsers @client
    followingTags @client
    saved @client
  }
`

export const CACHE_UserInfo_ViewerProps = gql`
  query CACHE_UserInfo_ViewerProps {
    viewer {
      login
      avatarUrl
      name
      location
      twitterUsername
      bio
      currentOid
      stargazerCount
      issuesTotalCount
      followingUsers
      followingTags
      saved
    }
  }
`
