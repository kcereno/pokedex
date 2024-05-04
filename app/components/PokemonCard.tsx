import { Link } from '@remix-run/react';
import { pokemonTypeColors } from '~/constants/constants';
import { PokemonListEntryType } from '~/types/pokemon';
import { transformToThreeDigits } from '~/utils/transformers';

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
