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

export type PokemonDetails = {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
};
