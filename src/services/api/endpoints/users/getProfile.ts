import { IUser } from '@/types';

type GetProfileResponse = {
  status: number;
  data: {
    user: IUser;
    isMyProfile: boolean;
    position: number;
  };
};

const getProfile = {
  query: ({ id }: { id?: string }) => ({
    url: '/user/profile',
    method: 'GET',
    params: {
      id: id ?? undefined,
    },
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
};

export { getProfile, type GetProfileResponse };
