import { gql } from '@apollo/client'
import * as fields from 'graphql/operations/fragments/fields'

export const PART_Repository_With_Issues_On_User = gql`
  ${fields.FRAG_Repository_Fields}
  ${fields.FRAG_Repository_Issues}

  fragment PART_Repository_With_Issues_On_User on User {
    repository(name: $repositoryName) {
      ...FRAG_Repository_Fields
      ...FRAG_Repository_Issues
    }
  }
`

export const PART_Repository_With_Issues_On_CreateRepositoryPayload = gql`
  ${fields.FRAG_Repository_Fields}
  ${fields.FRAG_Repository_Issues}

  fragment PART_Repository_With_Issues_On_CreateRepositoryPayload on CreateRepositoryPayload {
    repository {
      ...FRAG_Repository_Fields
      ...FRAG_Repository_Issues
    }
  }
`
