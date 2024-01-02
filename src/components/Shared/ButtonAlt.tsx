import { cva, type VariantProps } from 'cva';

import ButtonBase, { type ButtonBaseProps } from './ButtonBase';

const buttonAlt = cva('disabled:opacity-40', {
  variants: {
    intent: {
      primary: 'border-2 border-brand',
      secondary: 'border-2 border-peaceful',
      tertiary: 'border border-smooth',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

export interface ButtonAltProps
  extends ButtonBaseProps,
    VariantProps<typeof buttonAlt> {}

function ButtonAlt({
  children,
  intent,
  className,
  ...otherProps
}: ButtonAltProps) {
  return (
    <ButtonBase
      className={buttonAlt({ intent, class: className })}
      {...otherProps}
    >
      {children}
    </ButtonBase>
  );
}

export default ButtonAlt;
