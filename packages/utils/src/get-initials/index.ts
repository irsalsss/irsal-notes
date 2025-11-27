const getInitials = (name?: string) => {
  if (name && name.length > 0) {
    const parts = name.split(' ').filter((p) => p && p.length > 0);
    if (parts.length >= 2) {
      const first = parts[0];
      const second = parts[1];
      if (first && second && first[0] && second[0]) {
        return `${first[0]}${second[0]}`.toUpperCase();
      }
    }
    if (parts.length > 0 && parts[0]) {
      const first = parts[0];
      if (first.length > 0 && first[0]) {
        return first[0].toUpperCase();
      }
    }
  }
  return null;
};

export default getInitials;

