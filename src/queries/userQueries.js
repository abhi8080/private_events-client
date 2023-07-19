import { gql } from '@apollo/client';

const GET_USER = gql`
  query {
    user {
      id
      username
      createdEvents {
        id
        name
        date
        location
      }
      attendedEvents {
        id
        name
        date
        location
        creator {
          id
          username
        }
      }
    }
  }
`;

export { GET_USER };
