export interface IPokemon {
  name: string;
  imgUrl: string;
  id: number;
  types: string[];
  base_experience: string;
  height: number;
  weight: number;
}

export interface IGeneration {
  name: string;
  url: string;
}

export interface IPokemonsByGeneration {
  name: string;
  id: number;
  imgUrl: string;
}
