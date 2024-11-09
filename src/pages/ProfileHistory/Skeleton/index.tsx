function Skeleton() {
  const placeholders = new Array(5).fill('block');

  return (
    <div>
      {placeholders.map((_, index) => (
        <div className='mb-6' key={index}>
          <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark animate-pulse h-6 rounded-md mb-4'></div>

          <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark animate-pulse h-12 rounded-md mb-1'></div>

          <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark animate-pulse h-12 rounded-md mb-1'></div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
