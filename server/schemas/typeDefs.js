// import the gql tagged template function
const { gql } = require('apollo-server-express');


// create our typeDefs
const typeDefs = gql`
  type ChordScribble{
    _id: ID
    username: String
    scribbleText: String
    scribbleBox: Int
    chordName: String
  }

  type ChordPairScribble{
    _id: ID
    username: String
    scribbleText: String
    scribbleBox: Int
    chord1: String
    chord2: String
  }

  type History{
    _id: ID
    username: String
    scribbleText: String
    scribbleBox: Int
    chordName: String,
    timeStamp: String
  }

  type User {
    _id: ID
    username: String
    email: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    chordTwoList(chord: String!): String
    getChordScribble(username: String!,scribbleBox: Int!,chordName: String!): ChordScribble
    getHistory(username: String!): [History]
    getChordPairScribble(username: String!,scribbleBox: Int!, chord1: String!, chord2: String!): ChordPairScribble
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    chordScribble(username: String!, scribbleText: String!,scribbleBox: Int!, chordName: String!): ChordScribble
    updateHistory(username: String!, scribbleText: String!,scribbleBox: Int!, chordName: String!, timeStamp: String): History
    chordPairScribble(username: String!, scribbleText: String!,scribbleBox: Int!,chord1: String!, chord2: String!): ChordPairScribble
  }
  type Auth {
    token: ID!
    user: User
  }


`;

// export the typeDefs
module.exports = typeDefs;



