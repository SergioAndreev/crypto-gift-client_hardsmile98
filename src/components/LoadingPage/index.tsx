import Loader from '../Loader';

function LoadingPage() {
  return (
    <div className='p-4 bg-bg-primary-light dark:bg-bg-primary-dark h-[100%] flex flex-col items-center justify-center'>
      <Loader />
    </div>
  );
}

export default LoadingPage;
