import { gql } from '@apollo/client'

export const FRAG_User_Fields = gql`
  fragment FRAG_User_Fields on User {
    id
    login
    avatarUrl
    name
    location
    twitterUsername
  }
`

export const FRAG_Org_Fields = gql`
  fragment FRAG_Org_Fields on Organization {
    id
    login
    avatarUrl
    name
    location
    twitterUsername
  }
`

export const FRAG_Issue_Fields = gql`
  fragment FRAG_Issue_Fields on Issue {
    id
    title
    bodyText
  }
`

export const FRAG_Issue_Nodes = gql`
  ${FRAG_Issue_Fields}

  fragment FRAG_Issue_Nodes on IssueConnection {
    nodes {
      ...FRAG_Issue_Fields
    }
  }
`

export const FRAG_Repository_Issues = gql`
  ${FRAG_Issue_Nodes}

  fragment FRAG_Repository_Issues on Repository {
    issues(first: $firstIssues, labels: "gitstagram-library-post") {
      totalCount
      ...FRAG_Issue_Nodes
    }
  }
`

export const FRAG_Repository_Fields = gql`
  fragment FRAG_Repository_Fields on Repository {
    id
    nameWithOwner
    description
  }
`

export const FRAG_BranchRef_Target = gql`
  fragment FRAG_BranchRef_Target on Ref {
    target {
      oid
    }
  }
`

export const FRAG_Repository_DefaultBranchRef = gql`
  ${FRAG_BranchRef_Target}

  fragment FRAG_Repository_DefaultBranchRef on Repository {
    defaultBranchRef {
      ...FRAG_BranchRef_Target
    }
  }
`

export const FRAG_Commit_Fields = gql`
  fragment FRAG_Commit_Fields on Commit {
    oid
    message
  }
`
