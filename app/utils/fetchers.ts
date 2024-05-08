import {
  EvolutionChainApiResponse,
  PokemonDetailsAPiResponse,
  SpeciesDataApiResponse,
} from '~/types/api';
import { EvolutionData, PokemonData, PokemonListType } from '~/types/pokemon';
import { extractEvolutionData } from './transformers';

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

export const fetchPokemonDetails = async (pokemon: string) => {
  const api = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  const response = await fetch(api);
  const data: PokemonDetailsAPiResponse = await response.json();

  return data;
};

export const fetchPokemonSpeciesData = async (pokemon: string) => {
  const api = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`;

  const response = await fetch(api);
  const data: SpeciesDataApiResponse = await response.json();

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

export const fetchPokemonData = async (pokemon: string) => {
  const pokemonDetails: PokemonDetailsAPiResponse = await fetchPokemonDetails(
    pokemon
  );
  const pokemonSpecieData: SpeciesDataApiResponse =
    await fetchPokemonSpeciesData(pokemon);
  const evolutionChainUrl = pokemonSpecieData.evolution_chain.url;

  const pokemonEvolutionApiData: EvolutionChainApiResponse = await fetchFromUrl(
    evolutionChainUrl
  );

  const evolutionData: EvolutionData[] = extractEvolutionData(
    pokemonEvolutionApiData
  );

  console.log('fetchPokemonData ~ evolutionData:', evolutionData);
  const evolutionDataWithImgUrl: EvolutionData[] = await Promise.all(
    evolutionData.map(async (entry) => {
      const currentPokemonDetails: PokemonDetailsAPiResponse | null = entry
        .currentPokemon.name
        ? await fetchPokemonDetails(entry.currentPokemon.name)
        : null;

      const nextPokemonDetails: PokemonDetailsAPiResponse | null = entry
        .nextPokemon.name
        ? await fetchPokemonDetails(entry.nextPokemon.name)
        : null;

      const currentPokemonImgUrl =
        currentPokemonDetails?.sprites.other['official-artwork'].front_default;

      const nextImagePokemonUrl =
        nextPokemonDetails?.sprites.other['official-artwork'].front_default;

      const updatedObj: EvolutionData = {
        currentPokemon: {
          ...entry.currentPokemon,
          imgUrl: currentPokemonImgUrl,
        },
        nextPokemon: {
          ...entry.nextPokemon,
          imgUrl: nextImagePokemonUrl,
        },
        trigger: {
          ...entry.trigger,
        },
      };
      return updatedObj;
    })
  );

  const data: PokemonData = {
    id: pokemonDetails.id,
    name: pokemonDetails.name,
    imgUrl: pokemonDetails.sprites.other['official-artwork'].front_default,
    types: pokemonDetails.types,
    metrics: {
      height: pokemonDetails.height,
      weight: pokemonDetails.weight,
    },
    description: pokemonSpecieData.flavor_text_entries[0].flavor_text,
    stats: pokemonDetails.stats,
    evolutionData: evolutionDataWithImgUrl,
  };

  return data;
};
