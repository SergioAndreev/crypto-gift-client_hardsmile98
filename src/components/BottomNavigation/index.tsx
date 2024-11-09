import { useLocation } from 'react-router-dom';
import { LottieRef } from 'lottie-react';
import tabStore from '@/assets/animations/tab-store.json';
import tabGifts from '@/assets/animations/tab-gifts.json';
import tabLeaderboard from '@/assets/animations/tab-leaderboard.json';
import tabProfile from '@/assets/animations/tab-profile.json';
import { useTelegram } from '@/hooks';
import NavigationLink from './NavigationLink';

const links = [
  {
    path: '/store',
    label: 'menu.store',
    animationData: tabStore,
  },
  {
    path: '/gifts',
    label: 'menu.gifts',
    animationData: tabGifts,
  },
  {
    path: '/leaderboard',
    label: 'menu.leaderboard',
    animationData: tabLeaderboard,
  },
  {
    path: '/profile',
    label: 'menu.profile',
    animationData: tabProfile,
  },
];

function BottomNavigation() {
  const { tg } = useTelegram();

  const onLinkClick = (ref: LottieRef) => {
    ref.current?.goToAndStop(0, true);

    ref.current?.play();

    tg.HapticFeedback.impactOccurred('light');
  };

  const { pathname } = useLocation();

  return (
    <nav className='flex items-center'>
      {links.map((link) => {
        const isActive = pathname.includes(link.path);

        return (
          <NavigationLink
            key={link.path}
            isActive={isActive}
            label={link.label}
            path={link.path}
            animationData={link.animationData}
            onLinkClick={onLinkClick}
          />
        );
      })}
    </nav>
  );
}

export default BottomNavigation;
