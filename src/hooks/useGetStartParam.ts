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

/**
 * Получает параметр start_param
 * А так же редиректит на страницу об успешной покупке подарка
 */
const useGetStartParam = () => {
  const immutableNavigate = useRef(useNavigate());

  const { tg } = useTelegram();

  useEffect(() => {
    const initDataParams = getInitDataParams(tg.initData);

    const startParam = initDataParams?.get('start_param');

    if (!startParam?.includes('paymentId')) {
      return;
    }

    const paymentId = startParam.split('_')?.[1];

    if (!paymentId) {
      return;
    }

    immutableNavigate.current(`/purchased/${paymentId}`);
  }, [tg]);
};

export default useGetStartParam;
