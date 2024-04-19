import { Pokemon } from './pokemon';

export type PokemonAPIResponse = {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
};
