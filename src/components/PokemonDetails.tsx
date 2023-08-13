import React, { useState, useEffect } from 'react';
import { getPokemonById } from '../services/pokemon.service';
import {
  Dialog,
  DialogBody,
  Button,
  Typography,
  Spinner,
} from '@material-tailwind/react';
import PokemonTypeChip from './PokemonTypeChip';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon } from '../store/reducers/pokemon.action';
import {
  IPokemon,
  IPokemonsByGeneration,
} from '../interface/pokemon.interface';

interface IProps {
  pokemonId: number;
  open: boolean;
  setOpen: (value: boolean) => void;
  setAlertData: ({ open, content }: { open: boolean; content: string }) => void;
}

const PokemonDetails: React.FC<IProps> = ({
  pokemonId,
  open,
  setOpen,
  setAlertData,
}) => {
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [loading, setLoading] = useState<boolean>(true);

  const { party } = useSelector((state: any) => state.pokemon);
  const dispatch = useDispatch();

  const getPokemon = async () => {
    setLoading(true);
    const [response, _error] = await getPokemonById(pokemonId);
    if (response) {
      setPokemon(response);
    }
    setLoading(false);
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleAddToParty = () => {
    if (party?.length < 6) {
      const payload: IPokemonsByGeneration = {
        name: pokemon?.name as string,
        id: pokemon?.id as number,
        imgUrl: pokemon?.imgUrl as string,
      };
      dispatch(addPokemon(payload));
      setAlertData({
        open: true,
        content: `${pokemon?.name
          ?.charAt(0)
          .toUpperCase()}${pokemon?.name?.slice(
          1,
        )} has been successfully added to your party.`,
      });
    } else {
      setAlertData({
        open: true,
        content:
          'Your party is full! Remove a pokemon before adding a new one.',
      });
    }
  };

  useEffect(() => {
    getPokemon();

    return () => {
      setPokemon(undefined);
    };
  }, [pokemonId]);

  return (
    <Dialog open={open} handler={toggleOpen}>
      <>
        {loading ? (
          <DialogBody
            divider
            className="w-full h-auto flex justify-center items-center"
          >
            <Spinner className="h-12 w-12" />
          </DialogBody>
        ) : (
          <>
            <DialogBody divider>
              <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="md:w-1/2 ">
                  <img
                    src={pokemon?.imgUrl}
                    alt={pokemon?.name}
                    className="w-full max-w-[400px] h-auto mx-auto md:h-full rounded-md object-cover"
                  />
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                  <Typography variant="h4" className="capitalize">
                    {pokemon?.name}
                  </Typography>
                  <div className="flex justify-center md:justify-start gap-2 ">
                    {pokemon?.types?.map((type: any) => (
                      <PokemonTypeChip type={type} />
                    ))}
                  </div>
                  <hr className="my-2" />
                  <p>Base Experience: {pokemon?.base_experience} exp</p>
                  <p>Height: {pokemon?.height} cm</p>
                  <p>Weight: {pokemon?.weight} lbs</p>
                  <Button
                    fullWidth
                    ripple
                    className="my-10"
                    onClick={handleAddToParty}
                  >
                    Add to Party
                  </Button>
                </div>
              </div>
            </DialogBody>
          </>
        )}
      </>
    </Dialog>
  );
};

export default PokemonDetails;
