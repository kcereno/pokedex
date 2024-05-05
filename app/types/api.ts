import { Pokemon } from './pokemon';

export type PokemonAPIResponse = {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
};

export type SpeciesData = {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: {
    flavor_text: string;
  }[];
};

type Species = {
  name: string;
  url: string;
};

type EvolutionDetails = {
  min_level: number;
  trigger: {
    name: string;
  };
}[];

type EvolvesTo = {
  species: Species;
  evolves_to: EvolvesTo;
};

export type EvolutionChainApiResponse = {
  chain: {
    evolution_details: EvolutionDetails;
    species: Species;
    evolves_to: EvolvesTo;
  };
};
