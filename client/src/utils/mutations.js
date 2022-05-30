import { gql } from 'apollo-server-express';

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
mutation createUser($username: String!, $email: String!, $address: String!, $password: String!) {
    addUser(username: $username, email: $email, address: $address, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`