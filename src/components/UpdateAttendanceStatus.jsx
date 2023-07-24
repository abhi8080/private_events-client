import { useMutation } from '@apollo/client';
import { UPDATE_EVENT_ATTENDANCE } from '../mutations/eventMutations';
import { GET_EVENT_DETAILS } from '../queries/eventQueries';
import { GET_USER } from '../queries/userQueries';
import { useTranslation } from 'react-i18next';

function UpdateAttendanceStatus({ eventId, isAttendee }) {
  const { t } = useTranslation();
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
          {t('UpdateAttendanceStatus.Unattend')}
        </button>
      ) : (
        <button
          onClick={() => {
            updateEventAttendance({ variables: { eventId, status: 'ATTEND' } });
          }}
          className="btn btn-success"
        >
          {t('UpdateAttendanceStatus.Attend')}
        </button>
      )}
    </>
  );
}

export default UpdateAttendanceStatus;
