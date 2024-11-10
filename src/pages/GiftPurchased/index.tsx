import { useBackButton, useTelegram } from '@/hooks';
import { useEffect } from 'react';
import { ErrorPage, GiftImage, LoadingPage, Notification } from '@/components';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetOrderByPaymentIdQuery } from '@/services';

function GiftPurchased() {
  useBackButton({ backUrl: '/' });

  const { paymentId = '' } = useParams();

  const { data, isSuccess, isError, isLoading, error } = useGetOrderByPaymentIdQuery({ paymentId });

  const { t } = useTranslation();

  const navigate = useNavigate();

  const order = data?.data;
  const gift = order?.giftId;
  const giftId = gift?._id;

  const { tg } = useTelegram();

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const goToStore = () => navigate('/store');
    const sendGift = () => tg.switchInlineQuery(`gift_${giftId}`, ['users']);

    tg.MainButton.text = t('purchased.mainButton');
    tg.MainButton.onClick(sendGift);
    tg.MainButton.show();

    tg.SecondaryButton.text = t('common.openStore');
    tg.SecondaryButton.onClick(goToStore);
    tg.SecondaryButton.show();

    return () => {
      tg.MainButton.offClick(sendGift);
      tg.SecondaryButton.offClick(goToStore);
      tg.MainButton.hide();
      tg.SecondaryButton.hide();
    };
  }, [t, tg, giftId, isSuccess, navigate]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !gift) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className='relative p-4 h-[100%] flex items-center justify-center flex-col'>
      <div className='text-center'>
        <div className='inline-block w-[100px] h-[100px] mb-2'>
          <GiftImage width='100%' height='100%' slug={gift.slug} autoPlay={false} loop={false} />
        </div>

        <h5 className='font-semibold text-xl mb-2'>{t('purchased.title')}</h5>

        <p>
          {t('purchased.the')} <span className='font-medium'>{t(`gift.${gift.name}`)}</span>{' '}
          {t('purchased.giftWasPurhased')}{' '}
          <span className='font-medium'>{`${gift.price} ${gift.currency}`}</span>.
        </p>
      </div>

      <Notification
        slug={gift.slug}
        title={t('purchased.notificationTitle')}
        description={t('purchased.notificationDescription')}
        buttonText={t('purchased.notificationButton')}
        onButtonClick={() => tg.switchInlineQuery(`gift_${giftId}`, ['users'])}
      />
    </div>
  );
}

export default GiftPurchased;
