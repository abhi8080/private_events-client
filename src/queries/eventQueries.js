import { gql } from '@apollo/client';

const GET_EVENTS = gql`
  query {
    events {
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
`;

const GET_EVENT_DETAILS = gql`
  query ($eventId: ID!) {
    event(id: $eventId) {
      id
      name
      date
      location
      creator {
        id
        username
      }
      attendees {
        id
        username
      }
    }
  }
`;
export { GET_EVENTS, GET_EVENT_DETAILS };
