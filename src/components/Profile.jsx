import { useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { GET_USER } from '../queries/userQueries';
import { useTranslation } from 'react-i18next';

function Profile() {
  document.title = 'Profile | Private Events';
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <p>{t('Loading')}</p>;
  if (error) return <p>Error</p>;
  const user = data.user;

  const pastEvents = user.attendedEvents.filter(
    (event) => new Date(event.date) < new Date(),
  );
  const futureEvents = user.attendedEvents.filter(
    (event) => new Date(event.date) >= new Date(),
  );

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn btn-primary mt-3">
        {t('Back')}
      </button>
      <h1>
        {t('Profile.User')}: {user.username}
      </h1>

      <h2>{t('Profile.YourEvents')}</h2>
      {user.createdEvents.length > 0 ? (
        <div>
          {user.createdEvents.map((event) => (
            <div key={event.id} className="card mb-3">
              <div className="card-body">
                <h3 className="card-title">{event.name}</h3>
                <p className="card-text">
                  {t('EventDetails.Date')}: {event.date}
                </p>
                <p className="card-text">
                  {t('EventDetails.Location')}: {event.location}
                </p>
                <Link to={`/events/${event.id}`} className="btn btn-primary">
                  {t('EventDetails.ViewDetails')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p> {t('Profile.NoCreatedEvents')}</p>
      )}

      <h2> {t('Profile.PastAttendedEvents')}:</h2>
      {pastEvents.length > 0 ? (
        <div>
          {pastEvents.map((event) => (
            <div key={event.id} className="card mb-3">
              <div className="card-body">
                <h3 className="card-title">{event.name}</h3>
                <p className="card-text">
                  {t('EventDetails.Date')}: {event.date}
                </p>
                <p className="card-text">
                  {t('EventDetails.Location')}: {event.location}
                </p>
                <p className="card-text">
                  {t('EventDetails.Creator')}: {event.creator.username}
                </p>
                <Link to={`/events/${event.id}`} className="btn btn-primary">
                  {t('EventDetails.ViewDetails')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p> {t('Profile.NoPastAttendedEvents')}</p>
      )}

      <h2>{t('Profile.FutureAttendedEvents')}:</h2>
      {futureEvents.length > 0 ? (
        <div>
          {futureEvents.map((event) => (
            <div key={event.id} className="card mb-3">
              <div className="card-body">
                <h3 className="card-title">{event.name}</h3>
                <p className="card-text">
                  {t('EventDetails.Date')}: {event.date}
                </p>
                <p className="card-text">
                  {t('EventDetails.Location')}: {event.location}
                </p>
                <p className="card-text">
                  {t('EventDetails.Creator')}: {event.creator.username}
                </p>
                <Link to={`/events/${event.id}`} className="btn btn-primary">
                  {t('EventDetails.ViewDetails')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>{t('Profile.NoFutureAttendedEvents')}</p>
      )}
    </div>
  );
}

export default Profile;
