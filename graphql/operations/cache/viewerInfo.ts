import { gql } from '@apollo/client'

export const CACHE_Generate_ViewerInfo = gql`
  fragment CACHE_Generate_ViewerInfo on User {
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

export const CACHE_ViewerInfo = gql`
  query CACHE_ViewerInfo {
    viewerInfo @client {
      login
      avatarUrl
      name
      location
      twitterUsername
      bio
      currentOid
      stargazerCount
      issuesTotalCount
      following
      followingTags
      saved
    }
  }
`
