import { gql } from '@apollo/client';

// Gets query for username from email
export const QUERY_GET_USERNAME_FROM_EMAIL = gql`
  query GetUsernameFromEmail($email: String!) {
    getUsernameFromEmail(email: $email) {
      email
      username
    }
  }
`;



// gets query for Chord Pair Scribble
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
// Gets query for Query Scribble
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



// gets query for history panel
export const QUERY_HISTORY = gql`
query GetHistory($username: String!) {
  getHistory(username: $username) {
    _id
    username
    historyItem
  }
}
`;

// gets query for first Chord
export const QUERY_FIRST_CHORD = gql`
  query firstChord($chord: String!) {
    chordTwoList(chord: $chord) 
  } 
`;
