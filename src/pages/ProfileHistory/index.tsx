import { useBackButton } from '@/hooks';
import Empty from './Empty';
import ActionItem from './ActionItem';
import { useGetUserHistoryQuery } from '@/services';
import { ErrorPage } from '@/components';
import { useTranslation } from 'react-i18next';
import Skeleton from './Skeleton';

function ProfileHistory() {
  useBackButton();

  const { i18n, t } = useTranslation();

  const language = i18n.language;

  const { data, isLoading, isError, error } = useGetUserHistoryQuery(undefined);

  const history = data?.data;

  const isEmpty = history?.length === 0;

  if (isEmpty) {
    return <Empty />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className='p-4'>
      <div className='my-6 text-center'>
        <h1 className='mb-2 text-xl font-semibold'>{t('history.title')}</h1>

        <p className='text-label-secondary-light dark:text-label-secondary-dark'>
          {t('history.description')}
        </p>
      </div>

      <div>
        {isLoading ? (
          <Skeleton />
        ) : (
          history?.map((groupDate) => (
            <div key={groupDate._id}>
              <p className='text-label-date-light dark:text-label-date-dark uppercase mb-3 mt-6'>
                {new Date(groupDate.date).toLocaleDateString(language, {
                  day: 'numeric',
                  month: 'long',
                })}
              </p>

              <div>
                {groupDate.actions?.map((action, index) => (
                  <ActionItem action={action} isLast={index === groupDate.actions.length - 1} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProfileHistory;
