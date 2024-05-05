import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import {
  fetchFromUrl,
  fetchPokemonData,
  getPokemonSpeciesData,
} from '~/utils/fetchers';
import invariant from 'tiny-invariant';
import { FaArrowLeft } from 'react-icons/fa';
import {
  decimetersToFeet,
  extractEvolutionInfo,
  hectogramsToPounds,
  transformToThreeDigits,
} from '~/utils/transformers';
import { pokemonTypeColors } from '~/constants/constants';

import TypePill from '~/components/TypePill';

import { useState } from 'react';
import { RiRulerLine, RiWeightLine } from 'react-icons/ri';
import BaseStat from '~/components/BaseStat';
import {
  EvolutionChainApiResponse,
  PokemonDetailsAPiResponse,
  SpeciesDataApiResponse,
} from '~/types/api';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.pokemon, 'Wrong ID');
  const pokemon: PokemonDetailsAPiResponse = await fetchPokemonData(
    params.pokemon
  );
  const specie: SpeciesDataApiResponse = await getPokemonSpeciesData(
    params.pokemon
  );
  const evolutionChainUrl = specie.evolution_chain.url;

  const evolutionChainData: EvolutionChainApiResponse = await fetchFromUrl(
    evolutionChainUrl
  );
  const tranformedData = extractEvolutionInfo(evolutionChainData);

  return json({
    pokemon,
    specie,
    evolutionChainData: tranformedData,
  });
};

function IndividualPokemonPage() {
  const [currentTab, setCurrentTab] = useState<'Base Stats' | 'Evolution'>(
    'Base Stats'
  );
  const { pokemon, specie, evolutionChainData } =
    useLoaderData<typeof loader>();
  console.log(
    'IndividualPokemonPage ~ evolutionChainData:',
    evolutionChainData
  );

  const bgColor = pokemonTypeColors[pokemon.types[0].type.name].bgColor;
  const textColor = pokemonTypeColors[pokemon.types[0].type.name].textColor;
  const aboutText = specie['flavor_text_entries'][4]['flavor_text'];

  const tabs: ('Base Stats' | 'Evolution')[] = ['Base Stats', 'Evolution'];

  return (
    <div className={`flex flex-col min-h-screen ${bgColor}`}>
      <div className="flex pt-6 px-6">
        <Link to={'/'}>
          <FaArrowLeft className="text-xl text-white" />
        </Link>
      </div>

      <div className="px-6 mt-2">
        {/* Name and Number */}
        <div className="flex justify-between  items-center text-white font-bold ">
          <span className="text-4xl capitalize tracking-tight">
            {pokemon.name}
          </span>
          <span className="text-xl">{`#${transformToThreeDigits(
            pokemon.id
          )}`}</span>
        </div>

        {/* Image */}
        <img
          className="w-3/5 mx-auto"
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
        />
      </div>

      <div className="p-6 rounded-t-xl bg-white flex-grow">
        {/* Type */}
        <ul className="flex gap-4 justify-center">
          {pokemon.types.map(({ type }) => (
            <TypePill
              key={type.name}
              type={type.name}
            />
          ))}
        </ul>
        {/* About */}
        <div className="flex flex-col items-center my-6">
          <h2 className={`font-semibold text-xl tracking-tight ${textColor}`}>
            About
          </h2>
          <div className="grid grid-cols-2 divide-x  mt-4 w-4/5">
            <div>
              <div className="flex justify-center items-center gap-3">
                <RiWeightLine className="text-sm" />
                <span>{`${hectogramsToPounds(pokemon.weight)} lbs`}</span>
              </div>
              <div className="text-center mt-2 text-sm text-slate-600">
                Weight
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center gap-3">
                <RiRulerLine className="text-sm" />
                <span>{`${decimetersToFeet(pokemon.height)} feet`}</span>
              </div>
              <div className="text-center mt-2 text-sm text-slate-600">
                Height
              </div>
            </div>
          </div>
          <p className="mt-6">{aboutText}</p>
        </div>

        {/* Tabs */}
        <ul className="flex justify-center gap-10 text-gray-400 border-b-2 pb-4 my-6">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                className={
                  currentTab === tab ? `font-semibold ${textColor}` : ''
                }
                onClick={() => {
                  setCurrentTab(tab);
                }}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

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
