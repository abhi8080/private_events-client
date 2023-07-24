import { gql } from '@apollo/client';

const CREATE_EVENT = gql`
  mutation CreateEvent($name: String!, $date: String!, $location: String!) {
    createEvent(name: $name, date: $date, location: $location) {
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

const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $updateEventId: ID!
    $name: String!
    $date: String!
    $location: String!
  ) {
    updateEvent(
      id: $updateEventId
      name: $name
      date: $date
      location: $location
    ) {
      id
    }
  }
`;

const UPDATE_EVENT_ATTENDANCE = gql`
  mutation UpdateEventAttendance($eventId: ID!, $status: String!) {
    updateEventAttendance(eventId: $eventId, status: $status) {
      id
    }
  }
`;

const DELETE_EVENT = gql`
  mutation DeleteEvent($deleteEventId: ID!) {
    deleteEvent(id: $deleteEventId) {
      id
    }
  }
`;

export { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, UPDATE_EVENT_ATTENDANCE };
