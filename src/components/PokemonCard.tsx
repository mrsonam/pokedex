import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from '@material-tailwind/react';
import { IPokemonsByGeneration } from '../interface/pokemon.interface';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon } from '../store/reducers/pokemon.action';

interface IProps {
  pokemon: IPokemonsByGeneration;
  handleDetailsClick: (id: number) => void;
  setAlertData: ({ open, content }: { open: boolean; content: string }) => void;
}

const PokemonCard: React.FC<IProps> = ({
  pokemon,
  handleDetailsClick,
  setAlertData,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { party } = useSelector((state: any) => state.pokemon);
  const dispatch = useDispatch();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleAddToParty = () => {
    if (party.length < 6) {
      dispatch(addPokemon(pokemon));
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

  return (
    <Card
      className="mt-6 cursor-pointer"
      // onClick={() => handleDetailsClick(pokemon.id)}
    >
      <CardHeader color="blue-gray" className="relative min-h-56">
        {!imageLoaded && (
          <div className="animate-pulse bg-gray-800 w-full h-full" />
        )}
        <img
          src={pokemon?.imgUrl}
          alt={pokemon?.name}
          onLoad={handleImageLoad}
          style={{
            display: imageLoaded ? 'block' : 'none',
          }}
        />
      </CardHeader>
      <CardBody>
        <Typography
          variant="h5"
          color="blue-gray"
          className="capitalize cursor-pointer hover:text-blue-800"
          onClick={() => handleDetailsClick(pokemon.id)}
        >
          {pokemon?.name}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button fullWidth ripple onClick={handleAddToParty}>
          Add to Party
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PokemonCard;
