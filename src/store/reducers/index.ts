// src/store/reducers/index.ts
import { combineReducers } from 'redux';
import pokemonReducer from './pokemon.reducer';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});

export default rootReducer;
