import { gql } from '@apollo/client'
import * as parts from 'graphql/operations/fragments/parts'

export const CREATE_GITSTAGRAM_LIBRARY = gql`
  ${parts.PART_Repository_With_Issues_On_CreateRepositoryPayload}

  mutation CreateGitstagramLibrary($firstIssues: Int = 21) {
    createRepository(
      input: { name: "gitstagram-library", visibility: PUBLIC }
    ) {
      ...PART_Repository_With_Issues_On_CreateRepositoryPayload
    }
  }
`
