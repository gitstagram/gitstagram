import { gql } from '@apollo/client'

export const FRAG_User_Fields = gql`
  fragment FRAG_User_Fields on User {
    id
    login
    avatarUrl
    name
    location
    twitterUsername
    bio
    libraryRepoId @client
    currentOid @client
    stargazerCount @client
    issuesTotalCount @client
    followingUsers @client
    followingTags @client
    saved @client
    hasBeen @client
    fullyLoaded @client
  }
`

export const FRAG_Issue_Fields = gql`
  fragment FRAG_Issue_Fields on Issue {
    id
    number
    title
    bodyText
    bodyUrl
    reactions {
      totalCount
    }
    comments {
      totalCount
    }
  }
`

export const FRAG_Issue_Nodes = gql`
  ${FRAG_Issue_Fields}

  fragment FRAG_Issue_Nodes on IssueConnection {
    nodes {
      ...FRAG_Issue_Fields
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
`

export const FRAG_Repository_Issues = gql`
  ${FRAG_Issue_Nodes}

  fragment FRAG_Repository_Issues on Repository {
    issues(
      after: $afterIssueCursor
      first: $firstIssues
      filterBy: {
        labels: "gitstagram-library-post"
        states: $filterIssuesStates
        createdBy: $userLogin
      }
      orderBy: { field: CREATED_AT, direction: DESC }
    ) {
      totalCount
      ...FRAG_Issue_Nodes
    }
  }
`

export const FRAG_Repository_Fields = gql`
  fragment FRAG_Repository_Fields on Repository {
    id
    name
    nameWithOwner
    description
    stargazerCount
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

export const FRAG_Repository_Stargazers = gql`
  ${FRAG_User_Fields}

  fragment FRAG_Repository_Stargazers on Repository {
    stargazers(
      first: $firstStargazers
      after: $afterStargazers
      orderBy: { field: STARRED_AT, direction: DESC }
    ) {
      nodes {
        ...FRAG_User_Fields
      }
      edges {
        cursor
      }
    }
  }
`
