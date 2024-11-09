import { GetGiftHistoryResponse } from '@/services';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type ActionTextProps = {
  action: GetGiftHistoryResponse['data'][number];
};

function ActionText({ action }: ActionTextProps) {
  const { t } = useTranslation();

  if (action.action === 'send') {
    return (
      <>
        <div className='text-label-secondary-light dark:text-label-secondary-dark text-sm'>
          {t('action.send.title')}
        </div>

        <div className='font-medium'>
          <Link
            className='text-primary-light dark:text-primary-dark'
            to={`/leaderboard/${action.user._id}`}
          >
            {action.user.firstName}
          </Link>
          {` ${t('action.send.description')} `}
          <Link
            className='text-primary-light dark:text-primary-dark'
            to={`/leaderboard/${action.recipient?._id}`}
          >
            {action.recipient?.firstName}
          </Link>
        </div>
      </>
    );
  }

  if (action.action === 'purchase') {
    return (
      <>
        <div className='text-label-secondary-light dark:text-label-secondary-dark text-sm'>
          {t('action.purchase.title')}
        </div>

        <div className='font-medium'>
          <Link
            className='text-primary-light dark:text-primary-dark'
            to={`/leaderboard/${action.user._id}`}
          >
            {action.user.firstName}
          </Link>
          {` ${t('action.purchase.description')}`}
        </div>
      </>
    );
  }
}

export default ActionText;
