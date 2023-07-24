/**
 * Component used to control the current display language.
 */

import { useTranslation } from 'react-i18next';
const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const languages = {
    en: { name: 'English' },
    sv: { name: 'Svenska' },
  };

  return (
    <div className="d-flex align-items-center">
      <div className="picker-label"> {t('Navbar.ChooseLanguage')}</div>
      <select
        className="form-select ms-2"
        onChange={(event) => i18n.changeLanguage(event.target.value)}
      >
        {Object.keys(languages).map((language) => (
          <option key={language} value={language}>
            {languages[language].name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitch;
