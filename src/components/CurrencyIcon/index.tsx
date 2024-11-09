import UsdtIcon from '@/assets/images/usdt.svg?react';
import TonIcon from '@/assets/images/ton.svg?react';
import EthIcon from '@/assets/images/eth.svg?react';
import { FunctionComponent, SVGProps } from 'react';

type CurrencyIconProps = {
  currency: string | undefined;
  className?: string;
  withBackground?: boolean;
};

const currencyMap = {
  USDT: {
    bg: '#009393',
    IconComponent: UsdtIcon,
  },

  TON: {
    bg: '#35AFF1',
    IconComponent: TonIcon,
  },

  ETH: {
    bg: '#627EEA',
    IconComponent: EthIcon,
  },
} as Record<
  string,
  {
    bg: string;
    IconComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  }
>;

function CurrencyIcon({ currency, className, withBackground }: CurrencyIconProps) {
  const currencyData = currency && currencyMap[currency];

  if (!currencyData) {
    return null;
  }

  const { IconComponent } = currencyData;

  if (withBackground) {
    return (
      <span
        style={{ backgroundColor: currencyData.bg }}
        className={`w-[20px] h-[20px] inline-block rounded-[50%] ${className ?? ''} `}
      >
        <IconComponent className='w-[100%] h-[100%]' />
      </span>
    );
  }

  return <IconComponent className={className ?? ''} />;
}

export default CurrencyIcon;
