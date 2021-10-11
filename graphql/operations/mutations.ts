import { gql } from '@apollo/client'
import * as parts from 'graphql/operations/fragments/parts'

/*
 * gitstagram/gitstagram-library-template: R_kgDOGMruMg
 */
export const CLONE_GITSTAGRAM_LIBRARY = gql`
  ${parts.PART_Repository_With_Issues}

  mutation CloneGitstagramLibrary(
    $firstIssues: Int = 21
    $ownerId: ID!
    $description: String = ""
  ) {
    cloneTemplateRepository(
      input: {
        repositoryId: "R_kgDOGMruMg"
        visibility: PUBLIC
        name: "gitstagram-library"
        ownerId: $ownerId
        description: $description
      }
    ) {
      repository {
        ...PART_Repository_With_Issues
      }
    }
  }
`

export const UPDATE_REPOSITORY = gql`
  ${parts.PART_Repository_With_Issues}

  mutation UpdateRepository(
    $firstIssues: Int = 21
    $repositoryId: ID!
    $description: String!
  ) {
    updateRepository(
      input: { repositoryId: $repositoryId, description: $description }
    ) {
      repository {
        ...PART_Repository_With_Issues
      }
    }
  }
`
