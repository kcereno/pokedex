import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react';

import { PokemonListType } from '~/types/pokemon';
import { fetchPokemonList } from '~/utils/fetchers';

import PokemonGrid from '~/components/PokemonGrid';
import Nav from '~/components/Nav';
import Searchbar from '~/components/Searchbar';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async () => {
  const pokemon: PokemonListType = await fetchPokemonList();

  return json({ pokemon });
};

export default function Index() {
  const { pokemon } = useLoaderData<typeof loader>();
  // const navigation = useNavigation();

  // const isLoading = navigation.state === 'loading';

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main>
        <Searchbar className="pt-4" />
        {/* TODO: Add Loading Spinner  */}
        <PokemonGrid
          className=""
          pokemon={pokemon}
        />
      </main>
    </div>
  );
}
