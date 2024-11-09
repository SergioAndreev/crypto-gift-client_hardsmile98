import { useEffect, useState } from 'react';
import GiftImage from '../GiftImage';

type NotificationProps = {
  title: string;
  description?: string;
  slug: string;
  buttonText: string;
  onButtonClick: () => void;
};

function Notification({ title, description, slug, buttonText, onButtonClick }: NotificationProps) {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className={`transition-all duration-1000 absolute bottom-4 left-4 right-4 rounded-[12px] flex items-center gap-3 px-4 py-3 bg-bg-notification-light dark:bg-bg-notification-dark text-white ${isVisible ? 'opacity-1 visible' : 'opacity-0 invisible'}`}
    >
      <div className='inline-block w-[32px] h-[32px]'>
        <GiftImage height='100%' width='100%' slug={slug} autoPlay={false} loop={false} />
      </div>

      <div className='flex grow items-center justify-between'>
        <div className='text-sm'>
          <p className='font-semibold'>{title}</p>
          <p>{description}</p>
        </div>

        <button
          onClick={onButtonClick}
          className='text-accent-cyan-light dark:text-accent-cyan-dark'
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Notification;
