import { json } from '@remix-run/node';
import { PokemonAPIResponse } from '~/types/api';

export const fetchPokemonData = async () => {
  const api = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  try {
    const response = await fetch(api);
    const data: PokemonAPIResponse = await response.json();

    const { results } = data;

    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon data');
    }

    return json({ data: results });
  } catch (error) {
    let message = 'An error occurred';
    if (error instanceof Error) {
      message = error.message;
    }
    throw new Error(message);
  }
};

export const fetchPokemonListData = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const photoUrl = data.sprites.other['official-artwork'].front_default;
    const types = data.types.map(
      (e: {
        slot: number;
        type: {
          name: string;
          url: string;
        };
      }) => e.type.name
    );

    return {
      photoUrl,
      types,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
