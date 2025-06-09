

export const getTimeAgo = (timestamp: number) => {
  const now = Date.now();
  const difference = timestamp - now;

  const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

  const times = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const { unit, seconds } of times) {
    const value = Math.round(difference / (seconds * 1000));
    if (Math.abs(value) >= 1) return rtf.format(value, unit as Intl.RelativeTimeFormatUnit);
  }

  return "Hace unos segundos";
};

