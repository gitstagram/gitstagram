import { gql } from '@apollo/client'
import * as fields from 'graphql/operations/fragments/fields'

export const PART_Repository_With_Issues = gql`
  ${fields.FRAG_Repository_Fields}
  ${fields.FRAG_Repository_Issues}

  fragment PART_Repository_With_Issues on User {
    repository(name: $repositoryName) {
      ...FRAG_Repository_Fields
      ...FRAG_Repository_Issues
    }
  }
`
