import { gql } from '@apollo/client'

export const CACHE_Generate_UserInfo_LiftedProps = gql`
  fragment CACHE_Generate_UserInfo_LiftedProps on User {
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

export const CACHE_UserInfo_UserLibData = gql`
  fragment CACHE_UserInfo_UserLibData on User {
    followingUsers @client
  }
`

export const CACHE_RestLibraryData = gql`
  fragment CACHE_RestLibraryData on RestLibraryData {
    content
    sha
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
      currentOid @client
      stargazerCount @client
      issuesTotalCount @client
      followingUsers @client
      followingTags @client
      saved @client
    }
  }
`

export const CACHE_UserInfo_UserProps = gql`
  query CACHE_UserInfo_UserProps($login: String!) {
    user(login: $login) {
      login
      avatarUrl
      name
      location
      twitterUsername
      bio
      stargazerCount @client
      issuesTotalCount @client
      followingUsers @client
      hasBeen @client
    }
  }
`
