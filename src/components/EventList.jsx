import { useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import CreateEvent from './CreateEvent';
import { GET_EVENTS } from '../queries/eventQueries';
import { useTranslation } from 'react-i18next';

function EventList() {
  document.title = 'Home | Private Events';
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>{t('Loading')}</p>;
  if (error) {
    if (error.message === 'No token' || error.message === 'Bad token')
      navigate('/login');
    else return <p>Error</p>;
  }

  const currentDate = new Date();
  const pastEvents = data.events.filter(
    (event) => new Date(event.date) < currentDate,
  );
  const upcomingEvents = data.events.filter(
    (event) => new Date(event.date) >= currentDate,
  );

  return (
    <div>
      <h2>{t('EventList.EventList')}</h2>
      <CreateEvent />
      {upcomingEvents.length > 0 && (
        <>
          <h3>{t('EventList.UpcomingEvents')}</h3>
          {upcomingEvents.map((event) => (
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
        </>
      )}
      {pastEvents.length > 0 && (
        <>
          <h3>{t('EventList.PastEvents')}</h3>
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
        </>
      )}
    </div>
  );
}

export default EventList;
