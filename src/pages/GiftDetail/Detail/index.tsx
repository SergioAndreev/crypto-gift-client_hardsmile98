import React, { useRef } from 'react';
import { hexToRGB } from '@/helpers';
import { LottieRefCurrentProps } from 'lottie-react';
import { CurrencyIcon, GiftImage } from '@/components';
import { useTranslation } from 'react-i18next';
import { GetGiftResponse } from '@/services';

type DetailProps = {
  gift: GetGiftResponse['data'];
};

function Detail({ gift }: DetailProps) {
  const { t } = useTranslation();

  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  const onPlayAnination = () => {
    lottieRef.current?.goToAndStop?.(0, true);

    lottieRef.current?.play?.();
  };

  if (!gift) {
    return null;
  }

  return (
    <>
      <div
        style={
          {
            '--gradient-start': gift.bgColor,
            '--gradient-end': hexToRGB(gift.bgColor, 0.3),
          } as React.CSSProperties
        }
        className={`overflow-hidden after:bg-cover after-bg-center after:bg-tg-pattern after:absolute after:top-0 
          after:left-0 after:right-0 after:bottom-0 after:opacity-[5%] after:z-1 
          before:bg-gradient-to-b before:from-[var(--gradient-start)] before:to-[var(--gradient-end)] 
          before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 
          before:opacity-[20%] before:z-2 relative text-center rounded-[12px] p-6 cursor-pointer transition-transform`}
      >
        <div className='relative z-10 aspect-square'>
          <GiftImage
            slug={gift.slug}
            lottieRef={lottieRef}
            onClick={onPlayAnination}
            autoPlay={false}
            loop={false}
          />
        </div>
      </div>

      <div className='py-3'>
        <div className='mb-2 flex items-center gap-x-2 gap-y-1 flex-wrap'>
          <h3 className='font-semibold text-xl'>{t(`gift.${gift.name}`)}</h3>

          <div className='font-medium text-primary-light dark:text-primary-dark bg-[#E0EFFF] dark:bg-[#19283A] px-2 rounded-[100px]'>
            {`${gift.available} ${t('gift.of')} ${gift.maxAvailable}`}
          </div>
        </div>

        <p className='mb-2 text-label-secondary-light dark:text-label-secondary-dark'>
          {t(`gift.${gift.description}`)}
        </p>

        <div className='flex font-medium items-center gap-2'>
          <CurrencyIcon currency={gift.currency} withBackground />
          {` ${gift.price} ${gift.currency}`}
        </div>
      </div>
    </>
  );
}

export default Detail;
