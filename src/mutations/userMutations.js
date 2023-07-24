import { gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    registerUser(username: $username, password: $password)
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password)
  }
`;

export { LOGIN_USER, CREATE_USER };
