import { ActionIcon, Avatar } from '@/components';
import ActionText from './ActionText';
import { GetGiftHistoryResponse } from '@/services';

type GiftHistoryItemProps = {
  action: GetGiftHistoryResponse['data'][number];
};

function GiftHistoryItem({ action }: GiftHistoryItemProps) {
  return (
    <div className='flex items-center gap-3 py-2'>
      <div className='relative'>
        <Avatar
          src={action.user.avatar}
          className='w-10 h-10 rounded-full object-cover'
          alt={action.user.firstName}
        />

        <div className='absolute bottom-0 right-[-4px]'>
          <ActionIcon type={action.action} />
        </div>
      </div>

      <div>
        <ActionText action={action} />
      </div>
    </div>
  );
}

export default GiftHistoryItem;
