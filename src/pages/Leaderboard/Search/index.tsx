import SearchIcon from '@/assets/images/search.svg?react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

type SearchProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

function Search({ search, setSearch }: SearchProps) {
  const { t } = useTranslation();

  return (
    <div className='relative h-[36px]'>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type='text'
        placeholder={t('leaderboard.search')}
        className='w-full h-[100%] bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-[12px] pl-10 text-base pr-4 placeholder-[label-secondary-light]'
      />

      <SearchIcon className='w-[20px] h-[20px] absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-label-secondary-light' />
    </div>
  );
}

export default Search;
