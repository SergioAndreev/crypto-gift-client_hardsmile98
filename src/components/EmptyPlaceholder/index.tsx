import emptyGifts from '@/assets/animations/emoji-balloons.json';
import Lottie from 'lottie-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type EmptyPlaceholderProps = {
  title?: string;
  description: string;
  isLinkVisivle?: boolean;
};

function EmptyPlaceholder({ title, description, isLinkVisivle }: EmptyPlaceholderProps) {
  const { t } = useTranslation();

  return (
    <div className='w-[100%] text-center px-4 py-8 '>
      <Lottie
        className='mb-4 inline-block w-[100px] h-[100px]'
        animationData={emptyGifts}
        autoPlay={false}
        loop={false}
      />

      {title && <h1 className='mb-2 text-xl font-semibold'>{title}</h1>}

      <p>{description}</p>

      {isLinkVisivle && (
        <Link className='mt-4 inline-block text-primary-light dark:text-primary-dark' to='/store'>
          {t('common.openStore')}
        </Link>
      )}
    </div>
  );
}

export default EmptyPlaceholder;
