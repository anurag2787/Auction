import { useEffect, useState } from 'react';

export const Timer = ({ endsAt, serverTime }) => {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!endsAt || !serverTime) return;

    // Calculate initial remaining time
    const initialRemaining = Math.max(0, endsAt - serverTime);
    setRemaining(initialRemaining);

    // Set up interval to decrement every second
    const interval = setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [endsAt, serverTime]);

  const isLowTime = remaining < 10 && remaining > 0;
  const isEnded = remaining === 0;

  return (
    <div
      className={`text-lg font-semibold ${
        isLowTime ? 'text-red-400 animate-pulse' : 'text-gray-300'
      }`}
    >
      {isEnded ? 'Ended' : `${remaining}s`}
    </div>
  );
};
