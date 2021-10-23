import { gql } from '@apollo/client'

export const CACHE_Generate_UserInfo = gql`
  fragment CACHE_Generate_UserInfo on User {
    login
    avatarUrl
    name
    location
    twitterUsername
    bio
    repository(name: $repositoryName) {
      stargazerCount
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

export const CACHE_UserInfo = gql`
  query CACHE_UserInfo($login: String!) {
    userInfo(login: $login) @client {
      login
      avatarUrl
      name
      location
      twitterUsername
      bio
      stargazerCount
      issuesTotalCount
      following
    }
  }
`
