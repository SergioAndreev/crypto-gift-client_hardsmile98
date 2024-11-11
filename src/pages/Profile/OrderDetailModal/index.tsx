import { Avatar, CurrencyIcon, GiftImage, Modal } from '@/components';
import { useTelegram } from '@/hooks';
import { GetOrdersReceivedResponse } from '@/services';
import { LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type OrderDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  orderSelected: GetOrdersReceivedResponse['data'][number] | undefined;
};

function OrderDetailModal({ isOpen, onClose, orderSelected }: OrderDetailModalProps) {
  const { tg } = useTelegram();

  const { t } = useTranslation();

  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    if (isOpen) {
      lottieRef.current?.goToAndStop?.(0, true);

      lottieRef.current?.play?.();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    tg.MainButton.text = t('profile.close');
    tg.MainButton.show();
    tg.MainButton.onClick(onClose);

    return () => {
      tg.MainButton.hide();
      tg.MainButton.offClick(onClose);
    };
  }, [t, onClose, isOpen, tg]);

  const gift = orderSelected?.giftId;
  const from = orderSelected?.userId;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className='text-center'>
          <div className='inline-block w-[150px] h-[150px]'>
            {gift?.slug && (
              <GiftImage lottieRef={lottieRef} slug={gift?.slug} loop={false} autoPlay={false} />
            )}
          </div>

          <h3 className='mt-3 mb-6 font-semibold text-xl'>{t(`gift.${gift?.name}`)}</h3>
        </div>

        <div className='bg-bg-primary-light dark:bg-bg-secondary-dark rounded-xl mx-4 my-6 divide-y-[0.5px] divide-separator-light dark:divide-white/20'>
          <div className='flex justify-between divide-x-[0.5px] divide-separator-light dark:divide-white/20'>
            <span className='p-4 w-[110px] text-label-secondary-light dark:text-label-secondary-dark'>
              {t('profile.from')}
            </span>
            <span className='p-4 grow text-label-primary-light dark:text-label-primary-dark flex items-center gap-2'>
              <Avatar
                src={from?.avatar}
                size='sm'
                className='bg-bg-secondary-light dark:bg-bg-primary-dark w-[20px] h-[20px] rounded-full object-cover'
                alt={from?.firstName}
              />

              <Link
                className='text-primary-light dark:text-primary-dark'
                to={`/leaderboard/${from?._id}`}
                onClick={onClose}
              >
                {from?.firstName}
              </Link>
            </span>
          </div>

          <div className='flex justify-between divide-x-[0.5px] divide-separator-light dark:divide-white/20'>
            <span className='p-4 w-[110px] text-label-secondary-light dark:text-label-secondary-dark'>
              {t('profile.date')}
            </span>
            <span className='p-4 grow text-label-primary-light dark:text-label-primary-dark'>
              {orderSelected?.sendDate && new Date(orderSelected.sendDate).toLocaleString()}
            </span>
          </div>

          <div className='flex justify-between divide-x-[0.5px] divide-separator-light dark:divide-white/20'>
            <span className='p-4 w-[110px] text-label-secondary-light dark:text-label-secondary-dark'>
              {t('profile.price')}
            </span>
            <span className='p-4 grow text-label-primary-light dark:text-label-primary-dark flex items-center gap-2'>
              <CurrencyIcon withBackground currency={gift?.currency} />
              {`${gift?.price} ${gift?.currency}`}
            </span>
          </div>

          <div className='flex justify-between divide-x-[0.5px] divide-separator-light dark:divide-white/20'>
            <span className='p-4 w-[110px] text-label-secondary-light dark:text-label-secondary-dark'>
              {t('profile.availability')}
            </span>
            <span className='p-4 grow text-label-primary-light dark:text-label-primary-dark'>
              {gift?.available} {t('common.of')} {gift?.maxAvailable}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default OrderDetailModal;
