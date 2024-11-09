import Lottie, { LottieRef } from 'lottie-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type NavigationLinkProps = {
  isActive: boolean;
  path: string;
  label: string;
  animationData: unknown;
  onLinkClick: (ref: LottieRef) => void;
};

function NavigationLink({
  isActive,
  path,
  label,
  animationData,
  onLinkClick,
}: NavigationLinkProps) {
  const lottieRef = useRef(null);

  const [isLottieLoaded, setLottieLoaded] = useState(false);

  const { t } = useTranslation();

  return (
    <Link
      to={path}
      className={`h-[50px] w-[25%] flex flex-col grow items-center justify-center`}
      onClick={() => !isActive && onLinkClick(lottieRef)}
    >
      <span
        className={`transition ease-in-out delay-150 text-icons-light dark:text-icons-dark ${isActive ? 'text-primary-light dark:text-primary-light' : ''}`}
      >
        <Lottie
          lottieRef={lottieRef}
          style={{
            width: 26,
            height: 26,
            display: isLottieLoaded ? 'inline-block' : 'none',
          }}
          onDOMLoaded={() => setLottieLoaded(true)}
          rendererSettings={{
            className: 'lottie_svg',
          }}
          animationData={animationData}
          loop={false}
          autoplay={false}
        />

        <span
          style={{ display: isLottieLoaded ? 'none' : 'inline-block' }}
          className='rounded-[50%] h-[26px] w-[26px] block animate-pulse bg-icons-light dark:bg-icons-dark '
        ></span>
      </span>

      <span
        className={`text-[10px] font-medium transition ease-in-out delay-150 text-label-tabbar-light dark:text-label-tabbar-dark ${isActive ? 'text-primary-light dark:text-primary-light' : ''}`}
      >
        {t(label)}
      </span>
    </Link>
  );
}

export default NavigationLink;
