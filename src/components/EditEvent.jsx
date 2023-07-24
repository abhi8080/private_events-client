import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { FaEdit } from 'react-icons/fa';
import { UPDATE_EVENT } from '../mutations/eventMutations';
import { GET_EVENT_DETAILS } from '../queries/eventQueries';
import { useTranslation } from 'react-i18next';

function EditEvent({ event }) {
  const { t } = useTranslation();
  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(event.date);
  const [location, setLocation] = useState(event.location);

  const [updateEvent] = useMutation(UPDATE_EVENT, {
    variables: { updateEventId: event.id, name, date, location },
    refetchQueries: [
      { query: GET_EVENT_DETAILS, variables: { eventId: event.id } },
    ],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent(name, date, location);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#editEventModal"
      >
        <div className="d-flex align-items-center">
          <FaEdit className="icon" />
          <div> {t('EditEvent.Edit')}</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="editEventModal"
        aria-labelledby="editEventModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editEventModalLabel">
                {t('EditEvent.EditEvent')}
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
                  {t('EditEvent.Submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditEvent;
