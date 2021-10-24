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

  type UserInfo {
    login: String!
    avatarUrl: String
    name: String
    location: String
    twitterUsername: String
    bio: String
    stargazerCount: Int!
    issuesTotalCount: Int!
    following: [String!]!
  }

  type RestLibraryData {
    content: String!
    sha: String!
  }

  extend type Query {
    viewerInfo: ViewerInfo
    userInfo(login: String!): UserInfo
    libraryData(userLogin: String!): RestLibraryData
  }
`
