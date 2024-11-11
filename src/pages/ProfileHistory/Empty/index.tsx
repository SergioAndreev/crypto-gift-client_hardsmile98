import emptyGifts from '@/assets/animations/emoji-balloons.json';
import { EmptyPlaceholder } from '@/components';
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
    <div className='p-4 flex items-center justify-center h-[100%]'>
      <EmptyPlaceholder
        title={t('history.emptyTitle')}
        description={t('history.emptyDescription')}
      />
    </div>
  );
}

export default Empty;
