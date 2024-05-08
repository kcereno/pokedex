import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { fetchPokemonData } from '~/utils/fetchers';
import invariant from 'tiny-invariant';
import { pokemonTypeColors } from '~/constants/constants';
import { useState } from 'react';
import TypePills from '~/components/TypePills';
import Nav from '~/components/PokemonPage/Nav';
import HeaderAndImage from '~/components/PokemonPage/HeaderAndImage';
import Metrics from '~/components/PokemonPage/Metrics';
import { TabTypes } from '~/types/general';
import Tabs from '~/components/PokemonPage/Tabs';
import BaseStats from '~/components/PokemonPage/BaseStats';

import { PokemonData } from '~/types/pokemon';
import EvolutionChain from '~/components/PokemonPage/EvolutionChain';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.pokemon, 'Wrong ID');

  const data: PokemonData = await fetchPokemonData(params.pokemon);
  return json({ pokemon: data });
};

function IndividualPokemonPage() {
  const [currentTab, setCurrentTab] = useState<TabTypes>('Evolution');
  const { pokemon } = useLoaderData<typeof loader>();

  const colors = {
    text: pokemonTypeColors[pokemon.types[0].type.name].textColor,
    bg: pokemonTypeColors[pokemon.types[0].type.name].bgColor,
  };

  const tabs: TabTypes[] = ['Base Stats', 'Evolution'];

  return (
    <div
      className={`flex flex-col min-h-screen ${colors.bg} `}
      style={{
        backgroundImage: 'url("/public/assets/backgrounds/flowers.png")',
      }}
    >
      <Nav />
      <HeaderAndImage
        id={pokemon.id}
        name={pokemon.name}
        imgUrl={pokemon.imgUrl}
      />

      <div className="p-6 rounded-t-xl bg-white flex-grow">
        <TypePills types={pokemon.types} />

        {/* About */}
        <div className="flex flex-col items-center my-6">
          <h2 className={`font-semibold text-xl tracking-tight ${colors.text}`}>
            About
          </h2>
          <Metrics
            height={pokemon.metrics.height}
            weight={pokemon.metrics.weight}
          />
          <p className="mt-6">{pokemon.description}</p>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          textColor={colors.text}
          currentTab={currentTab}
          updateTab={(tab) => {
            setCurrentTab(tab);
          }}
        />

        {/* Tabs Content */}
        {currentTab === 'Base Stats' ? (
          <BaseStats
            stats={pokemon.stats}
            colors={colors}
          />
        ) : null}

        {currentTab === 'Evolution' ? (
          <EvolutionChain
            evolutionChain={pokemon.evolutionChain}
            colors={colors}
          />
        ) : null}
      </div>
    </div>
  );
}

export default IndividualPokemonPage;
