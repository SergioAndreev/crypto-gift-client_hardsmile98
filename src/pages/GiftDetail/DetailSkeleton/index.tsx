function DetailSkeleton() {
  return (
    <>
      <div className='aspect-square bg-bg-secondary-light dark:bg-bg-secondary-dark animate-pulse rounded-[12px]'></div>

      <div className='py-3'>
        <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark animate-pulse h-6 rounded-md mb-2'></div>

        <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark animate-pulse h-12 rounded-md mb-2'></div>

        <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark animate-pulse h-6 rounded-md'></div>
      </div>
    </>
  );
}

export default DetailSkeleton;
