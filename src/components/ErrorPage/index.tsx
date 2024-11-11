import { isErrorWithMessage } from '@/services';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function ErrorPage({ error }: { error: unknown }) {
  const { t } = useTranslation();

  const errorMessage = (isErrorWithMessage(error) && error.data.message) || t('error.unknow_error');

  return (
    <div className='p-4 text-black dark:text-white bg-bg-primary-light dark:bg-bg-primary-dark h-[100%] flex flex-col items-center justify-center'>
      <h1 className='mb-2 font-semibold text-xl'>{t('error.title')}</h1>

      <p className='text-label-secondary-light dark:text-label-secondary-dark mb-2'>
        {errorMessage}
      </p>

      <Link className='text-primary-light dark:text-primary-dark' to='/'>
        ‹ {t('common.go_to_main')}
      </Link>
    </div>
  );
}

export default ErrorPage;
