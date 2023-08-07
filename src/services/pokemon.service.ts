import {
  IGeneration,
  IGenerationWithPokemons,
  IPokemon,
} from '../interface/pokemon.interface';
import { extractIdFromUrl } from '../utils/pokemon.util';
import { pokemonApiInstance } from './axios';

export const getPokemonGenerations = async (): Promise<
  [IGeneration[] | null, any]
> => {
  try {
    const response = await pokemonApiInstance.get(`/generation`);
    return [response.data.results, null];
  } catch (error: any) {
    return [null, error];
  }
};

export const getPokemonsByGeneration = async (
  generationId: number,
): Promise<[any | null, any]> => {
  try {
    const response = await pokemonApiInstance.get(
      `/generation/${generationId}`,
    );
    // const pokemonInGeneration: IPokemon[] = [];
    // response.data?.pokemon_species?.forEach(async (species: any) => {
    //   const [response] = await getPokemonByName(species?.name);
    //   if (response) {
    //     pokemonInGeneration.push(response);
    //   }
    // });
    // const generationData: IGenerationWithPokemons = {
    //   generation: generationId,
    //   pokemons: pokemonInGeneration,
    // };
    const parsedResponse: any = [];
    response.data?.pokemon_species?.forEach(
      (species: { name: string; url: string }) => {
        parsedResponse.push({
          ...species,
          id: extractIdFromUrl(species?.url),
        });
      },
    );
    return [parsedResponse, null];
  } catch (error: any) {
    return [null, error];
  }
};

export const getPokemonByName = async (
  pokemon: string,
): Promise<[any | null, any]> => {
  try {
    const response = await pokemonApiInstance.get(`/pokemon/${pokemon}`);
    return [response.data, null];
  } catch (error: any) {
    return [null, error];
  }
};
