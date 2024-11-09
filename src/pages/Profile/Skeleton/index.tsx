function Skeleton() {
  const placeholders = new Array(6).fill('block');

  return (
    <div className='grid grid-cols-3 gap-2'>
      {placeholders.map((_, index) => (
        <div
          key={index}
          className='aspect-[3/4] bg-bg-secondary-light dark:bg-bg-secondary-dark animate-pulse rounded-[12px]'
        />
      ))}
    </div>
  );
}

export default Skeleton;
