import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import PokemonList from '~/components/PokemonList';

import Searchbar from '~/components/ui/Searchbar';
import { PokemonListType } from '~/types/pokemon';
import { fetchPokemonList } from '~/utils/fetchers';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async () => {
  const pokemonList: PokemonListType = await fetchPokemonList();

  return json(pokemonList);
};

export default function Index() {
  const pokemonList = useLoaderData<typeof loader>();
  console.log('Index ~ pokemonList:', pokemonList);

  return (
    <div className="flex flex-col h-screen bg-red-500">
      <div className="flex-none py-5">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-6">
          Pokedex
        </h1>
        <Searchbar />
      </div>
      <div className="flex-grow overflow-y-auto mx-2 bg-slate-100 rounded-xl">
        <PokemonList pokemonList={pokemonList} />
      </div>
    </div>
  );
}
