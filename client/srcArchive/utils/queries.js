import { gql } from 'apollo-server-express';

export const QUERY_ME = gql`
{
    me {
      _id
      username
      email
      address 
    }
  }
  `;