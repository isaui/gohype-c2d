export const formatTime = (time: string) => {
  const date = new Date(time);

  return `${String(date.getUTCHours()).padStart(2, '0')}:${String(
    date.getUTCMinutes(),
  ).padStart(2, '0')} WIB`;
};
