import { IGift } from '@/types';

type GetMyGiftsResponse = {
  status: number;
  data: Array<{
    _id: string;
    giftId: IGift;
    status: 'purchased';
    purchaseDate: string;
    userId: string;
    paymentId: string;
  }>;
};

const getMyGifts = {
  query: () => ({
    url: '/order/byStatus',
    method: 'GET',
    params: {
      status: 'purchased',
    },
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
};

export { getMyGifts, type GetMyGiftsResponse };
