import emptyGifts from '@/assets/images/empty-gifts.webp';
import { useTelegram } from '@/hooks';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Empty() {
  const { t } = useTranslation();

  const { tg } = useTelegram();

  const navigate = useNavigate();

  useEffect(() => {
    const goToStore = () => navigate('/store');

    tg.MainButton.text = t('common.openStore');
    tg.MainButton.show();
    tg.MainButton.onClick(goToStore);

    return () => {
      tg.MainButton.offClick(goToStore);
      tg.MainButton.hide();
    };
  }, [t, tg, navigate]);

  return (
    <div className='flex items-center justify-center h-[100%]'>
      <div className='text-center'>
        <img className='mb-4 inline-block w-[100px] h-[100px]' src={emptyGifts} alt='gifts' />

        <h1 className='mb-2 text-xl font-semibold'>{t('history.emptyTitle')}</h1>

        <p>{t('history.emptyDescription')}</p>
      </div>
    </div>
  );
}

export default Empty;
