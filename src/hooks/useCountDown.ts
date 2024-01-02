import { useEffect, useState } from 'react';

const secondInMs = 999;

const useCountdown = (targetDate: string | number | Date) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    if (countDownDate - new Date().getTime() >= secondInMs) {
      const interval = setInterval(() => {
        const newCountDown = countDownDate - new Date().getTime();
        setCountDown(newCountDown);

        if (newCountDown <= secondInMs) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countDownDate]);

  return {
    ...getReturnValues(countDown),
    isDone: countDown <= secondInMs,
  };
};

function formatTime(time: number) {
  if (time <= 0) return '00';

  if (time.toString().length === 1) return `0${time}`;

  return time.toString();
}

const getReturnValues = (countDown: number) => {
  // calculate time left
  // const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  // const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return {
    // days,
    // hours,
    minutes: formatTime(minutes),
    seconds: formatTime(seconds),
  };
};

export { useCountdown };
