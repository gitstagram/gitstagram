import { gql } from '@apollo/client'
import * as parts from 'graphql/operations/fragments/parts'

/*
 * gitstagram/gitstagram-library-template: R_kgDOGMruMg
 */
export const CLONE_GITSTAGRAM_LIBRARY = gql`
  ${parts.PART_Repository_With_Issues_On_CloneTemplateRepositoryPayload}

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
      ...PART_Repository_With_Issues_On_CloneTemplateRepositoryPayload
    }
  }
`

export const UPDATE_REPOSITORY = gql`
  ${parts.PART_Repository_On_UpdateRepositoryPayload}

  mutation UpdateRepository($repositoryId: ID!, $description: String!) {
    updateRepository(
      input: { repositoryId: $repositoryId, description: $description }
    ) {
      ...PART_Repository_On_UpdateRepositoryPayload
    }
  }
`
