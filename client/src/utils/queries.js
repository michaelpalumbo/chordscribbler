import { gql } from '@apollo/client';

export const QUERY_GET_USERNAME_FROM_EMAIL = gql`
  query GetUsernameFromEmail($email: String!) {
    getUsernameFromEmail(email: $email) {
      email
      username
    }
  }
`;



export const QUERY_FIRST_CHORD = gql`
  query firstChord($chord: String!) {
    chordTwoList(chord: $chord) 
  } 
`;

export const QUERY_PAIR_SCRIBBLE = gql`
  query GetChordPairScribble($username: String!, $scribbleBox: Int!, $chord1: String!, $chord2: String!) {
    getChordPairScribble(username: $username, scribbleBox: $scribbleBox, chord1: $chord1, chord2: $chord2) {
      scribbleBox
      username
      chord1
      chord2
      scribbleText
    }
  }
`;

export const QUERY_SCRIBBLE = gql`
  query Query($username: String!, $scribbleBox: Int!, $chordName: String!) {
    getChordScribble(username: $username, scribbleBox: $scribbleBox, chordName: $chordName) {
      _id
      username
      scribbleText
      scribbleBox
      chordName
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;
