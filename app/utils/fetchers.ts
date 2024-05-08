import {
  EvolutionChainApiResponse,
  PokemonDetailsAPiResponse,
  SpeciesDataApiResponse,
} from '~/types/api';
import {
  EvolutionChainLink,
  PokemonData,
  PokemonListType,
} from '~/types/pokemon';
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
  const details: PokemonDetailsAPiResponse = await fetchPokemonDetails(pokemon);
  const species: SpeciesDataApiResponse = await fetchPokemonSpeciesData(
    pokemon
  );
  const evolutionChainUrl = species.evolution_chain.url;
  console.log('fetchPokemonData ~ evolutionChainUrl:', evolutionChainUrl);

  const pokemonEvolutionApiData: EvolutionChainApiResponse = await fetchFromUrl(
    evolutionChainUrl
  );

  const evolutionChain: EvolutionChainLink[] = extractEvolutionData(
    pokemonEvolutionApiData
  );

  const evolutionDataWithImgUrl: EvolutionChainLink[] = await Promise.all(
    evolutionChain.map(async (chainLink) => {
      const currentPokemonDetails: PokemonDetailsAPiResponse | null = chainLink
        .currentPokemon.name
        ? await fetchPokemonDetails(chainLink.currentPokemon.name)
        : null;

      const nextPokemonDetails: PokemonDetailsAPiResponse | null = chainLink
        .nextPokemon.name
        ? await fetchPokemonDetails(chainLink.nextPokemon.name)
        : null;

      const currentPokemonImgUrl =
        currentPokemonDetails?.sprites.other['official-artwork'].front_default;

      const nextImagePokemonUrl =
        nextPokemonDetails?.sprites.other['official-artwork'].front_default;

      const updatedObj: EvolutionChainLink = {
        currentPokemon: {
          ...chainLink.currentPokemon,
          imgUrl: currentPokemonImgUrl,
        },
        nextPokemon: {
          ...chainLink.nextPokemon,
          imgUrl: nextImagePokemonUrl,
        },
        trigger: {
          ...chainLink.trigger,
        },
      };
      return updatedObj;
    })
  );

  const data: PokemonData = {
    id: details.id,
    name: details.name,
    imgUrl: details.sprites.other['official-artwork'].front_default,
    types: details.types,
    metrics: {
      height: details.height,
      weight: details.weight,
    },
    description: species.flavor_text_entries[0].flavor_text,
    stats: details.stats,
    evolutionChain: evolutionDataWithImgUrl,
  };

  return data;
};
