import { ActionIcon, GiftImage } from '@/components';
import { Link } from 'react-router-dom';
import { GetUserHistoryResponse } from '@/services';
import { useTranslation } from 'react-i18next';

type ActionItemProps = {
  isLast: boolean;
  action: GetUserHistoryResponse['data'][number]['actions'][number];
};

const labels = {
  purchase: 'Buy',
  send: 'Sent',
  receive: 'Receive',
};

function ActionItem({ action, isLast }: ActionItemProps) {
  const { t } = useTranslation();

  return (
    <div className='flex items-center gap-3'>
      <div className='rounded-xl relative flex items-center justify-center w-[40px] h-[40px] bg-bg-secondary-light dark:bg-bg-secondary-dark'>
        <div className='w-[32px] h-[32px]'>
          <GiftImage
            width='100%'
            height='100%'
            slug={action.gift.slug}
            autoPlay={false}
            loop={false}
          />
        </div>

        <div className='absolute bottom-0 right-[-4px]'>
          <ActionIcon type={action.action} />
        </div>
      </div>

      <div
        className={`py-2 flex items-center grow justify-between border-separator-light dark:border-separator-dark ${isLast ? '' : 'border-b-[0.5px]'}`}
      >
        <div>
          <p className='text-label-secondary-light dark:text-label-secondary-dark text-sm'>
            {t(`history.${labels[action.action]}`)}
          </p>
          <p className='font-medium'>{t(`gift.${action.gift.name}`)}</p>
        </div>

        <div className='font-medium'>
          {action.action === 'purchase' && (
            <p>
              {-`${action.gift.price}`} {action.gift.currency}
            </p>
          )}

          {action.action === 'send' && (
            <p>
              {`${t('common.to')} `}
              <Link
                className='text-primary-light dark:text-primary-dark'
                to={`/leaderboard/${action.recipient._id}`}
              >
                {action.recipient.firstName}
              </Link>
            </p>
          )}

          {action.action === 'receive' && (
            <p>
              {`${t('common.from')} `}
              <Link
                className='text-primary-light dark:text-primary-dark'
                to={`/leaderboard/${action.user._id}`}
              >
                {action.user.firstName}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActionItem;
