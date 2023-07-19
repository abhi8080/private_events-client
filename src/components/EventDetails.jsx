import { useQuery, gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_EVENT_DETAILS } from '../queries/eventQueries';
import EditEvent from './EditEvent';
import DeleteEvent from './DeleteEvent';
import UpdateAttendanceStatus from './UpdateAttendanceStatus';

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

function EventDetails() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT_DETAILS, {
    variables: { eventId },
  });
  const { data: userData, loading: userLoading } = useQuery(GET_USER);

  if (loading || userLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const event = data.event;
  const user = userData.user;

  function isEventAttendee() {
    let isAttendee = false;
    event.attendees.map((attendee) => {
      if (attendee.id === user.id) isAttendee = true;
    });

    return isAttendee;
  }

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn btn-primary mt-3">
        Back
      </button>
      <h2 className="mt-4">Event Details</h2>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{event.name}</h3>
          <p className="card-text">Date: {event.date}</p>
          <p className="card-text">Location: {event.location}</p>
          <p className="card-text">Creator: {event.creator.username}</p>
          <h4 className="card-title">Attendees:</h4>
          <ul className="list-group">
            {event.attendees.map((attendee) => (
              <li className="list-group-item" key={attendee.id}>
                {attendee.username}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-footer">
          {event.creator.id === user.id ? (
            <>
              <EditEvent event={event} /> <DeleteEvent eventId={event.id} />
            </>
          ) : new Date(event.date) > new Date() ? (
            <UpdateAttendanceStatus
              eventId={event.id}
              isAttendee={isEventAttendee()}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
