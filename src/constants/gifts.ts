import deliciousCake from '@/assets/animations/gift-delicious-cake.json';
import blueStar from '@/assets/animations/gift-blue-star.json';
import greenStar from '@/assets/animations/gift-green-star.json';

const animationGiftsMap = {
  ['delicious-cake']: deliciousCake,
  ['green-star']: greenStar,
  ['blue-star']: blueStar,
} as Record<string, object>;

export { animationGiftsMap };
