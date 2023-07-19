import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_USER_EVENTS = gql`
  query {
    userCreatedEvents {
      id
      name
      date
      location
    }
  }
`;

function UserEvents() {
  const { loading, error, data } = useQuery(GET_USER_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h2>Your Events</h2>
      {data.userCreatedEvents.map((event) => (
        <div key={event.id} className="card mb-3">
          <div className="card-body">
            <h3 className="card-title">{event.name}</h3>
            <p className="card-text">Date: {event.date}</p>
            <p className="card-text">Location: {event.location}</p>
            <Link to={`/events/${event.id}`} className="btn btn-primary">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserEvents;
