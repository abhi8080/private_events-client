import { Link } from 'react-router-dom';
import LanguageSwitch from './LanguageSwitch';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t } = useTranslation();
  return (
    <nav
      className="navbar navbar-expand-lg bg-primary d-flex justify-content-end"
      data-bs-theme="dark"
    >
      <LanguageSwitch />
      <div className="d-flex justify-content-around container">
        <Link to="/profile" className="btn btn-primary">
          {t('Navbar.Profile')}
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem('ACCESS_TOKEN');
            window.location.reload();
          }}
          className="btn btn-danger"
        >
          {t('Navbar.LogOut')}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
