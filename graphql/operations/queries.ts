import { gql } from '@apollo/client'
import * as parts from 'graphql/operations/fragments/parts'

export const GET_VIEWER_GITSTAGRAM_LIBRARY = gql`
  ${parts.PART_Repository_With_Issues}

  query GetViewerGitstagramLibrary(
    $repositoryName: String = "gitstagram-library"
    $firstIssues: Int = 21
  ) {
    viewer {
      ...PART_Repository_With_Issues
    }
  }
`

export const GET_USER_GITSTAGRAM_LIBRARY = gql`
  ${parts.PART_Repository_With_Issues}

  query GetUserGitstagramLibrary(
    $userName: String!
    $repositoryName: String = "gitstagram-library"
    $firstIssues: Int = 21
  ) {
    user(login: $userName) {
      ...PART_Repository_With_Issues
    }
  }
`
