import { gql } from '@apollo/client'

export const FRAG_User_Fields = gql`
  fragment FRAG_User_Fields on User {
    id
    login
    bio
    twitterUsername
    avatarUrl
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
    issues(first: $firstIssues) {
      ...FRAG_Issue_Nodes
    }
  }
`

export const FRAG_Repository_Fields = gql`
  fragment FRAG_Repository_Fields on Repository {
    id
  }
`
