import { typeColors } from '../constants/pokemon.constants';

export const extractIdFromUrl = (url: string): number | null => {
  const parts = url.split('/');
  const idString = parts[parts.length - 2];
  const id = parseInt(idString);
  return isNaN(id) ? null : id;
};

export const getTypeColor = (type: string): string => {
  return typeColors[type] || '#000000'; // Default to black if type is not found
};
