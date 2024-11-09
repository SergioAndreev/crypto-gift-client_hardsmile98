import { useSelector } from '@/store';
import { useCallback } from 'react';

const tg = window?.Telegram?.WebApp;

const useTelegram = () => {
  const theme = useSelector((state) => state.user.theme);

  const init = useCallback(() => {
    tg.enableClosingConfirmation();

    const isDark = theme === 'dark';

    tg.setHeaderColor(isDark ? '#1C1C1E' : '#FFFFFF');
    tg.setBottomBarColor(isDark ? '#1F1E1F' : '#F2F2F2');
    tg.setBackgroundColor(isDark ? '#1C1C1E' : '#FFFFFF');

    tg.MainButton.setParams({
      text_color: '#FFFFFF',
      color: '#007AFF',
      position: 'top',
    });

    tg.SecondaryButton.setParams({
      text_color: '#007AFF',
      position: 'bottom',
    });
  }, [theme]);

  return {
    tg,
    init,
  };
};

export default useTelegram;
