export type PokemonTypes = {
  type: {
    name: string;
  };
}[];

export type PokemonStats = {
  base_stat: number;
  stat: { name: string };
}[];

export type PokemonData = {
  id: number;
  name: string;
  imgUrl: string;
  types: PokemonTypes;
  metrics: {
    height: number;
    weight: number;
  };
  description: string;
  stats: PokemonStats;
  evolutionChain: EvolutionChainLink[];
};
export type Pokemon = {
  name: string | null;
  url?: string | null;
  imgUrl?: string;
};

export type PokemonListEntryType = {
  number: number;
  name: string;
  photoUrl: string;
  type: string[];
};

export type PokemonListType = PokemonListEntryType[];

export type ChainLink = {
  evolves_to: ChainLink[];
  evolution_details: EvolutionDetail[];
  species: PokemonSpecies;
};

type EvolutionDetail = {
  min_level?: number | null;
  trigger?: { name: string };
  item?: {
    name: string;
  };
};

type PokemonSpecies = {
  name: string;
  url: string;
};

export type EvolutionChainLink = {
  currentPokemon: Pokemon;
  nextPokemon: Pokemon;
  trigger: {
    min_level: number | null;
    type: string | null;
    item: string | null;
  };
};
