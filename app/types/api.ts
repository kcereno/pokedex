import { ChainLink, Pokemon, PokemonStats, PokemonTypes } from './pokemon';

export type PokemonAPIResponse = {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
};

export type PokemonDetailsAPiResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: PokemonStats;
  types: PokemonTypes;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
};

export type SpeciesDataApiResponse = {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: {
    flavor_text: string;
  }[];
};

export type EvolutionChainApiResponse = {
  chain: ChainLink;
};
