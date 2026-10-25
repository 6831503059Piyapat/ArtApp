export const formatDuration = (milliseconds: number) => {
  const totalMinutes = Math.max(0, Math.floor(milliseconds / 60_000));
  const days = Math.floor(totalMinutes / 1_440);
  const hours = Math.floor((totalMinutes % 1_440) / 60);
  const minutes = totalMinutes % 60;

  return [days && `${days}d`, hours && `${hours}h`, !days && `${minutes}m`]
    .filter(Boolean)
    .join(' ');
};

export const getRunTiming = (createdAt: string, endsAt: string, now: number) => {
  const start = Date.parse(createdAt);
  const end = Date.parse(endsAt);

  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    return { elapsed: '--', remaining: 'Invalid schedule', progress: 0 };
  }

  const elapsed = Math.max(0, now - start);
  const duration = end - start;

  return {
    elapsed: formatDuration(elapsed),
    remaining: `${formatDuration(end - now)} remaining of ${formatDuration(duration)} max`,
    progress: Math.min(100, Math.max(0, (elapsed / duration) * 100)),
  };
};
