import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Link, NavLink, Outlet, useLoaderData } from '@remix-run/react';
import { fetchPokemonData } from '~/utils/fetchers';
import invariant from 'tiny-invariant';
import { FaArrowLeft } from 'react-icons/fa';
import { transformToThreeDigits } from '~/utils/transformers';
import { pokemonTypeColors } from '~/constants/constants';

type Pokemon = {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.pokemon, 'Wrong ID');

  const pokemon: Pokemon = await fetchPokemonData(params.pokemon);
  return json({ pokemon });
};

function IndividualPokemonPage() {
  const { pokemon } = useLoaderData<typeof loader>();
  console.log('IndividualPokemonPage ~ data:', pokemon.types);

  const bgColor = pokemonTypeColors[pokemon.types[0].type.name];

  return (
    <div className={`flex flex-col min-h-screen ${bgColor}`}>
      <div>
        <div className="mx-6">
          <div className="mt-6">
            <FaArrowLeft className="text-2xl text-white" />
          </div>
          {/* Name and Number */}
          <div className="flex justify-between mt-6 items-center text-white font-bold ">
            <h1 className="text-4xl capitalize tracking-tight">
              {pokemon.name}
            </h1>
            <div className="text-xl">{`#${transformToThreeDigits(
              pokemon.id
            )}`}</div>
          </div>
          {/* Type */}
          <ul className="flex gap-2 mt-2">
            {pokemon.types.map(({ type }) => (
              <li key={type.name}>
                <span className="bg-slate-400 px-4 py-2 rounded-xl text-xs bg-opacity-50 capitalize">
                  {type.name}
                </span>
              </li>
            ))}
          </ul>
          {/* Image */}
          <img
            className="max-h-60 mx-auto"
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
          />
        </div>
      </div>

      <div className="p-4 rounded-t-xl bg-white flex-grow">
        <nav className="flex justify-between">
          <NavLink to="about">About</NavLink>
          <div>Base Stats</div>
          <div>Evolution</div>
          <div>Moves</div>
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default IndividualPokemonPage;
