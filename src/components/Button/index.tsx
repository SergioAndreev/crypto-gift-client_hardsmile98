import { useTelegram } from '@/hooks';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

function Button({ children, className, onClick, ...props }: ButtonProps) {
  const { tg } = useTelegram();

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick?.(e);

    tg.HapticFeedback.impactOccurred('light');
  };

  return (
    <button
      type='button'
      className={`h-[30px] text-sm bg-primary-light text-white block w-[100%] font-semibold rounded-[100px] transition-all duration-150 active:bg-primary-dark cursor-pointer ${className ?? ''}`}
      onClick={onClickHandler}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
