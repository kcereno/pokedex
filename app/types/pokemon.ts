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
};

export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonListEntryType = {
  number: number;
  name: string;
  photoUrl: string;
  type: string[];
};

export type PokemonListType = PokemonListEntryType[];

export type EvolutionData = {
  pokemon: {
    name: string;
    url: string;
  };
  item: {
    name: string | null;
    url: string | null;
  };
  min_level: number;
  trigger: string;
};
