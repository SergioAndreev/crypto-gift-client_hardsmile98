import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import useTelegram from './useTelegram';

type useBackButtonParams = {
  backUrl?: string;
  skip?: boolean;
};

const useBackButton = ({ backUrl, skip }: useBackButtonParams = {}) => {
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
    if (skip) {
      return;
    }

    tg.BackButton.show();

    tg.BackButton.onClick(back);

    return () => {
      tg.BackButton.offClick(back);

      tg.BackButton.hide();
    };
  }, [skip, tg, back]);
};

export default useBackButton;
