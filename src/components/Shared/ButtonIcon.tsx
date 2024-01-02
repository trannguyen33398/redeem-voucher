import { FC, ReactNode } from 'react';

import Button, { type ButtonProps } from './Button';
import ButtonAlt, { type ButtonAltProps } from './ButtonAlt';
import ButtonLink, { type ButtonLinkProps } from './ButtonLink';

type Variant = 'primary' | 'alt' | 'link';

interface Props extends ButtonProps, ButtonAltProps, ButtonLinkProps {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: Variant;
}

const variants: Record<Variant, FC> = {
  primary: Button,
  alt: ButtonAlt,
  link: ButtonLink,
};

function ButtonIcon({
  children,
  icon,
  iconPosition = 'right',
  variant = 'primary',
  ...otherProps
}: Props) {
  const Btn = variants[variant];

  return (
    <Btn {...otherProps}>
      {!children && icon && icon}
      {children && (
        <>
          {iconPosition === 'left' && icon && (
            <span className="pr-2">{icon}</span>
          )}
          {children}
          {iconPosition === 'right' && icon && (
            <span className="pl-2">{icon}</span>
          )}
        </>
      )}
    </Btn>
  );
}

export default ButtonIcon;
