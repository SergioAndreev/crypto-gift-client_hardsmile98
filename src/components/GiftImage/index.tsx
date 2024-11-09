import { giftsMap } from '@/constants';
import Lottie, { LottieComponentProps } from 'lottie-react';

interface GiftImageProps extends Omit<LottieComponentProps, 'animationData'> {
  slug: string;
}

function GiftImage({ slug, ...props }: GiftImageProps) {
  const giftData = giftsMap[slug];

  if (!giftData?.animationData) {
    return null;
  }

  return <Lottie {...props} animationData={giftData.animationData} />;
}

export default GiftImage;
