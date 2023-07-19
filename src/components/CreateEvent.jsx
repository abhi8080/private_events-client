import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import { GET_EVENTS } from '../queries/eventQueries';

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

function CreateEvent() {
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
          <div>Add Event</div>
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
                Add Event
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
                    Name
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
                    Date
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
                    Location
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
                  Create
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
