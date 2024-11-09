import MoonIcon from '@/assets/images/moon.svg?react';
import SunIcon from '@/assets/images/sun.svg?react';
import { setLS } from '@/helpers';
import { useTelegram } from '@/hooks';
import { useDispatch, useSelector } from '@/store';
import { setTheme } from '@/store/slices/user';
import { useTranslation } from 'react-i18next';

const LANGUAGE_LS_KEY = 'language';

function Settings() {
  const dispatch = useDispatch();

  const { tg } = useTelegram();

  const theme = useSelector((state) => state.user.theme);

  const changeTheme = (newTheme: string) => {
    tg.HapticFeedback.impactOccurred('light');

    dispatch(setTheme(newTheme));
  };

  const { i18n } = useTranslation();

  const lang = i18n.language;

  const changeLanguage = (newLanguage: string) => {
    tg.HapticFeedback.impactOccurred('light');

    i18n.changeLanguage(newLanguage);

    setLS(LANGUAGE_LS_KEY, newLanguage);
  };

  return (
    <div className='left-4 top-2 right-4 absolute z-10 flex items-center justify-between'>
      <div className='bg-bg-secondary-light dark:bg-black rounded-full flex items-center p-1'>
        <button
          disabled={theme === 'light'}
          onClick={() => changeTheme('light')}
          className={`p-2 rounded-full cursor-pointer transition-colors ${theme === 'light' ? 'text-black dark:text-white bg-white dark:bg-bg-secondary-dark shadow-sm' : 'text-label-secondary-light dark:text-label-secondary-dark'}`}
        >
          <SunIcon className='w-5 h-5' />
        </button>

        <button
          disabled={theme === 'dark'}
          onClick={() => changeTheme('dark')}
          className={`p-2 rounded-full cursor-pointer transition-colors ${theme === 'dark' ? 'text-black dark:text-white bg-white dark:bg-bg-secondary-dark shadow-sm' : 'text-label-secondary-light dark:text-label-secondary-dark'}`}
        >
          <MoonIcon className='w-5 h-5' />
        </button>
      </div>

      <div className='bg-bg-secondary-light dark:bg-black rounded-full flex items-center p-1'>
        <button
          disabled={lang === 'en'}
          onClick={() => changeLanguage('en')}
          className={`p-2 rounded-full cursor-pointer transition-colors ${lang === 'en' ? 'text-black dark:text-white bg-white dark:bg-bg-secondary-dark shadow-sm' : 'text-label-secondary-light dark:text-label-secondary-dark'}`}
        >
          <span className='flex items-center justify-center font-semibold w-5 h-5'>EN</span>
        </button>

        <button
          disabled={lang === 'ru'}
          onClick={() => changeLanguage('ru')}
          className={`p-2 rounded-full cursor-pointer transition-colors ${lang === 'ru' ? 'text-black dark:text-white bg-white dark:bg-bg-secondary-dark shadow-sm' : 'text-label-secondary-light dark:text-label-secondary-dark'}`}
        >
          <span className='flex items-center justify-center font-semibold w-5 h-5'>RU</span>
        </button>
      </div>
    </div>
  );
}

export default Settings;
