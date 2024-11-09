import { IGift } from '@/types';

type GetOrderByIdResponse = {
  status: number;
  data: {
    _id: string;
    paymentId: string;
    purchaseDate: string;
    userId: string;
    giftId: IGift;
  };
};

const getOrderById = {
  query: ({ id }: { id: string }) => ({
    url: '/order',
    method: 'GET',
    params: {
      id,
    },
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
};

export { getOrderById, type GetOrderByIdResponse };
