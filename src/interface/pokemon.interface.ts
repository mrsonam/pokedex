export interface IPokemon {}

export interface IGeneration {
  name: string;
  url: string;
}

export interface IGenerationWithPokemons {
  generation: number;
  pokemons: IPokemon[];
}
