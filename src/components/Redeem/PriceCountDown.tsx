import { useCountdown } from '@/hooks';
import { useEffect } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

interface Props {
  lockUntil: number;
  refetchVoucher(): void;
}

export function PriceCountDown({ refetchVoucher, lockUntil }: Props) {
  const { minutes, seconds, isDone } = useCountdown(lockUntil);

  useEffect(() => {
    if (isDone) {
      // Delay by one second so that
      // backend has time to update
      const id = setTimeout(() => {
        refetchVoucher();
      }, 1000);

      return () => clearTimeout(id);
    }
  }, [isDone, refetchVoucher]);

  return (
    <div className="flex items-center space-x-1 text-[#5D7A9B]">
      <ClockIcon className="block w-5 h-5" aria-hidden="true" />
      <p className="text-xs md:text-sm">
        Price updates in {minutes}:{seconds}
      </p>
    </div>
  );
}
