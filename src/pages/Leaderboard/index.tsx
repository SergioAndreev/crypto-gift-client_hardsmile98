import { useRef, useState } from 'react';
import Search from './Search';
import UserItem from './UserItem';
import { useGetLeaderboardQuery, useGetProfileQuery } from '@/services';
import { ErrorPage } from '@/components';
import Skeleton from './Skeleton';

function Leaderboard() {
  const [search, setSearch] = useState('');

  const сontainerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: topData,
    isLoading: isTopLoading,
    isError: isTopError,
    error: topError,
  } = useGetLeaderboardQuery(undefined);

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useGetProfileQuery({ id: undefined });

  const users = topData?.data;
  const myProfile = userData?.data?.user;

  const filteredUsers = (users || [])?.filter((user) =>
    user?.firstName?.toLowerCase()?.includes(search.toLowerCase()),
  );

  const isError = isTopError || isUserError;
  const isLoading = isTopLoading || isUserLoading;
  const error = topError || userError;

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className='h-[100%] flex flex-col'>
      <div className='sticky top-0 z-10 bg-bg-primary-light dark:bg-bg-primary-dark px-4 py-2 border-b border-b-[0.5px] border-separator-light dark:border-separator-dark'>
        <Search search={search} setSearch={setSearch} />
      </div>

      <div ref={сontainerRef} className='grow overflow-y-auto'>
        {isLoading ? (
          <Skeleton />
        ) : (
          filteredUsers?.map((user, index) => (
            <UserItem
              key={user._id}
              user={user}
              position={index + 1}
              isLast={index === filteredUsers.length - 1}
              isMyProfile={user._id === myProfile?._id}
              containerRef={сontainerRef}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
