import { ActionTypes } from '../../enum/pokemon.enum';
import { IPokemonsByGeneration } from '../../interface/pokemon.interface';
import { Action } from './pokemon.action';

export interface PokemonState {
  party: IPokemonsByGeneration[]; // Array of Pokémon names or IDs
}

const initialState: PokemonState = {
  party: [],
};

export const pokemonReducer = (
  state = initialState,
  action: Action,
): PokemonState => {
  switch (action.type) {
    case ActionTypes.ADD_POKEMON:
      if (state.party.length < 6 && !state.party.includes(action.payload)) {
        return {
          ...state,
          party: [...state.party, action.payload],
        };
      }
      return state;

    case ActionTypes.REPLACE_POKEMON:
      const { pokemonId, newPokemon } = action.payload;
      const updatedParty = [...state.party];
      updatedParty.some((party) => pokemonId !== party.id);
      updatedParty.push(newPokemon);
      return {
        ...state,
        party: updatedParty,
      };

    case ActionTypes.REMOVE_POKEMON:
      const filteredParty = state.party.filter(
        (pokemon) => pokemon.id !== action.payload,
      );
      return {
        ...state,
        party: filteredParty,
      };

    default:
      return state;
  }
};
