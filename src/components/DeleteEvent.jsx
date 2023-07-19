import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { GET_EVENTS } from '../queries/eventQueries';
import { DELETE_EVENT } from '../mutations/eventMutations';
export default function DeleteEvent({ eventId }) {
  const navigate = useNavigate();

  const [deleteEvent] = useMutation(DELETE_EVENT, {
    variables: { deleteEventId: eventId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_EVENTS }],
  });

  return (
    <button className="btn btn-danger m-2" onClick={deleteEvent}>
      <FaTrash className="icon" /> Delete Event
    </button>
  );
}
