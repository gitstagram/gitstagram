import { gql } from '@apollo/client'
import * as frags from 'graphql/operations/fragments/fields'
import * as parts from 'graphql/operations/fragments/parts'

export const GET_VIEWER_GITSTAGRAM_LIBRARY = gql`
  ${parts.PART_Repository_With_Issues_On_User}
  ${frags.FRAG_User_Fields}

  query GetViewerGitstagramLibrary(
    $repositoryName: String = "gitstagram-library"
    $firstIssues: Int = 21
  ) {
    viewer {
      ...FRAG_User_Fields
      ...PART_Repository_With_Issues_On_User
    }
  }
`

export const GET_USER_GITSTAGRAM_LIBRARY = gql`
  ${parts.PART_Repository_With_Issues_On_User}

  query GetUserGitstagramLibrary(
    $userLogin: String!
    $repositoryName: String = "gitstagram-library"
    $firstIssues: Int = 21
  ) {
    user(login: $userLogin) {
      ...PART_Repository_With_Issues_On_User
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
