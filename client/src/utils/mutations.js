import { gql } from '@apollo/client';
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const MUTATION_CHORD_SCRIBBLE = gql`
  mutation ChordScribble($username: String!, $scribbleText: String!, $scribbleBox: Int!, $chordName: String!) 
  {
    chordScribble(username: $username, scribbleText: $scribbleText, scribbleBox: $scribbleBox, chordName: $chordName) {
      _id
      username
      scribbleText
      scribbleBox
      chordName
    }
  }
`;

export const MUTATION_CHORD_PAIR_SCRIBBLE = gql`
  mutation ChordPairScribble($username: String!, $scribbleText: String!, $scribbleBox: Int!, $chord1: String!, $chord2: String!) {
    chordPairScribble(username: $username, scribbleText: $scribbleText, scribbleBox: $scribbleBox, chord1: $chord1, chord2: $chord2) {
      username
      scribbleText
      scribbleBox
      chord1
      chord2
    }
  }
`


export const UPDATE_HISTORY = gql`
mutation UpdateHistory($username: String!, $historyItem: String!) {
  updateHistory(username: $username, historyItem: $historyItem) {
    username
    historyItem
  }
}
`;
