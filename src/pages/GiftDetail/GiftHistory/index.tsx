import GiftHistoryItem from './GiftHistoryItem';
import { useTranslation } from 'react-i18next';
import { GetGiftHistoryResponse } from '@/services';

type GiftHistoryProps = {
  history: GetGiftHistoryResponse['data'] | undefined;
};

function GiftHistory({ history }: GiftHistoryProps) {
  const { t } = useTranslation();

  return (
    <>
      <p className='text-label-secondary-light dark:text-label-secondary-dark text-sm uppercase'>
        {t('gift.recentlyActions')}
      </p>

      <div className='mt-4'>
        {history?.length ? (
          history?.map((action) => <GiftHistoryItem key={action._id} action={action} />)
        ) : (
          <div className='text-label-secondary-light dark:text-label-secondary-dark'>
            {t('gift.actionsEmpty')}
          </div>
        )}
      </div>
    </>
  );
}

export default GiftHistory;
