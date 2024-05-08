import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { PokemonListType } from '~/types/pokemon';
import { fetchPokemonList } from '~/utils/fetchers';

import PokemonGrid from '~/components/PokemonGrid';
import Nav from '~/components/Nav';
import Searchbar from '~/components/Searchbar';
import { useState } from 'react';
import { c } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';

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
  const [pokemonList, setPokemonList] = useState(pokemon);

  const filterPokemon = (query: string) => {
    const filteredList = pokemon.filter(
      (entry) =>
        entry.name.startsWith(query) ||
        entry.number.toString().startsWith(query)
    );
    setPokemonList(filteredList);
  };

  // const navigation = useNavigation();

  // const isLoading = navigation.state === 'loading';

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main>
        <Searchbar filterPokemon={filterPokemon} />
        {/* TODO: Add Loading Spinner  */}
        {pokemonList.length > 0 ? (
          <PokemonGrid pokemon={pokemonList} />
        ) : (
          <div className="text-center font-bold py-20 text-xl">
            No pokemon found. Please refine your search
          </div>
        )}
      </main>
    </div>
  );
}
