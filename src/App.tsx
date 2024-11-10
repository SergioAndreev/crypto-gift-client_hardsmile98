import { useEffect, useState } from 'react';
import { LoadingPage, ErrorPage } from '@/components';
import { useGetStartParam, useTelegram } from './hooks';
import { useSelector } from './store';
import { useGetTokenQuery } from './services';
import Routes from './Routes';

function App() {
  useGetStartParam();

  const [appStatus, setAppStatus] = useState<'notinitialized' | 'error' | 'initialized'>(
    'notinitialized',
  );

  const theme = useSelector((state) => state.user.theme);

  const { init, tg } = useTelegram();

  const { isSuccess, isError, error } = useGetTokenQuery(
    { tgData: tg.initData },
    { skip: appStatus !== 'notinitialized' },
  );

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (isSuccess) {
      setAppStatus('initialized');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setAppStatus('error');
    }
  }, [isError]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  if (appStatus === 'notinitialized') {
    return <LoadingPage />;
  }

  if (appStatus === 'error') {
    return <ErrorPage error={error} />;
  }

  return <Routes />;
}

export default App;
