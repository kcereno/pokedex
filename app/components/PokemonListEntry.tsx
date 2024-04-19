import { Link } from '@remix-run/react';

type PokemonListEntryProps = {
  pokemon: {
    number: number;
    name: string;
    photoUrl: string;
    type: string[];
  };
};

type BgColorType = {
  [key: string]: string;
};

const bgColors: BgColorType = {
  normal: 'bg-gray-300',
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  electric: 'bg-yellow-400',
  grass: 'bg-green-400',
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

function PokemonListEntry({ pokemon }: PokemonListEntryProps) {
  const primaryType = pokemon.type[0];

  const bgColor = bgColors[primaryType];

  return (
    <Link to={`pokemon/${pokemon.name}`}>
      <li
        key={pokemon.number}
        className={`p-4 pb-1 rounded-xl ${bgColor}  text-white max-h-32`}
      >
        <div className="flex justify-between">
          <h2 className="capitalize">{pokemon.name}</h2>
          <p>{`#${pokemon.number}`}</p>
        </div>
        <div className="grid grid-cols-2">
          <ul>Types</ul>

          <img
            src={pokemon.photoUrl}
            alt=""
            className="h-auto"
          />
        </div>
      </li>
    </Link>
  );
}

export default PokemonListEntry;
