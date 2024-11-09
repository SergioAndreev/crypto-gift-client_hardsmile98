import { Button, GiftImage } from '@/components';
import { IGift } from '@/types';
import { useTranslation } from 'react-i18next';

type GiftCardProps = {
  gift: IGift;
  onSend: (id: string) => void;
};

function GiftCard({ gift, onSend }: GiftCardProps) {
  const { t } = useTranslation();

  return (
    <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-4 text-center flex flex-col justify-between'>
      <h3 className='text-label-secondary-light dark:text-label-secondary-dark  text-sm mb-1'>
        {t(`gift.${gift.name}`)}
      </h3>

      <div className='aspect-square mb-2'>
        <GiftImage height='100%' width='100%' autoPlay={false} loop={false} slug={gift.slug} />
      </div>

      <Button onClick={() => onSend(gift._id)}>{t('gifts.send')}</Button>
    </div>
  );
}

export default GiftCard;
