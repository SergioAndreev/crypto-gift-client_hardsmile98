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

const getRedirectPath = (startParam: string) => {
  try {
    const [action, ...otherParam] = startParam.split('_');

    switch (action) {
      case 'purchase': {
        const [paymentId] = otherParam;

        return `/purchased/${paymentId}`;
      }

      case 'receive': {
        const [id, hash] = otherParam;

        return `/receive/${id}?hash=${hash}`;
      }
    }

    return null;
  } catch (_error) {
    return null;
  }
};

/**
 * Получает параметр start_param
 *
 * А так же редиректит
 * Если paymentId, то на страницу успешной оплаты подарка
 * Если receive, то на страницу получения подарка
 */
const useGetStartParam = () => {
  const immutableNavigate = useRef(useNavigate());

  const { tg } = useTelegram();

  useEffect(() => {
    const initDataParams = getInitDataParams(tg.initData);

    const startParam = initDataParams?.get('start_param');

    if (!startParam) {
      return;
    }

    const redirectPath = getRedirectPath(startParam);

    if (redirectPath) {
      immutableNavigate.current(redirectPath);
    }
  }, [tg]);
};

export default useGetStartParam;
