import { animationGiftsMap } from '@/constants';
import Lottie, { LottieComponentProps } from 'lottie-react';

interface GiftImageProps extends Omit<LottieComponentProps, 'animationData'> {
  slug: string;
}

function GiftImage({ slug, ...props }: GiftImageProps) {
  const animationData = animationGiftsMap[slug];

  if (!animationData) {
    return null;
  }

  return <Lottie {...props} animationData={animationData} />;
}

export default GiftImage;
