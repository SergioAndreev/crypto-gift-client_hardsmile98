import GiftIcon from '@/assets/images/gift.svg?react';
import GiftCard from './GiftCard';
import { useTranslation } from 'react-i18next';
import { useGetGiftsQuery } from '@/services';
import { ErrorPage } from '@/components';
import Skeleton from './Skeleton';

function Store() {
  const { t } = useTranslation();

  const { data, isLoading, isError, error } = useGetGiftsQuery(undefined);

  const gifts = data?.data;

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className='p-4'>
      <div className='my-6 text-center'>
        <GiftIcon className='mb-4 inline text-primary-light' />

        <h1 className='mb-2 text-xl font-semibold'>{t('store.title')}</h1>

        <p className='text-label-secondary-light dark:text-label-secondary-dark'>
          {t('store.description')}
        </p>
      </div>

      <div className='grid grid-cols-2 gap-3 py-2'>
        {isLoading ? (
          <Skeleton />
        ) : gifts?.length ? (
          gifts.map((gift) => <GiftCard key={gift._id} gift={gift} />)
        ) : (
          t('store.empty_gifts')
        )}
      </div>
    </div>
  );
}

export default Store;
