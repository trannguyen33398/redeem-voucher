import { cva, type VariantProps } from 'cva';

import ButtonBase, { type ButtonBaseProps } from './ButtonBase';

const buttonLink = cva([], {
  variants: {
    intent: {
      primary: 'text-brand',
      secondary: 'text-sky-50',
      tertiary: 'text-smooth',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

export interface ButtonLinkProps
  extends ButtonBaseProps,
    VariantProps<typeof buttonLink> {}

function ButtonLink({
  children,
  intent,
  className,
  ...otherProps
}: ButtonLinkProps) {
  return (
    <ButtonBase
      className={buttonLink({ intent, class: className })}
      {...otherProps}
    >
      {children}
    </ButtonBase>
  );
}

export default ButtonLink;
