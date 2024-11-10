import { IGift, IUser } from '@/types';

type GetUserHistoryResponse = {
  status: number;
  data: Array<{
    _id: string;
    date: string;
    actions: Array<{
      _id: string;
      action: 'purchase' | 'send' | 'receive';
      gift: IGift;
      user: IUser;
      recipient: IUser;
    }>;
  }>;
};

const getUserHistory = {
  query: () => ({
    url: '/order/userHistory',
    method: 'GET',
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
};

export { getUserHistory, type GetUserHistoryResponse };
