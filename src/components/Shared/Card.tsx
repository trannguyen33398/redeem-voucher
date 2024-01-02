import { classNames } from '@/lib';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

interface Props extends DivProps {
  children: ReactNode;
  borderSize?: 'sm' | 'md' | 'lg';
  borderColor?: string;
  bgColor?: string;
  containerClass?: string;
}

const getBorderSize = (borderSize: string, isParent = false) => {
  if (isParent) {
    if (borderSize === 'lg') return 'p-4 rounded-3xl';
    if (borderSize === 'md') return 'p-2 rounded-2xl';

    return 'p-1 rounded-xl';
  } else {
    if (borderSize === 'lg') return 'px-7 py-10 rounded-3xl md:px-12 md:py-14';
    if (borderSize === 'md') return 'px-5 py-8 rounded-2xl md:px-10 md:py-12';

    return 'px-3 py-6 rounded-xl md:px-8 md:py-10';
  }
};

function Card({
  children,
  borderSize = 'md',
  borderColor = 'bg-white/25',
  bgColor = 'bg-white',
  className,
  containerClass,
  ...otherProps
}: Props) {
  return (
    <article
      className={classNames(
        borderColor,
        getBorderSize(borderSize, true),
        containerClass ?? ''
      )}
    >
      <div
        className={classNames(
          'w-full h-full',
          bgColor,
          getBorderSize(borderSize),
          className ?? ''
        )}
        {...otherProps}
      >
        {children}
      </div>
    </article>
  );
}

export default Card;
