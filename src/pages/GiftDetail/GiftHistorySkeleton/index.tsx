function GiftHistorySkeleton() {
  const placeholders = new Array(5).fill('block');

  return (
    <>
      <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark animate-pulse h-4 rounded-md'></div>

      <div className='mt-4'>
        {placeholders.map((_, i) => (
          <div
            key={i}
            className='bg-bg-secondary-light dark:bg-bg-secondary-dark animate-pulse h-10 rounded-md mb-3'
          ></div>
        ))}
      </div>
    </>
  );
}

export default GiftHistorySkeleton;
