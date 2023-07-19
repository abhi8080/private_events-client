import { useMutation } from '@apollo/client';
import { UPDATE_EVENT_ATTENDANCE } from '../mutations/eventMutations';
import { GET_EVENT_DETAILS } from '../queries/eventQueries';
import { GET_USER } from '../queries/userQueries';

function UpdateAttendanceStatus({ eventId, isAttendee }) {
  const [updateEventAttendance] = useMutation(UPDATE_EVENT_ATTENDANCE, {
    refetchQueries: [
      { query: GET_EVENT_DETAILS, variables: { eventId } },
      { query: GET_USER },
    ],
  });

  return (
    <>
      {isAttendee ? (
        <button
          onClick={() => {
            updateEventAttendance({
              variables: { eventId, status: 'UNATTEND' },
            });
          }}
          className="btn btn-danger"
        >
          Unattend
        </button>
      ) : (
        <div
          onClick={() => {
            updateEventAttendance({ variables: { eventId, status: 'ATTEND' } });
          }}
          className="btn btn-success"
        >
          Attend
        </div>
      )}
    </>
  );
}

export default UpdateAttendanceStatus;
