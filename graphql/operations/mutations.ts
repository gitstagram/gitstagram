import { gql } from '@apollo/client'
import * as fields from 'graphql/operations/fragments/fields'
import * as parts from 'graphql/operations/fragments/parts'

/*
 * gitstagram/gitstagram-library-template: R_kgDOGMruMg
 */
export const CLONE_GITSTAGRAM_LIBRARY = gql`
  ${parts.PART_Repository}

  mutation CloneGitstagramLibrary($ownerId: ID!, $description: String = "") {
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
        ...PART_Repository
      }
    }
  }
`

export const UPDATE_REPOSITORY = gql`
  ${parts.PART_Repository}

  mutation UpdateRepository($repositoryId: ID!, $description: String!) {
    updateRepository(
      input: { repositoryId: $repositoryId, description: $description }
    ) {
      repository {
        ...PART_Repository
      }
    }
  }
`

export const CREATE_COMMIT = gql`
  ${fields.FRAG_Commit_Fields}

  mutation CreateCommit(
    $repoWithLogin: String!
    $headOid: GitObjectID!
    $b64Contents: Base64String!
    $commitMessage: String!
    $path: String!
  ) {
    createCommitOnBranch(
      input: {
        branch: { repositoryNameWithOwner: $repoWithLogin, branchName: "main" }
        expectedHeadOid: $headOid
        fileChanges: { additions: { contents: $b64Contents, path: $path } }
        message: { headline: $commitMessage }
      }
    ) {
      commit {
        ...FRAG_Commit_Fields
      }
    }
  }
`
