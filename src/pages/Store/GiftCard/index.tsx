import { CurrencyIcon, GiftImage } from '@/components';
import { hexToRGB } from '@/helpers';
import { useTelegram } from '@/hooks';
import { GetGiftsResponse } from '@/services';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type GiftCardProps = {
  gift: GetGiftsResponse['data'][number];
};

function GiftCard({ gift }: GiftCardProps) {
  const { t } = useTranslation();

  const { tg } = useTelegram();

  const isSoldOut = gift.available === 0;

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isSoldOut) {
      e.preventDefault();
    }

    tg.HapticFeedback.impactOccurred('light');
  };

  return (
    <Link
      key={gift._id}
      to={`/gift/${gift._id}`}
      onClick={onLinkClick}
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
        before:opacity-[20%] before:z-2 relative text-center rounded-[12px] p-6 transition-transform`}
    >
      <div className='relative z-10 flex flex-col justify-between h-[100%]'>
        <p className='absolute top-[-8px] right-[-8px] text-label-secondary-light dark:text-label-secondary-dark text-sm'>
          {gift.maxAvailable - gift.available} {t('common.of')} {gift.maxAvailable}
        </p>

        <div className='pt-4'>
          <div className='aspect-square'>
            <GiftImage width='100%' height='100%' autoPlay={false} loop={false} slug={gift.slug} />
          </div>
        </div>

        <h3 className='relative font-semibold mb-3'>{t(`gift.${gift.name}`)}</h3>

        <p
          className={`relative p-1 w-[100%] h-[30px] gap-1 inline-flex rounded-[100px] justify-center items-center text-sm font-semibold
            ${isSoldOut ? 'bg-label-secondary-light/10 text-label-secondary-light' : 'text-white bg-primary-light dark:bg-primary-dark'}`}
        >
          {isSoldOut ? (
            t('gift.sold_out')
          ) : (
            <>
              <CurrencyIcon className='w-[24px] h-[24px] inline-block' currency={gift.currency} />
              {` ${gift.price} ${gift.currency}`}
            </>
          )}
        </p>
      </div>
    </Link>
  );
}

export default GiftCard;
