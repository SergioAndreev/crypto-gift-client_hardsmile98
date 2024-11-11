import { Avatar, GiftImage } from '@/components';
import { GetOrdersReceivedResponse } from '@/services';
import { useTranslation } from 'react-i18next';

type GiftReceivedProps = {
  order: GetOrdersReceivedResponse['data'][number];
  onGiftClick: (id: string) => void;
};

function GiftReceived({ order, onGiftClick }: GiftReceivedProps) {
  const { t } = useTranslation();

  return (
    <div
      onClick={() => onGiftClick(order._id)}
      className='cursor-pointer flex flex-col justify-between bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl p-3'
    >
      <div>
        <div className='flex items-center justify-between flex-wrap gap-1'>
          <Avatar
            alt={order.userId.firstName}
            src={order.userId.avatar}
            size='sm'
            className='w-[16px] h-[16px] rounded-full object-cover bg-bg-primary-light dark:bg-bg-primary-dark'
          />

          <p className='text-sm text-label-date-light dark:text-label-date-dark'>
            1 of {order.giftId.maxAvailable}
          </p>
        </div>

        <div className='aspect-square'>
          <GiftImage
            width={'100%'}
            height={'100%'}
            slug={order.giftId.slug}
            autoPlay={false}
            loop={false}
          />
        </div>
      </div>

      <h3 className='text-center text-sm font-medium'>{t(`gift.${order.giftId.name}`)}</h3>
    </div>
  );
}

export default GiftReceived;
