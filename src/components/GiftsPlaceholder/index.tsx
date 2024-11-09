import emptyGifts from '@/assets/images/empty-gifts.webp';
import { Link } from 'react-router-dom';

type GiftsPlaceholderProps = {
  text: string;
};

function GiftsPlaceholder({ text }: GiftsPlaceholderProps) {
  return (
    <div className='px-4 py-8 text-center bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-[12px]'>
      <img className='mb-4 inline-block w-[100px] h-[100px]' src={emptyGifts} alt='gifts' />

      <p className='mb-4'>{text}</p>

      <Link className='text-primary-light dark:text-primary-dark' to='/store'>
        Open Store
      </Link>
    </div>
  );
}

export default GiftsPlaceholder;
