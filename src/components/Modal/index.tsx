import CloseIcon from '@/assets/images/close.svg?react';
import { useTelegram } from '@/hooks';
import { ReactNode, useRef } from 'react';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, isOpen, onClose }: ModalProps) {
  const backdropRef = useRef<null | HTMLDivElement>(null);

  const { tg } = useTelegram();

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  const onCloseClick = () => {
    tg.HapticFeedback.impactOccurred('light');

    onClose();
  };

  return (
    <div
      ref={backdropRef}
      onClick={onBackdropClick}
      className={`transition-all h-[100%] fixed inset-0 bg-black/50 z-50 ${isOpen ? 'opacity-1 visible duration-[0.4s]' : 'duration-[0.2s] opacity-0 invisible'}`}
    >
      <div
        className={`fixed bottom-0 left-0 right-0 bg-bg-secondary-light dark:bg-bg-primary-dark rounded-t-2xl z-100 transform ${isOpen ? 'translate-y-0 transition-all duration-[0.4s] ease-out' : 'translate-y-[100%]'}`}
      >
        <button className='absolute right-4 top-4 bg-bg-primary-light dark:bg-bg-secondary-dark w-[30px] h-[30px] flex items-center rounded-full justify-center text-label-secondary-light dark:text-label-secondary-dark'>
          <CloseIcon onClick={onCloseClick} className='w-6 h-6' />
        </button>

        <div className='p-4'>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
