import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import { GET_EVENTS } from '../queries/eventQueries';
import { useTranslation } from 'react-i18next';
import { CREATE_EVENT } from '../mutations/eventMutations';

function CreateEvent() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const [createEvent] = useMutation(CREATE_EVENT, {
    variables: { name, date, location },
    update(cache, { data: { createEvent } }) {
      const { events } = cache.readQuery({ query: GET_EVENTS });

      cache.writeQuery({
        query: GET_EVENTS,
        data: { events: [...events, createEvent] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent(name, date, location);

    setName('');
    setDate('');
    setLocation('');
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addEventModal"
      >
        <div className="d-flex align-items-center">
          <BsFillCalendarEventFill className="icon" />
          <div>{t('CreateEvent.AddEvent')}</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addEventModal"
        aria-labelledby="addEventModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addEventModalLabel">
                {t('CreateEvent.AddEvent')}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    {t('CreateEvent.Name')}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    {t('EventDetails.Date')}
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    {t('EventDetails.Location')}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {t('CreateEvent.Create')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateEvent;
