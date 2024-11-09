import { IGift } from '@/types';

type GetGiftsResponse = {
  status: number;
  data: Array<IGift>;
};

const getGifts = {
  query: () => ({
    url: 'gift/all',
    method: 'GET',
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
};

export { getGifts, type GetGiftsResponse };
