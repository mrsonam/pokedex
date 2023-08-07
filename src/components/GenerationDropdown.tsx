import React, { useEffect, useState } from 'react';
import { IGeneration } from '../interface/pokemon.interface';
import { Select, Option } from '@material-tailwind/react';
import {
  getPokemonGenerations,
  getPokemonsByGeneration,
} from '../services/pokemon.service';
import { useDispatch } from 'react-redux';
import { addPokemonsToGeneration } from '../store/reducers/pokemon.action';

const GenerationDropdown: React.FC = () => {
  const [generations, setGenerations] = useState<IGeneration[]>([]);
  const dispatch = useDispatch();

  const getGenerations = async () => {
    const [response, error] = await getPokemonGenerations();
    if (response) {
      setGenerations(response);
    }
  };

  const handleSelectGeneration = async (generationId: number) => {
    const [response, error] = await getPokemonsByGeneration(generationId);
    // if (response?.pokemons?.length > 0) {
    //   console.log(response);
    //   dispatch(addPokemonsToGeneration(response));
    // }
    if (response) {
      const payload = {
        generation: generationId,
        pokemons: response,
      };
      console.log(payload)
      dispatch(addPokemonsToGeneration(payload));
    }
  };

  useEffect(() => {
    getGenerations();
  }, []);

  return (
    <div>
      <Select label="Select Generation" className="uppercase">
        {generations?.map((option, index) => (
          <Option
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
