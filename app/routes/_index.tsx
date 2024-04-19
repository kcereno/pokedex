import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import PokemonList from '~/components/PokemonList';
import Searchbar from '~/components/ui/Searchbar';

import { PokemonListEntryType } from '~/types/pokemon';
import { fetchPokemonData, fetchPokemonListData } from '~/utils/fetchers';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async () => {
  try {
    const response = await fetchPokemonData();
    const { data } = await response.json();

    const list: PokemonListEntryType[] = await Promise.all(
      data.map(async ({ name, url }, index) => {
        const data = await fetchPokemonListData(url);

        return {
          number: index + 1,
          name,
          photoUrl: data?.photoUrl,
          type: data?.types,
        };
      })
    );

    return json(list);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default function Index() {
  const pokemon = useLoaderData<typeof loader>() as PokemonListEntryType[];

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <div className="flex-none py-10">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-6">
          Pokedex
        </h1>
        <Searchbar />
      </div>
      <div className=" flex-grow overflow-y-auto p-2">
        <PokemonList pokemon={pokemon} />
      </div>
    </div>
  );
}
