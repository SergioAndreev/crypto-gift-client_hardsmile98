import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import useTelegram from './useTelegram';

const useBackButton = (backUrl?: string) => {
  const navigate = useRef(useNavigate());

  const { tg } = useTelegram();

  const back = useCallback(() => {
    if (backUrl) {
      navigate.current(backUrl);
    } else {
      navigate.current(-1);
    }
  }, [navigate, backUrl]);

  useEffect(() => {
    tg.BackButton.show();

    tg.BackButton.onClick(back);

    return () => {
      tg.BackButton.offClick(back);

      tg.BackButton.hide();
    };
  }, [tg, back]);

  return {
    back,
  };
};

export default useBackButton;
