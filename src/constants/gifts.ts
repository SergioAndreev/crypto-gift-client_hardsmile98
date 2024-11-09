import deliciousCake from '@/assets/animations/gift-delicious-cake.json';
import blueStar from '@/assets/animations/gift-blue-star.json';
import greenStar from '@/assets/animations/gift-green-star.json';

const giftsMap = {
  ['delicious-cake']: {
    animationData: deliciousCake,
    bgColor: '#FE9F41',
  },

  ['green-star']: {
    animationData: greenStar,
    bgColor: '#46D100',
  },

  ['blue-star']: {
    animationData: blueStar,
    bgColor: '#007AFF',
  },
} as Record<
  string,
  {
    animationData: object;
    bgColor: string;
  }
>;

export { giftsMap };
