import { ActionTypes } from '../../enum/pokemon.enum';
import { IPokemonsByGeneration } from '../../interface/pokemon.interface';

interface AddPokemonAction {
  type: ActionTypes.ADD_POKEMON;
  payload: IPokemonsByGeneration; // Pokémon object
}

interface ReplacePokemonAction {
  type: ActionTypes.REPLACE_POKEMON;
  payload: {
    pokemonId: number; // ID of the Pokémon to replace
    newPokemon: IPokemonsByGeneration; // Pokémon object
  };
}

interface RemovePokemonAction {
  type: ActionTypes.REMOVE_POKEMON;
  payload: number;
}

export type Action =
  | AddPokemonAction
  | ReplacePokemonAction
  | RemovePokemonAction;

export const addPokemon = (
  pokemon: IPokemonsByGeneration,
): AddPokemonAction => ({
  type: ActionTypes.ADD_POKEMON,
  payload: pokemon,
});

export const replacePokemon = (
  pokemonId: number,
  newPokemon: IPokemonsByGeneration,
): ReplacePokemonAction => ({
  type: ActionTypes.REPLACE_POKEMON,
  payload: { pokemonId, newPokemon },
});

export const removePokemon = (id: number): RemovePokemonAction => ({
  type: ActionTypes.REMOVE_POKEMON,
  payload: id,
});
