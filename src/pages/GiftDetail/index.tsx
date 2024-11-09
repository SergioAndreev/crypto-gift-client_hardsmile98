import { useBackButton, useTelegram } from '@/hooks';
import Detail from './Detail';
import GiftHistory from './GiftHistory';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetGiftHistoryQuery, useGetGiftQuery } from '@/services';
import { useTranslation } from 'react-i18next';
import { ErrorPage } from '@/components';
import DetailSkeleton from './DetailSkeleton';
import GiftHistorySkeleton from './GiftHistorySkeleton';

function Gift() {
  useBackButton();

  const { t } = useTranslation();

  const { id = '' } = useParams();

  const {
    data: giftDetail,
    isError: isGiftError,
    isLoading: isGiftLoading,
    error: giftError,
  } = useGetGiftQuery({ id });

  const {
    data: giftHistory,
    isLoading: isGiftHistoryLoading,
    isError: isGiftHistoryError,
    error: giftErroriftHistoryError,
  } = useGetGiftHistoryQuery({ giftId: id });

  const gift = giftDetail?.data;
  const history = giftHistory?.data;

  const isCanBuy = gift && gift?.available > 0;

  const { tg } = useTelegram();

  useEffect(() => {
    tg.MainButton.text = t('gift.buyGift');
    tg.MainButton.show();

    return () => {
      tg.MainButton.hide();
    };
  }, [t, tg]);

  useEffect(() => {
    if (isCanBuy) {
      tg.MainButton.enable();
    } else {
      tg.MainButton.disable();
    }
  }, [isCanBuy, tg]);

  const isError = isGiftError || isGiftHistoryError;
  const error = giftError || giftErroriftHistoryError;

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <>
      <div className='p-4'>
        {isGiftLoading ? (
          <DetailSkeleton />
        ) : gift ? (
          <Detail gift={gift} />
        ) : (
          <p className='text-label-secondary-light dark:text-label-secondary-dark'>
            {t('gift.notFound')}
          </p>
        )}
      </div>

      <hr className='h-[12px] border-0 bg-bg-secondary-light dark:bg-black' />

      <div className='p-4'>
        {isGiftHistoryLoading ? <GiftHistorySkeleton /> : <GiftHistory history={history} />}
      </div>
    </>
  );
}

export default Gift;
