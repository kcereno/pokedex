import { Link } from '@remix-run/react';
import { PokemonListEntryType } from '~/types/pokemon';
import { transformToThreeDigits } from '~/utils/transformers';

const pokemonTypeColors: {
  [key: string]: string;
} = {
  normal: 'bg-gray-500',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-500',
  grass: 'bg-green-500',
  ice: 'bg-teal-600',
  fighting: 'bg-red-700',
  poison: 'bg-purple-700',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-600',
  psychic: 'bg-pink-500',
  bug: 'bg-green-600',
  rock: 'bg-gray-600',
  ghost: 'bg-indigo-600',
  dragon: 'bg-purple-600',
  dark: 'bg-gray-700',
  steel: 'bg-gray-700',
  fairy: 'bg-pink-600',
};

function PokemonCard({ name, number, photoUrl, type }: PokemonListEntryType) {
  const primaryType: string = type[0];
  const bgColor: string = pokemonTypeColors[primaryType];

  return (
    <li
      key={number}
      className={`p-4  pb-2 border w-full rounded-xl max-h-30 drop-shadow-2xl ${bgColor}`}
    >
      <Link to={name}>
        <div className="flex justify-between">
          <h2 className="capitalize font-bold tracking-tight text-white text-lg">
            {name}
          </h2>
          <p className="text-slate-300 font-bold">{`#${transformToThreeDigits(
            number
          )}`}</p>
        </div>
        <div className="grid grid-cols-2 mt-2">
          <ul className="flex flex-col gap-2">
            {type.map((type) => (
              <li key={type}>
                <span className="bg-slate-400 px-2 py-1 rounded-xl text-xs bg-opacity-50 text-white">
                  {type}
                </span>
              </li>
            ))}
          </ul>
          <img
            src={photoUrl}
            alt=""
          />
        </div>
      </Link>
    </li>
  );
}

export default PokemonCard;
