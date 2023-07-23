import { useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { GET_USER } from '../queries/userQueries';

function Profile() {
  document.title = 'Profile | Private Events';
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const user = data.user;

  const pastEvents = user.attendedEvents.filter(
    (event) => new Date(event.date) < new Date()
  );
  const futureEvents = user.attendedEvents.filter(
    (event) => new Date(event.date) >= new Date()
  );

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn btn-primary mt-3">
        Back
      </button>
      <h1>User: {user.username}</h1>

      <h2>Your Events</h2>
      {user.createdEvents.length > 0 ? (
        <div>
          {user.createdEvents.map((event) => (
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
      ) : (
        <p>No created events</p>
      )}

      <h2>Past Attended Events:</h2>
      {pastEvents.length > 0 ? (
        <div>
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
        </div>
      ) : (
        <p>No past attended events</p>
      )}

      <h2>Future Attended Events:</h2>
      {futureEvents.length > 0 ? (
        <div>
          {futureEvents.map((event) => (
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
        </div>
      ) : (
        <p>No future attended events</p>
      )}
    </div>
  );
}

export default Profile;
