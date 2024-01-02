import { cva, type VariantProps } from 'cva';

import ButtonBase, { type ButtonBaseProps } from './ButtonBase';

const button = cva('font-semibold justify-center disabled:opacity-40', {
  variants: {
    intent: {
      primary: 'text-white bg-brand',
      secondary: 'text-white bg-skyblue',
      tertiary: 'text-white bg-smooth',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

export interface ButtonProps
  extends ButtonBaseProps,
    VariantProps<typeof button> {}

function Button({ children, intent, className, ...otherProps }: ButtonProps) {
  return (
    <ButtonBase
      className={button({ intent, class: className })}
      {...otherProps}
    >
      {children}
    </ButtonBase>
  );
}

export default Button;
