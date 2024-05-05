import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { fetchPokemonData } from '~/utils/fetchers';
import invariant from 'tiny-invariant';
import { pokemonTypeColors } from '~/constants/constants';
import { useState } from 'react';
import BaseStat from '~/components/BaseStat';
import TypePills from '~/components/TypePills';
import Nav from '~/components/PokemonPage/Nav';
import HeaderAndImage from '~/components/PokemonPage/HeaderAndImage';
import Metrics from '~/components/PokemonPage/Metrics';
import { TabTypes } from '~/types/general';
import Tabs from '~/components/PokemonPage/Tabs';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.pokemon, 'Wrong ID');

  return await fetchPokemonData(params.pokemon);
};

function IndividualPokemonPage() {
  const [currentTab, setCurrentTab] = useState<TabTypes>('Base Stats');
  const { pokemon, specie, evolutionChainData } =
    useLoaderData<typeof loader>();
  console.log(
    'IndividualPokemonPage ~ evolutionChainData:',
    evolutionChainData
  );

  const bgColor = pokemonTypeColors[pokemon.types[0].type.name].bgColor;
  const textColor = pokemonTypeColors[pokemon.types[0].type.name].textColor;
  const aboutText = specie['flavor_text_entries'][4]['flavor_text'];
  const imgUrl = pokemon.sprites.other['official-artwork'].front_default;

  const tabs: TabTypes[] = ['Base Stats', 'Evolution'];

  return (
    <div className={`flex flex-col min-h-screen ${bgColor}`}>
      <Nav />
      <HeaderAndImage
        id={pokemon.id}
        name={pokemon.name}
        imgUrl={imgUrl}
      />

      <div className="p-6 rounded-t-xl bg-white flex-grow">
        <TypePills types={pokemon.types} />
        {/* Abouts */}
        <div className="flex flex-col items-center my-6">
          <h2 className={`font-semibold text-xl tracking-tight ${textColor}`}>
            About
          </h2>
          <Metrics
            height={pokemon.height}
            weight={pokemon.weight}
          />
          <p className="mt-6">{aboutText}</p>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          textColor={textColor}
          updateTab={(tab) => {
            setCurrentTab(tab);
          }}
        />

        {/* Tabs Content */}
        {currentTab === 'Base Stats' ? (
          <div>
            {pokemon.stats.map((stat) => (
              <BaseStat
                key={stat.stat.name}
                label={stat.stat.name}
                value={stat.base_stat}
                color={bgColor}
              />
            ))}
          </div>
        ) : null}

        {currentTab === 'Evolution' ? <div></div> : null}
      </div>
    </div>
  );
}

export default IndividualPokemonPage;
