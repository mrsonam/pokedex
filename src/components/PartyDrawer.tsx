import {
  Drawer,
  Typography,
  IconButton,
  Button,
} from '@material-tailwind/react';
import React from 'react';
import { removePokemon } from '../store/reducers/pokemon.action';
import { useDispatch, useSelector } from 'react-redux';
import { IPokemonsByGeneration } from '../interface/pokemon.interface';
import BannerImg from '../assets/images/banner.png';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const PartyDrawer: React.FC<IProps> = ({ open, setOpen }) => {
  const { party } = useSelector((state: any) => state.pokemon);
  const dispatch = useDispatch();

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleRemovePokemon = (id: number) => {
    dispatch(removePokemon(id));
  };

  return (
    <Drawer
      open={open}
      onClose={toggleOpen}
      placement="right"
      className={`p-4 !h-full !max-h-none ${open && '!overflow-hidden'}`}
      overlayProps={{ className: 'h-full' }}
    >
      <img
        src={BannerImg}
        loading="lazy"
        alt="Banner Image"
        className="w-full h-auto max-w-[300px]"
      />
      {/* List of Pokémon */}
      <div className="grid gap-4 my-10">
        {party?.length === 0 && (
          <p className='text-lg font-semibold'>
            You haven't added any Pokémon to this party yet. Go Catch 'Em All!
          </p>
        )}
        {party.map((pokemon: IPokemonsByGeneration) => (
          <div key={pokemon.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={pokemon.imgUrl}
                alt={pokemon.name}
                className="w-12 h-12 rounded-full"
              />
              <Typography color="gray" className="capitalize">
                {pokemon.name}
              </Typography>
            </div>
            <IconButton
              variant="text"
              color="red"
              onClick={() => handleRemovePokemon(pokemon.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default PartyDrawer;
