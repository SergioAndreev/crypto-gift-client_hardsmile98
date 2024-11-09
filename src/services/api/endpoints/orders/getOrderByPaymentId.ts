import { IGift, IUser } from '@/types';

type GetOrderByPaymentIdResponse = {
  status: number;
  data: {
    _id: string;
    paymentId: string;
    purchaseDate: string;
    userId: IUser;
    recipientId?: IUser;
    giftId: IGift;
    status: 'purchased' | 'sent';
  };
};

const getOrderByPaymentId = {
  query: ({ paymentId }: { paymentId: string }) => ({
    url: '/order/byPaymentId',
    method: 'GET',
    params: {
      paymentId,
    },
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
};

export { getOrderByPaymentId, type GetOrderByPaymentIdResponse };
