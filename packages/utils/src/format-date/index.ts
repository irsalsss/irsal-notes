const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) {
    return '';
  }

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  // Format: "5 Dec 2025・2:40 AM WIB"
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const parts = formatter.formatToParts(dateObj);

  const day = parts.find((p) => p.type === 'day')?.value || '';
  const month = parts.find((p) => p.type === 'month')?.value || '';
  const year = parts.find((p) => p.type === 'year')?.value || '';
  const hour = parts.find((p) => p.type === 'hour')?.value || '';
  const minute = parts.find((p) => p.type === 'minute')?.value || '';
  const dayPeriod = parts.find((p) => p.type === 'dayPeriod')?.value || '';

  return `${day} ${month} ${year}・${hour}:${minute} ${dayPeriod} WIB`;
};

export default formatDate;
