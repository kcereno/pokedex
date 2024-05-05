import { Pokemon } from './pokemon';

export type PokemonAPIResponse = {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
};

export type PokemonTypes = {
  type: {
    name: string;
  };
}[];

export type PokemonStats = {
  base_stat: number;
  stat: { name: string };
}[];

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

export type Chain = {
  evolution_details: EvolutionDetails[];
  evolves_to: Chain[];
  is_baby: boolean;
  species: Species;
};

type EvolutionDetails = {
  min_level: number;
  trigger: Trigger;
  item: Item | null;
};

type Trigger = {
  name: string;
  url: string;
};

type Item = {
  name: string | null;
  url: string | null;
};

type Species = {
  name: string;
  url: string;
};

export type EvolutionChainApiResponse = {
  baby_trigger_item: string | null;
  chain: Chain;
  id: number;
};
