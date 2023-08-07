import { IPokemon } from '../../interface/pokemon.interface';

interface Generation {
  generation: number;
  pokemons: IPokemon[];
}

interface GenerationState {
  generations: Generation[];
}

const initialState: GenerationState = {
  generations: [],
};

const generationReducer = (
  state = initialState,
  action: any,
): GenerationState => {
  switch (action.type) {
    case 'ADD_POKEMONS_TO_GENERATION':
      const { generation, pokemons } = action.payload;
      const existingGenerationIndex = state.generations.findIndex(
        (gen) => gen.generation === generation,
      );

      if (existingGenerationIndex !== -1) {
        const updatedGenerations = state.generations.map((gen, index) => {
          if (index === existingGenerationIndex) {
            return {
              ...gen,
              pokemons,
            };
          }
          return gen;
        });
        return {
          ...state,
          generations: updatedGenerations,
        };
      } else {
        return {
          ...state,
          generations: [...state.generations, { generation, pokemons }],
        };
      }
    default:
      return state;
  }
};

export default generationReducer;
