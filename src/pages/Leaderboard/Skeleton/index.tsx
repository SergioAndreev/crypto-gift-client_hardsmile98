function Skeleton() {
  const placeholders = new Array(20).fill('block');

  return (
    <div>
      {placeholders.map((_, index) => (
        <div key={index} className='mb-1 px-4'>
          <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark animate-pulse h-12 rounded-md'></div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
