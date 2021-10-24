import { gql } from '@apollo/client'
import * as fields from 'graphql/documents/fragments/fields'

export const PART_Repository = gql`
  ${fields.FRAG_Repository_Fields}
  ${fields.FRAG_Repository_DefaultBranchRef}

  fragment PART_Repository on Repository {
    ...FRAG_Repository_Fields
    ...FRAG_Repository_DefaultBranchRef
  }
`

export const PART_Repository_With_Issues = gql`
  ${fields.FRAG_Repository_Fields}
  ${fields.FRAG_Repository_Issues}
  ${fields.FRAG_Repository_DefaultBranchRef}

  fragment PART_Repository_With_Issues on Repository {
    ...FRAG_Repository_Fields
    ...FRAG_Repository_Issues
    ...FRAG_Repository_DefaultBranchRef
  }
`
