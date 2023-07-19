import { useQuery, gql } from '@apollo/client';

const GET_USER_PROFILE = gql`
  query {
    userProfile {
      id
      username
      attendedEvents {
        id
        name
        date
        location
      }
    }
  }
`;

function UserAttendedEvents() {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const user = data.userProfile;

  return (
    <div>
      <h4>Attended Events:</h4>
      {user.attendedEvents.length > 0 ? (
        <ul>
          {user.attendedEvents.map((event) => (
            <li key={event.id}>{event.name}</li>
          ))}
        </ul>
      ) : (
        <p>No attended events.</p>
      )}
    </div>
  );
}

export default UserAttendedEvents;
