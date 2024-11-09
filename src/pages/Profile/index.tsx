import { Link, useParams } from 'react-router-dom';
import PremiumIcon from '@/assets/images/premium.svg?react';
import TimeIcon from '@/assets/images/time.svg?react';
import { Avatar, ErrorPage, GiftImage, GiftsPlaceholder } from '@/components';
import Settings from './Settings';
import OrderDetailModal from './OrderDetailModal';
import { useState } from 'react';
import { useGetOrdersReceivedQuery, useGetProfileQuery } from '@/services';
import Skeleton from './Skeleton';
import { useTranslation } from 'react-i18next';

function Profile() {
  const [actionIdSelected, setActionIdSelected] = useState<null | string>(null);
  const [isDetailModalOpened, setDetailModalOpened] = useState(false);

  const { id } = useParams();

  const { t } = useTranslation();

  const {
    data: userData,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useGetProfileQuery({ id });

  const data = userData?.data;
  const isMyProfile = data?.isMyProfile;
  const position = data?.position;
  const user = data?.user;

  const userId = id ?? user?._id;

  const {
    data: ordersReceivedData,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    error: ordersError,
  } = useGetOrdersReceivedQuery({ id: userId ?? '' }, { skip: !userId });

  const orders = ordersReceivedData?.data;

  const onActionClick = (id: string) => {
    setActionIdSelected(id);
    setDetailModalOpened(true);
  };

  const isEmpty = false;

  const error = profileError || ordersError;
  const isError = isProfileError || isOrdersError;

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <>
      <div className='px-4 py-2 text-center relative'>
        {isProfileLoading ? (
          <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark animate-pulse h-[180px] rounded-md'></div>
        ) : (
          <div>
            {isMyProfile && <Settings />}

            <div className='relative text-center mb-4'>
              <Avatar
                src={user?.avatar}
                alt={user?.firstName}
                className='w-20 h-20 inline-block rounded-full object-cover'
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
        {isOrdersLoading ? (
          <Skeleton />
        ) : isEmpty ? (
          <GiftsPlaceholder text='You can buy a gift to receive a gift in return.' />
        ) : (
          <div className='grid grid-cols-3 gap-2'>
            {orders?.map((order) => (
              <div
                key={order._id}
                onClick={() => onActionClick(order._id)}
                className='cursor-pointer flex flex-col justify-between bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl p-3'
              >
                <div>
                  <div className='flex items-center justify-between flex-wrap gap-1'>
                    <Avatar
                      alt={order.userId.firstName}
                      src={order.userId.avatar}
                      size='sm'
                      className='w-[16px] h-[16px] rounded-full object-cover'
                    />

                    <p className='text-sm text-label-date-light dark:text-label-date-dark'>
                      1 of {order.giftId.maxAvailable}
                    </p>
                  </div>

                  <div className='aspect-square'>
                    <GiftImage
                      width={'100%'}
                      height={'100%'}
                      slug={order.giftId.slug}
                      autoPlay={false}
                      loop={false}
                    />
                  </div>
                </div>

                <h3 className='text-center text-sm font-medium'>{order.giftId.name}</h3>
              </div>
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
