import React, { useEffect, useState } from 'react';
import { getTypeColor } from '../utils/pokemon.util';

interface IProps {
  type: string;
}

const PokemonTypeChip: React.FC<IProps> = ({ type }) => {
  const [chipColor, setChipColor] = useState<string>('');

  useEffect(() => {
    const color = getTypeColor(type);
    setChipColor(color);
  }, [type]);

  return (
    <span
      style={{ backgroundColor: chipColor }}
      className={`rounded px-2 py-1 text-white capitalize`}
    >
      {type}
    </span>
  );
};

export default PokemonTypeChip;
