import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    registerUser(username: $username, password: $password)
  }
`;

function CreateAccount() {
  document.title = 'Create Account | Private Events';
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      localStorage.setItem('ACCESS_TOKEN', data.registerUser);
      navigate('/');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({ variables: { username, password } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    if (
      error.message ===
      'duplicerat nyckelvärde bryter mot unik-villkor "Users_username_key"'
    )
      return <p>Username already exists</p>;
    else return <p>{error.message}</p>;
  }

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
          Already have an account?
          <Link to="/login" className="mt-3">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default CreateAccount;
