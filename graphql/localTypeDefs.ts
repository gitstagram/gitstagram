import { gql } from '@apollo/client'

export const localTypeDefs = gql`
  enum UserHasBeen {
    UNTOUCHED
    FOLLOWED
    UNFOLLOWED
  }

  type User {
    currentOid: String
    stargazerCount: Int
    issuesTotalCount: Int
    followingUsers: [String!]
    followingTags: [String!]
    saved: [String!]
    hasBeen: UserHasBeen
  }

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
    hasBeen: UserHasBeen!
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
