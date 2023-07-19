import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigatem Link } from 'react-router-dom';

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    registerUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

function CreateAccount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      console.log(data);
      navigate('/');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({ variables: { username, password } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
        <p className="text-center my-3">
          Do you not have an account?
          <Link to="/create-account" className="mt-3">
            Create one here.
          </Link>
        </p>
      </form>
    </div>
  );
}

export default CreateAccount;
