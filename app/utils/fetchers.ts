import { PokemonListType } from '~/types/pokemon';

export const fetchPokemonList = async () => {
  const api = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  const response = await fetch(api);
  const data = await response.json();

  const { results } = data;

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
