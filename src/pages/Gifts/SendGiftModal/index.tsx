import { CurrencyIcon, GiftImage, Modal } from '@/components';
import { useTelegram } from '@/hooks';
import { GetMyGiftsResponse } from '@/services';
import { LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type SendGiftModalProps = {
  isOpen: boolean;
  onClose: () => void;
  orderSelected: GetMyGiftsResponse['data'][number] | undefined;
};

function SendGiftModal({ isOpen, onClose, orderSelected }: SendGiftModalProps) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => setIsTransitioning(isOpen), [isOpen]);

  const { tg } = useTelegram();

  const { t } = useTranslation();

  const orderId = orderSelected?._id;

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

    const sendGift = () => tg.switchInlineQuery(`gift_${orderId}`, ['users']);

    tg.MainButton.text = t('sendModal.button');
    tg.MainButton.onClick(sendGift);
    tg.MainButton.show();

    return () => {
      tg.MainButton.offClick(sendGift);
      tg.MainButton.hide();
    };
  }, [tg, orderId, isOpen, t]);

  const gift = orderSelected?.giftId;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className='text-center'>
          <div className='relative inline-block w-[150px] h-[150px]'>
            {gift?.slug && (
              <GiftImage
                className={`absolute top-0 bottom-0 left-0 right-0 transition-transform duration-500 ${isTransitioning ? 'scale-100' : 'scale-0'}`}
                lottieRef={lottieRef}
                width='100%'
                height='100%'
                slug={gift.slug}
                loop={false}
                autoPlay={false}
              />
            )}
          </div>

          <h3 className='mt-3 mb-6 font-semibold text-xl'>{t('sendModal.title')}</h3>
        </div>

        <div className='bg-bg-primary-light dark:bg-bg-secondary-dark rounded-xl mx-4 my-6 divide-y-[0.5px] divide-separator-light dark:divide-white/20'>
          <div className='flex justify-between divide-x-[0.5px] divide-separator-light dark:divide-white/20'>
            <span className='p-4 w-[110px] text-label-secondary-light dark:text-label-secondary-dark'>
              {t('sendModal.gift')}
            </span>

            <span className='p-4 grow text-label-primary-light dark:text-label-primary-dark'>
              {t(`gift.${gift?.name}`)}
            </span>
          </div>

          <div className='flex justify-between divide-x-[0.5px] divide-separator-light dark:divide-white/20'>
            <span className='p-4 w-[110px] text-label-secondary-light dark:text-label-secondary-dark'>
              {t('sendModal.date')}
            </span>

            <span className='p-4 grow text-label-primary-light dark:text-label-primary-dark'>
              {orderSelected?.purchaseDate && new Date(orderSelected.purchaseDate).toLocaleString()}
            </span>
          </div>

          <div className='flex justify-between divide-x-[0.5px] divide-separator-light dark:divide-white/20'>
            <span className='p-4 w-[110px] text-label-secondary-light dark:text-label-secondary-dark'>
              {t('sendModal.price')}
            </span>

            <span className='p-4 grow text-label-primary-light dark:text-label-primary-dark flex items-center gap-2'>
              <CurrencyIcon withBackground currency={gift?.currency} />
              {`${gift?.price} ${gift?.currency}`}
            </span>
          </div>

          <div className='flex justify-between divide-x-[0.5px] divide-separator-light dark:divide-white/20'>
            <span className='p-4 w-[110px] text-label-secondary-light dark:text-label-secondary-dark'>
              {t('sendModal.availability')}
            </span>

            {gift && (
              <span className='p-4 grow text-label-primary-light dark:text-label-primary-dark'>
                {`${gift.maxAvailable - gift.available} ${t('common.of')} ${gift.maxAvailable}`}
              </span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SendGiftModal;
