export const extractIdFromUrl = (url: string): number | null => {
  const parts = url.split('/');
  const idString = parts[parts.length - 2];
  const id = parseInt(idString);
  return isNaN(id) ? null : id;
};
