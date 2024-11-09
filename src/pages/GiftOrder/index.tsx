import { useBackButton } from '@/hooks';
import Purchased from './Purchased';
import Received from './Received';
import { useGetOrderByPaymentIdQuery } from '@/services';
import { useParams } from 'react-router-dom';
import { ErrorPage, LoadingPage } from '@/components';

function GiftOrder() {
  useBackButton('/');

  const { id: paymentId = '' } = useParams();

  const { data, isError, isLoading, error } = useGetOrderByPaymentIdQuery({ paymentId });

  const order = data?.data;
  const status = order?.status;

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !order) {
    return <ErrorPage error={error} />;
  }

  if (status !== 'purchased') {
    return <Purchased order={order} />;
  }

  return <Received order={order} />;
}

export default GiftOrder;
