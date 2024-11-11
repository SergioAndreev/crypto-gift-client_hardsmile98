import { useEffect, useRef, useState } from 'react';
import GiftImage from '../GiftImage';
import { LottieRefCurrentProps } from 'lottie-react';

type NotificationProps = {
  title: string;
  description?: string;
  slug: string;
  buttonText: string;
  onButtonClick: () => void;
};

const DURATION = 10 * 1000; // 10 секунд

function Notification({ title, description, slug, buttonText, onButtonClick }: NotificationProps) {
  const [isVisible, setVisible] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    if (isVisible) {
      lottieRef.current?.goToAndStop?.(0, true);

      lottieRef.current?.play?.();
    }
  }, [isVisible]);

  useEffect(() => {
    setVisible(true);

    timeoutRef.current = setTimeout(() => setVisible(false), DURATION);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`transition-all duration-[1.5s] absolute bottom-4 left-4 right-4 rounded-[12px] flex items-center gap-3 px-4 py-3 bg-bg-notification-light dark:bg-bg-notification-dark text-white ${isVisible ? 'opacity-1 visible' : 'opacity-0 invisible'}`}
    >
      <div className='inline-block w-[32px] h-[32px]'>
        <GiftImage
          lottieRef={lottieRef}
          height='100%'
          width='100%'
          slug={slug}
          autoPlay={false}
          loop={false}
        />
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
