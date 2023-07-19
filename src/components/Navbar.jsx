import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg bg-primary d-flex justify-content-end"
      data-bs-theme="dark"
    >
      <div className="d-flex justify-content-around container">
        <Link to="/profile" className="btn btn-primary">
          Profile
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem('ACCESS_TOKEN');
            window.location.reload();
          }}
          className="btn btn-danger"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
