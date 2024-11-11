import { ImgHTMLAttributes } from 'react';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: 'base' | 'sm';
}

function Avatar(props: AvatarProps) {
  const { src, alt, className, size, ...otherProps } = props;

  if (src === '' || src === undefined) {
    const firstSymbol = alt ? alt[0] : 'A';

    return (
      <div {...otherProps} className={`inline-flex items-center justify-center ${className ?? ''}`}>
        <span className={`font-semibold ${size === 'sm' ? 'text-[8px]' : ''}`}>{firstSymbol}</span>
      </div>
    );
  }

  return <img {...otherProps} className={`${className ?? ''}`} src={src} alt={alt} />;
}

export default Avatar;
