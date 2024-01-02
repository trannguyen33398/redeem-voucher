import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { cva, type VariantProps } from 'cva';

export const buttonBase = cva('flex items-center text-center font-display', {
  variants: {
    fullWidth: {
      true: 'w-full',
    },
    fullRounded: {
      true: 'rounded-full',
    },
    size: {
      sm: 'text-sm py-2 px-3 rounded-md',
      md: 'py-3 px-4 rounded-lg',
      lg: 'text-lg py-4 px-5 rounded-xl',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

export type NativeButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface ButtonBaseProps
  extends NativeButtonProps,
    VariantProps<typeof buttonBase> {}

function ButtonBase({
  children,
  className,
  size,
  fullWidth,
  fullRounded,
  type,
  ...otherProps
}: ButtonBaseProps) {
  return (
    <button
      className={buttonBase({ size, fullWidth, fullRounded, class: className })}
      type={type ?? 'button'}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default ButtonBase;
