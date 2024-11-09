import { IUser } from '@/types';

type GetLeaderboardResponse = {
  status: number;
  data: Array<IUser>;
};

const getLeaderboard = {
  query: () => ({
    url: '/user/leaderboard',
    method: 'GET',
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
};

export { getLeaderboard, type GetLeaderboardResponse };
