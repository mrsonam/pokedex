import {
  IGenerationWithPokemons,
  IPokemon,
} from '../../interface/pokemon.interface';

export const addPokemon = (pokemon: IPokemon) => {
  return {
    type: 'ADD_POKEMON',
    payload: pokemon,
  };
};

export const addPokemonsToGeneration = (payload: IGenerationWithPokemons) => {
  console.log(payload)
  return {
    type: 'ADD_POKEMONS_TO_GENERATION',
    payload: payload,
  };
};
