import { gql } from '@apollo/client'

export const localTypeDefs = gql`
  type ViewerInfo {
    login: String!
    avatarUrl: String
    name: String
    location: String
    twitterUsername: String
    bio: String
    currentOid: String!
    stargazerCount: Int!
    issuesTotalCount: Int!
    following: [String!]!
    followingTags: [String!]!
    saved: [String!]!
  }

  type RestLibraryData {
    contents: String!
  }

  extend type Query {
    viewerInfo: ViewerInfo
    getLibraryData: RestLibraryData
  }
`
