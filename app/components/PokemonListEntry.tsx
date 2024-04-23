import { Link } from '@remix-run/react';
import { PokemonListEntryType } from '~/types/pokemon';

type PokemonListEntryProps = {
  pokemon: PokemonListEntryType;
};

function PokemonListEntry({ pokemon }: PokemonListEntryProps) {
  const primaryType = pokemon.type[0];
  const typeColor = typeColors[primaryType];

  return (
    <Link
      to={`pokemon/${pokemon.name}`}
      className={`rounded-xl p-4 text-white ${typeColor}`}
    >
      <div className="flex justify-between mb-2 font-bold tracking-tight">
        <h2 className="capitalize text-xl">{pokemon.name}</h2>
        <h3 className="opacity-50">{`#0${pokemon.number}`}</h3>
      </div>
      <div className="grid grid-cols-2">
        <li className="space-y-2">
          {pokemon.type.map((type) => (
            <div key={pokemon.name}>
              <span className="bg-slate-500 opacity-50 px-2 py-1 rounded-xl text-sm">
                {type}
              </span>
            </div>
          ))}
        </li>
        <img
          src={pokemon.photoUrl}
          alt=""
          className="max-h-32"
        />
      </div>
    </Link>
  );
}

export default PokemonListEntry;

const typeColors: {
  [key: string]: string;
} = {
  normal: 'bg-gray-300',
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  electric: 'bg-yellow-400',
  grass: 'bg-teal-400',
  ice: 'bg-blue-200',
  fighting: 'bg-red-600',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-purple-400',
  bug: 'bg-green-400',
  rock: 'bg-gray-600',
  ghost: 'bg-indigo-600',
  dragon: 'bg-purple-900',
  dark: 'bg-gray-800',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-400',
};
