import { SpeciesData } from '~/types/api';
import { PokemonListType } from '~/types/pokemon';

export const fetchPokemonList = async () => {
  const api = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  const response = await fetch(api);
  const { results } = await response.json();

  if (!results) {
    throw new Error('Unable to fetch data');
  }

  const pokemonList: PokemonListType = await Promise.all(
    results.map(
      async (
        entry: {
          name: string;
          url: string;
        },
        index: number
      ) => {
        const response = await fetch(entry.url);
        const data = await response.json();

        if (!data) {
          throw new Error('Unable to fetch data');
        }

        const photoUrl = data.sprites.other['official-artwork'].front_default;
        const type: string[] = data.types.map(
          (entry: {
            type: {
              name: string;
            };
          }) => entry.type.name
        );

        return {
          number: index + 1,
          name: entry.name,
          photoUrl,
          type,
        };
      }
    )
  );

  return pokemonList;
};

export const fetchPokemonData = async (pokemon: string) => {
  const api = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  const response = await fetch(api);
  const data = await response.json();

  return data;
};

export const getPokemonSpeciesData = async (pokemon: string) => {
  const api = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`;

  const response = await fetch(api);
  const data: SpeciesData = await response.json();

  if (!data) {
    throw new Error('No data');
  }
  return data;
};

export const getEvolutionData = async (pokemon: number) => {
  const api = `https://pokeapi.co/api/v2/evolution-chain/${pokemon}/`;

  const response = await fetch(api);
  const data = await response.json();

  if (!data) {
    throw new Error('No data');
  }
  return data;
};

export const fetchFromUrl = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!data) {
    throw new Error('No data');
  }

  return data;
};
