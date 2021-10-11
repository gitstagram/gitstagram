import { gql } from '@apollo/client'
import * as frags from 'graphql/operations/fragments/fields'
import * as parts from 'graphql/operations/fragments/parts'

export const GET_VIEWER_GITSTAGRAM_LIBRARY = gql`
  ${parts.PART_Repository_With_Issues}
  ${frags.FRAG_User_Fields}

  query GetViewerGitstagramLibrary(
    $repositoryName: String = "gitstagram-library"
    $firstIssues: Int = 21
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

  query GetUserGitstagramLibrary(
    $userLogin: String!
    $repositoryName: String = "gitstagram-library"
    $firstIssues: Int = 21
  ) {
    user(login: $userLogin) {
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
