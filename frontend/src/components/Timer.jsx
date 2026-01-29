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

  const formatTime = (seconds) => {
    if (seconds === 0) return 'Ended';
    
    const units = [
      { name: 'year', value: Math.floor(seconds / (365 * 24 * 3600)) },
      { name: 'day', value: Math.floor((seconds % (365 * 24 * 3600)) / (24 * 3600)) },
      { name: 'hour', value: Math.floor((seconds % (24 * 3600)) / 3600) },
      { name: 'min', value: Math.floor((seconds % 3600) / 60) },
      { name: 'sec', value: seconds % 60 }
    ];

    return units
      .filter(unit => unit.value > 0)
      .slice(0, 3) // Show max 3 units
      .map(unit => `${unit.value}${unit.name.charAt(0)}`)
      .join(' ');
  };

  const isLowTime = remaining < 60 && remaining > 0;
  const isEnded = remaining === 0;

  return (
    <div
      className={`text-lg font-semibold ${
        isLowTime ? 'text-red-400 animate-pulse' : 'text-gray-300'
      }`}
    >
      {formatTime(remaining)}
    </div>
  );
};
