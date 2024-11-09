import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useTelegram from './useTelegram';

const getInitDataParams = (initData: string) => {
  try {
    const initDataParams = new URLSearchParams(initData);
    return initDataParams;
  } catch (_error) {
    return null;
  }
};

const useRedirectToOrder = () => {
  const immutableNavigate = useRef(useNavigate());

  const { tg } = useTelegram();

  useEffect(() => {
    const initDataParams = getInitDataParams(tg.initData);

    if (!initDataParams) {
      return;
    }

    const startParam = initDataParams.get('start_param');

    if (!startParam?.includes('order')) {
      return;
    }

    const orderId = startParam.split('_')?.[1];

    if (!orderId) {
      return;
    }

    immutableNavigate.current(`/order/${orderId}`);
  }, [tg]);
};

export default useRedirectToOrder;
