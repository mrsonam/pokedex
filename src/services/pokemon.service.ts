import { IGeneration, IPokemon } from '../interface/pokemon.interface';
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
    const parsedResponse: any = [];
    response.data?.pokemon_species?.forEach(
      (species: { name: string; url: string }) => {
        parsedResponse.push({
          name: species.name,
          id: extractIdFromUrl(species?.url),
          imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${extractIdFromUrl(
            species?.url,
          )}.png`,
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

export const getPokemonById = async (
  pokemonId: number,
): Promise<[any | null, any]> => {
  try {
    const response = await pokemonApiInstance.get(`/pokemon/${pokemonId}`);
    const data = response.data;
    const result: IPokemon = {
      name: data.name,
      imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      id: data.id,
      types: data.types.map((type: any) => type.type.name),
      base_experience: data.base_experience,
      height: data.height,
      weight: data.weight,
    };
    return [result, null];
  } catch (error: any) {
    return [null, error];
  }
};
