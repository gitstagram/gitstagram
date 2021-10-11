import { gql } from '@apollo/client'
import * as parts from 'graphql/operations/fragments/parts'

export const CREATE_GITSTAGRAM_LIBRARY = gql`
  ${parts.PART_Repository_With_Issues_On_CreateRepositoryPayload}

  mutation CreateGitstagramLibrary(
    $firstIssues: Int = 21
    $description: String = ""
  ) {
    createRepository(
      input: {
        name: "gitstagram-library"
        visibility: PUBLIC
        description: $description
      }
    ) {
      ...PART_Repository_With_Issues_On_CreateRepositoryPayload
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
