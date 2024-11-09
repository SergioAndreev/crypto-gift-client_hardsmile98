import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import { getLS } from './helpers';
import { envs } from './constants';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: getLS('language') || 'ru',
    fallbackLng: 'ru',
    debug: envs.isDev,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
