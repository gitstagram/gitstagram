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
      id
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
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        totalCount
      }
    }
  }
`

export const CACHE_UserInfo_LiftedProps = gql`
  fragment CACHE_UserInfo_LiftedProps on User {
    libraryRepoId @client
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
    fullyLoaded @client
  }
`

export const CACHE_UserInfo_HasBeen = gql`
  fragment CACHE_UserInfo_HasBeen on User {
    hasBeen @client
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
      libraryRepoId @client
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
  fragment CACHE_UserInfo_UserProps on User {
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
    fullyLoaded @client
  }
`
