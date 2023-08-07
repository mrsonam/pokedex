import axios from 'axios';

export const pokemonApiInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});


