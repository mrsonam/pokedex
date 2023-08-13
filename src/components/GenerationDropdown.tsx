import React, { useEffect, useState } from 'react';
import { IGeneration } from '../interface/pokemon.interface';
import { Select, Option } from '@material-tailwind/react';
import { getPokemonGenerations } from '../services/pokemon.service';

interface IProps {
  handleSelectGeneration: (generationId: number) => void;
}

const GenerationDropdown: React.FC<IProps> = ({ handleSelectGeneration }) => {
  const [generations, setGenerations] = useState<IGeneration[]>([]);

  const getGenerations = async () => {
    const [response, error] = await getPokemonGenerations();
    if (response) {
      setGenerations(response);
    }
  };

  useEffect(() => {
    getGenerations();
  }, []);

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 max-w-[500px]">
      <Select label="Select Generation" className="uppercase" size="lg">
        {generations?.map((option, index) => (
          <Option
            key={index}
            className="uppercase text-left"
            onClick={() => handleSelectGeneration(index + 1)}
          >
            {option?.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default GenerationDropdown;
