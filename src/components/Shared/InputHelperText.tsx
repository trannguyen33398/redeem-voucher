import { classNames } from '@/lib';
import { ReactNode } from 'react';

interface Props {
  show: boolean;
  text: string;
  variant: 'success' | 'error';
  icon?: ReactNode;
}

function InputHelperText({ variant, show, text, icon }: Props) {
  return (
    <p
      className={classNames(
        !show ? 'py-2' : '',
        variant === 'success' ? 'text-[#207227]' : 'text-[#CF1124]',
        'ml-auto flex items-center justify-center space-x-1'
      )}
    >
      {show && icon && icon}
      <span className="text-xs md:text-sm">{show ? text : ''}</span>
    </p>
  );
}

export default InputHelperText;
