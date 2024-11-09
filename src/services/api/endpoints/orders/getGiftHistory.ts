import { IUser } from '@/types';

type GetGiftHistoryResponse = {
  status: number;
  data: Array<{
    _id: string;
    action: 'purchase' | 'send';
    user: IUser;
    recipient: IUser;
  }>;
};

const getGiftHistory = {
  query: ({ giftId }: { giftId: string }) => ({
    url: '/order/giftHistory',
    method: 'GET',
    params: {
      giftId,
    },
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
};

export { getGiftHistory, type GetGiftHistoryResponse };
