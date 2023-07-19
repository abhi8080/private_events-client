import { useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import CreateEvent from './CreateEvent';
import { GET_EVENTS } from '../queries/eventQueries';

function EventList() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    if (error.message === 'No token' || error.message === 'Bad token')
      navigate('/login');
    else return <p>Error</p>;
  }

  const currentDate = new Date();
  const pastEvents = data.events.filter(
    (event) => new Date(event.date) < currentDate
  );
  const upcomingEvents = data.events.filter(
    (event) => new Date(event.date) >= currentDate
  );

  return (
    <div>
      <h2>Event List</h2>
      <CreateEvent />
      {upcomingEvents.length > 0 && (
        <>
          <h3>Upcoming Events</h3>
          {upcomingEvents.map((event) => (
            <div key={event.id} className="card mb-3">
              <div className="card-body">
                <h3 className="card-title">{event.name}</h3>
                <p className="card-text">Date: {event.date}</p>
                <p className="card-text">Location: {event.location}</p>
                <p className="card-text">Creator: {event.creator.username}</p>
                <Link to={`/events/${event.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
      {pastEvents.length > 0 && (
        <>
          <h3>Past Events</h3>
          {pastEvents.map((event) => (
            <div key={event.id} className="card mb-3">
              <div className="card-body">
                <h3 className="card-title">{event.name}</h3>
                <p className="card-text">Date: {event.date}</p>
                <p className="card-text">Location: {event.location}</p>
                <p className="card-text">Creator: {event.creator.username}</p>
                <Link to={`/events/${event.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default EventList;
