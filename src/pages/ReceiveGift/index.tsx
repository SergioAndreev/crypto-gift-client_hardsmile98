import { useBackButton, useTelegram } from '@/hooks';
import { useCallback, useEffect } from 'react';
import { ErrorPage, GiftImage, LoadingPage, Notification } from '@/components';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReceiveGiftQuery } from '@/services';

function Received() {
  useBackButton({ backUrl: '/' });

  const { t } = useTranslation();

  const { id } = useParams();

  const [searchParams] = useSearchParams();

  const hash = searchParams.get('hash');

  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useReceiveGiftQuery(
    {
      id: id ?? '',
      hash: hash ?? '',
    },
    { skip: !id || !hash },
  );

  const order = data?.data;

  const { tg } = useTelegram();

  const userId = order?.userId?._id;

  const goToProfile = useCallback(() => navigate(`/leaderboard/${userId}`), [navigate, userId]);

  useEffect(() => {
    tg.MainButton.text = t('received.mainButton');
    tg.MainButton.show();
    tg.MainButton.onClick(goToProfile);

    return () => {
      tg.MainButton.offClick(goToProfile);
      tg.MainButton.hide();
    };
  }, [t, tg, goToProfile]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !order) {
    return <ErrorPage error={error} />;
  }

  const gift = order?.giftId;

  return (
    <div className='relative p-4 h-[100%] flex items-center justify-center flex-col'>
      <div className='text-center'>
        <div className='inline-block w-[100px] h-[100px] mb-2'>
          <GiftImage width='100%' height='100%' slug={gift.slug} autoPlay={false} loop={false} />
        </div>

        <h5 className='font-semibold text-xl mb-2'>{t('received.title')}</h5>

        <p>
          {t('received.giftReceived')} <span className='font-medium'>{t(`gift.${gift.name}`)}</span>
          {'.'}
        </p>
      </div>

      <Notification
        slug={gift.slug}
        title={t('received.notificationTitle')}
        description={`${gift.name} ${t('common.from')} ${order?.userId?.firstName}`}
        buttonText={t('received.notificationButton')}
        onButtonClick={goToProfile}
      />
    </div>
  );
}

export default Received;
