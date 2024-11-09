import ReceiveIcon from '@/assets/images/receive.svg?react';
import SentIcon from '@/assets/images/sent.svg?react';
import BuyIcon from '@/assets/images/buy.svg?react';
import { FunctionComponent, SVGProps } from 'react';

type ActionIconProps = {
  type: string;
};

const actionsMap = {
  receive: {
    IconComponent: ReceiveIcon,
    bg: '#35C759',
  },
  send: {
    IconComponent: SentIcon,
    bg: '#AF51DE',
  },
  purchase: {
    IconComponent: BuyIcon,
    bg: '#007AFF',
  },
} as Record<
  string,
  {
    bg: string;
    IconComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  }
>;

function ActionIcon({ type }: ActionIconProps) {
  const actionIconData = actionsMap[type];

  if (!actionIconData) {
    return null;
  }

  const { IconComponent } = actionIconData;

  return (
    <span
      style={{ backgroundColor: actionIconData.bg }}
      className={`flex items-center justify-center w-[16px] h-[16px] rounded-full outline outline-2 outline-white`}
    >
      <IconComponent />
    </span>
  );
}

export default ActionIcon;
