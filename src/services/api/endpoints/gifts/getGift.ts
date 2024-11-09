import { IGift } from '@/types';

type GetGiftResponse = {
  status: number;
  data: IGift;
};

const getGift = {
  query: ({ id }: { id: string }) => ({
    url: 'gift',
    method: 'GET',
    params: {
      id,
    },
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
};

export { getGift, type GetGiftResponse };
