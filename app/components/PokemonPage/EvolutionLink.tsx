import { Link } from '@remix-run/react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Colors } from '~/types/general';
import { EvolutionChainLink } from '~/types/pokemon';
import { removeHyphens } from '~/utils/transformers';

type EvolutionLinkProps = {
  chainLink: EvolutionChainLink;
  colors: Colors;
};

function EvolutionLink({
  chainLink: { currentPokemon, nextPokemon, trigger },
  colors,
}: EvolutionLinkProps) {
  const item = trigger.item ? removeHyphens(trigger.item) : null;

  const triggerText =
    trigger.type === 'level-up' ? `Lvl ${trigger.min_level}` : `${item}`;

  return (
    <div className={`grid grid-cols-3 font-semibold ${colors.text} py-4`}>
      <div className="flex flex-col items-center justify-center">
        <Link to={`/${currentPokemon.name}`}>
          <img
            src={currentPokemon.imgUrl}
            alt=""
            className="max-h-24"
          />
          <span className="capitalize">{currentPokemon.name}</span>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <FaLongArrowAltRight className="size-10 text-slate-600" />
        <span className="text-transform: capitalize">{triggerText}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Link to={`/${nextPokemon.name}`}>
          <img
            src={nextPokemon.imgUrl}
            alt=""
            className="max-h-24"
          />
          <span className="capitalize">{nextPokemon.name}</span>
        </Link>
      </div>
    </div>
  );
}

export default EvolutionLink;
