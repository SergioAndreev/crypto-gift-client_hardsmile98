import { Link, useLocation, useParams } from 'react-router-dom';
import PremiumIcon from '@/assets/images/premium.svg?react';
import TimeIcon from '@/assets/images/time.svg?react';
import { Avatar, ErrorPage, EmptyPlaceholder } from '@/components';
import Settings from './Settings';
import OrderDetailModal from './OrderDetailModal';
import { useState } from 'react';
import { useGetOrdersReceivedQuery, useGetProfileQuery } from '@/services';
import Skeleton from './Skeleton';
import { useTranslation } from 'react-i18next';
import { useBackButton } from '@/hooks';
import GiftReceived from './GiftReceived';

function Profile() {
  const { pathname } = useLocation();

  const isProfilePath = pathname === '/profile';

  useBackButton({ skip: isProfilePath });

  const [actionIdSelected, setActionIdSelected] = useState<null | string>(null);
  const [isDetailModalOpened, setDetailModalOpened] = useState(false);

  const { id: userId } = useParams();

  const { t } = useTranslation();

  const {
    data: userData,
    isLoading: isProfileLoading,
    isError: isProfileError,
    isFetching: isProfielFetching,
    error: profileError,
  } = useGetProfileQuery({ userId });

  const data = userData?.data;
  const isMyProfile = data?.isMyProfile;
  const position = data?.position;
  const user = data?.user;

  const {
    data: ordersReceivedData,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    isFetching: isOrdersFetching,
    error: ordersError,
  } = useGetOrdersReceivedQuery({ userId });

  const orders = ordersReceivedData?.data;

  const onGiftClick = (id: string) => {
    setActionIdSelected(id);
    setDetailModalOpened(true);
  };

  const isEmpty = orders?.length === 0;

  const error = profileError || ordersError;
  const isError = isProfileError || isOrdersError;

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <>
      <div className='px-4 py-2 text-center relative'>
        {isProfileLoading || isProfielFetching ? (
          <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark animate-pulse h-[160px] rounded-md'></div>
        ) : (
          <div>
            {isMyProfile && <Settings />}

            <div className='relative text-center mb-4'>
              <Avatar
                src={user?.avatar}
                alt={user?.firstName}
                className='bg-bg-secondary-light dark:bg-bg-secondary-dark w-20 h-20 inline-block rounded-full object-cover'
              />

              <div
                className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-label-secondary-light dark:bg-label-secondary-dark rounded-full px-3 py-0.5 ring-2 ring-bg-primary-light dark:ring-bg-primary-dark ${position === 1 ? 'bg-accent-gold-light' : ''}`}
              >
                <span className='text-sm text-white font-medium'>#{position}</span>
              </div>
            </div>

            <p className='inline-flex items-center gap-1 mb-1'>
              <span className='font-semibold text-xl'>{user?.firstName}</span>
              {user?.isPremium && <PremiumIcon className='inline-block' />}
            </p>

            <p className='text-label-secondary-light dark:text-label-secondary-dark'>
              {t('profile.gift', { count: user?.giftsReceived })}
            </p>

            {isMyProfile && (
              <Link
                className='inline-flex items-center gap-1 mt-6 font-medium text-primary-light dark:text-primary-dark'
                to='/profile/history'
              >
                <TimeIcon className='inline-block' />
                {t('profile.history')} ›
              </Link>
            )}
          </div>
        )}
      </div>

      <div className='p-4'>
        {isOrdersLoading || isOrdersFetching ? (
          <Skeleton />
        ) : isEmpty ? (
          <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-[12px]'>
            <EmptyPlaceholder description={t('profile.empty')} isLinkVisivle={isProfilePath} />
          </div>
        ) : (
          <div className='grid grid-cols-3 gap-2'>
            {orders?.map((order) => (
              <GiftReceived key={order._id} onGiftClick={onGiftClick} order={order} />
            ))}
          </div>
        )}
      </div>

      <OrderDetailModal
        orderSelected={orders?.find((order) => order._id === actionIdSelected)}
        isOpen={isDetailModalOpened}
        onClose={() => setDetailModalOpened(false)}
      />
    </>
  );
}

export default Profile;
