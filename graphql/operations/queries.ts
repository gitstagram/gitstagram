import { gql } from '@apollo/client'
import * as frags from 'graphql/operations/fragments/fields'
import * as parts from 'graphql/operations/fragments/parts'

export const GET_VIEWER_GITSTAGRAM_LIBRARY = gql`
  ${parts.PART_Repository_With_Issues}
  ${frags.FRAG_User_Fields}

  query GetViewerGitstagramLibrary(
    $repositoryName: String = "gitstagram-library"
    $firstIssues: Int = 21
    $filterIssuesStates: [IssueState!] = OPEN
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
  ) {
    user(login: $userLogin) {
      ...FRAG_User_Fields
      repository(name: $repositoryName) {
        ...PART_Repository_With_Issues
      }
    }
  }
`

export const GET_VIEWER = gql`
  ${frags.FRAG_User_Fields}

  query GetViewer {
    viewer {
      ...FRAG_User_Fields
    }
  }
`

export const SEARCH_USERS = gql`
  ${frags.FRAG_User_Fields}

  query SearchUsers($loginSearch: String!, $firstRepositories: Int = 50) {
    search(query: $loginSearch, type: REPOSITORY, first: $firstRepositories) {
      nodes {
        ... on Repository {
          id
          name
          owner {
            ...FRAG_User_Fields
          }
        }
      }
    }
  }
`
