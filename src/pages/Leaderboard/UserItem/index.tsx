import { Link } from 'react-router-dom';
import GiftIcon from '@/assets/images/gift.svg?react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IUser } from '@/types';
import { Avatar } from '@/components';

const MEDALS = ['🥇', '🥈', '🥉'];

type UserItemProps = {
  user: IUser;
  position: number;
  isLast: boolean;
  isMyProfile: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
};

function UserItem({ user, position, isLast, isMyProfile, containerRef }: UserItemProps) {
  const { t } = useTranslation();

  const [isStickyActive, setStickyActive] = useState(false);

  const stickyRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!isMyProfile || !stickyRef.current || !containerRef.current) return;

    const scrollContainer = containerRef.current;

    const handleScroll = () => {
      const rect = stickyRef.current!.getBoundingClientRect();

      const containerRect = scrollContainer!.getBoundingClientRect();

      setStickyActive(rect.bottom >= containerRect.bottom);
    };

    handleScroll();

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [isMyProfile, containerRef]);

  return (
    <Link
      ref={stickyRef}
      className={`w-[100%] bg-bg-primary-light dark:bg-bg-primary-dark flex items-center gap-3 px-4 border-separator-light dark:border-separator-dark  
        ${isMyProfile ? 'sticky z-0 bottom-0 left-0 right-0' : ''} ${isStickyActive ? 'border-t-[0.5px]' : ''}`}
      to={isMyProfile ? '/profile' : `${user._id}`}
    >
      <Avatar
        src={user.avatar}
        className='bg-bg-secondary-light dark:bg-bg-secondary-dark w-10 h-10 rounded-full object-cover'
        alt={user.firstName}
      />

      <div
        className={`py-2 flex grow items-center justify-between border-separator-light dark:border-separator-dark ${isLast || isStickyActive ? '' : 'border-b-[0.5px]'}`}
      >
        <div>
          <p className='font-medium'>
            {user.firstName}
            {isMyProfile && (
              <span className='ml-2 px-1 py-[2px] rounded bg-bg-secondary-light dark:bg-bg-secondary-dark text-label-secondary-light dark:text-label-secondary-dark text-[11px]'>
                {t('leaderboard.you')}
              </span>
            )}
          </p>

          <p className='flex items-center gap-1 text-sm text-primary-light dark:text-primary-dark'>
            <GiftIcon className='inline-block w-[12px] h-[12px]' />
            {t('leaderboard.gift', { count: user.giftsReceived })}
          </p>
        </div>

        <div className='font-medium'>
          {position <= 3 ? (
            <span className='text-[22px]'>{MEDALS[position - 1]}</span>
          ) : (
            <span className='text-[15px] text-label-secondary-light dark:text-label-secondary-dark'>
              {`#${position}`}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default UserItem;
