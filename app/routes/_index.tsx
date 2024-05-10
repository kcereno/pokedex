import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PokemonListEntryType, PokemonListType } from '~/types/pokemon';
import { fetchPokemonList } from '~/utils/fetchers';
import PokemonGrid from '~/components/PokemonGrid';
import Search from '~/components/Search';
import Nav from '~/components/Nav';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Pokedex' },
    { name: 'description', content: 'A PokeAPI project' },
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

  const sortPokemon = (sortOption: string) => {
    let sortedList: PokemonListEntryType[] = [];

    if (sortOption === 'name') {
      sortedList = pokemonList.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortOption === 'number') {
      sortedList = pokemonList.sort((a, b) => a.number - b.number);
    }

    setPokemonList([...sortedList]);
  };

  return (
    <>
      <Nav />
      <Search
        filterPokemon={filterPokemon}
        sortPokemon={sortPokemon}
      />
      <main>
        {pokemonList.length > 0 ? (
          <PokemonGrid pokemon={pokemonList} />
        ) : (
          <div className="text-center font-bold py-20 text-xl">
            No pokemon found. Please refine your search
          </div>
        )}
      </main>
    </>
  );
}
