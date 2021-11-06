import { gql } from '@apollo/client'
import * as frags from 'graphql/documents/fragments/fields'
import * as parts from 'graphql/documents/fragments/parts'

export const GET_VIEWER_GITSTAGRAM_LIBRARY = gql`
  ${parts.PART_Repository_With_Issues}
  ${frags.FRAG_User_Fields}

  query GetViewerGitstagramLibrary(
    $repositoryName: String = "gitstagram-library"
    $firstIssues: Int = 21
    $filterIssuesStates: [IssueState!] = OPEN
    $afterIssueCursor: String
    $userLogin: String!
  ) {
    viewer {
      ...FRAG_User_Fields
      repository(name: $repositoryName) {
        ...PART_Repository_With_Issues
      }
    }
  }
`

export const GET_USER_GITSTAGRAM_LIBRARY = gql`
  ${parts.PART_Repository_With_Issues}
  ${frags.FRAG_User_Fields}

  query GetUserGitstagramLibrary(
    $userLogin: String!
    $repositoryName: String = "gitstagram-library"
    $firstIssues: Int = 21
    $filterIssuesStates: [IssueState!] = OPEN
    $afterIssueCursor: String
  ) {
    user(login: $userLogin) {
      ...FRAG_User_Fields
      repository(name: $repositoryName) {
        ...PART_Repository_With_Issues
      }
    }
  }
`

export const SEARCH_USERS = gql`
  ${frags.FRAG_User_Fields}
  ${frags.FRAG_Repository_Fields}

  query SearchUsers($loginSearch: String!, $firstRepositories: Int = 50) {
    search(query: $loginSearch, type: REPOSITORY, first: $firstRepositories) {
      nodes {
        ... on Repository {
          ...FRAG_Repository_Fields
          owner {
            ...FRAG_User_Fields
          }
        }
      }
    }
  }
`

export const GET_STARGAZERS = gql`
  ${frags.FRAG_Repository_Stargazers}
  ${frags.FRAG_Repository_Fields}

  query GetStargazers(
    $userLogin: String!
    $repositoryName: String = "gitstagram-library"
    $firstStargazers: Int = 50
    $afterStargazers: String
  ) {
    repository(name: $repositoryName, owner: $userLogin) {
      ...FRAG_Repository_Fields
      ...FRAG_Repository_Stargazers
    }
  }
`

export const GET_FOLLOWING = gql`
  ${frags.FRAG_User_Fields}

  query GetFollowing($followingSearch: String!, $firstUsers: Int = 50) {
    search(query: $followingSearch, type: USER, first: $firstUsers) {
      nodes {
        ...FRAG_User_Fields
      }
    }
  }
`

export const GET_ISSUE_NODE = gql`
  ${frags.FRAG_Issue_Fields}

  query GetIssueNode($issueId: ID!) {
    node(id: $issueId) {
      ...FRAG_Issue_Fields
    }
  }
`

export const GET_FEED = gql`
  # hack to identify feed search
  fragment FeedSearchIdentifier on SearchResultItemConnection {
    pageInfo {
      endCursor
      hasNextPage
    }
  }

  ${frags.FRAG_Issue_Fields}

  query GetFeed($feedSearch: String!, $firstIssues: Int = 25) {
    search(query: $feedSearch, type: ISSUE, first: $firstIssues) {
      nodes {
        ...FRAG_Issue_Fields
      }
      ...FeedSearchIdentifier
    }
  }
`
