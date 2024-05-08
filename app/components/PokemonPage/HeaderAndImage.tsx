import { Link } from '@remix-run/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { pokemonIndex } from '~/data/pokemon';
('~/types/pokemon');
import { transformToThreeDigits } from '~/utils/transformers';

type HeaderAndImageProps = {
  name: string;
  id: number;
  imgUrl: string;
};

function HeaderAndImage({ name, id, imgUrl }: HeaderAndImageProps) {
  const nextPokemonIndex = (id + 1).toString();
  const previousPokemonIndex = (id - 1).toString();

  const nextPokemon = pokemonIndex[nextPokemonIndex];
  const previousPokemon = pokemonIndex[previousPokemonIndex];

  return (
    <div className="px-6 mt-2">
      {/* Name and Number */}
      <div className="flex justify-between items-center text-white font-bold ">
        <span className="text-4xl capitalize tracking-tight">{name}</span>
        <span className="text-xl">{`#${transformToThreeDigits(id)}`}</span>
      </div>
      {/* Image */}
      <div className="grid grid-cols-[40px,1fr,40px]">
        {previousPokemon ? (
          <Link
            to={`/${previousPokemon}`}
            className="flex self-center"
          >
            <FaArrowLeft className="size-8 text-white" />
          </Link>
        ) : (
          <div></div>
        )}
        <img
          className=" mx-auto"
          src={imgUrl}
          alt={name}
        />
        {nextPokemon ? (
          <Link
            to={`/${nextPokemon}`}
            className="flex self-center"
          >
            <FaArrowRight className=" size-8 text-white" />
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default HeaderAndImage;
