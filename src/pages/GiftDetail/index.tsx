import { useBackButton, useTelegram } from '@/hooks';
import Detail from './Detail';
import GiftHistory from './GiftHistory';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  isErrorWithMessage,
  useBuyGiftMutation,
  useGetGiftHistoryQuery,
  useGetGiftQuery,
} from '@/services';
import { useTranslation } from 'react-i18next';
import { ErrorPage } from '@/components';
import DetailSkeleton from './DetailSkeleton';
import GiftHistorySkeleton from './GiftHistorySkeleton';
import { useSnackbar } from 'notistack';

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

  const isEnabled = gift && gift.available > 0;

  const { tg } = useTelegram();

  const { enqueueSnackbar } = useSnackbar();

  const [
    buyGift,
    {
      data: buyGiftData,
      isLoading: isBuyGiftLoading,
      isSuccess: isBuyGiftSuccess,
      isError: isBuyGiftError,
      error: buyGiftError,
    },
  ] = useBuyGiftMutation();

  const miniAppPayUrl = buyGiftData?.data?.miniAppPayUrl;

  useEffect(() => {
    if (isBuyGiftError && isErrorWithMessage(buyGiftError)) {
      enqueueSnackbar(buyGiftError.data.message, { variant: 'error' });
    }
  }, [enqueueSnackbar, isBuyGiftError, buyGiftError]);

  useEffect(() => {
    if (isBuyGiftLoading) {
      tg.MainButton.showProgress();
    }
  }, [tg, isBuyGiftLoading]);

  useEffect(() => {
    if (isBuyGiftError || isBuyGiftSuccess) {
      tg.MainButton.hideProgress();
    }
  }, [tg, isBuyGiftSuccess, isBuyGiftError]);

  useEffect(() => {
    if (isBuyGiftSuccess && miniAppPayUrl) {
      tg.openTelegramLink(miniAppPayUrl);
      tg.close();
    }
  }, [tg, isBuyGiftSuccess, miniAppPayUrl]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const buyGiftCb = () => buyGift({ id });

    tg.MainButton.text = t('gift.buyGift');
    tg.MainButton.onClick(buyGiftCb);
    tg.MainButton.show();

    return () => {
      tg.MainButton.offClick(buyGiftCb);
      tg.MainButton.hide();
    };
  }, [t, buyGift, tg, id, isEnabled]);

  const isError = isGiftError || isGiftHistoryError;
  const error = giftError || giftErroriftHistoryError;

  if (isError || !id) {
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
