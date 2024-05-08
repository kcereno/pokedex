import { Colors } from '~/types/general';
import { EvolutionChainLink } from '../../types/pokemon';
import EvolutionLink from './EvolutionLink';

type EvolutionChainProps = {
  evolutionChain: EvolutionChainLink[];
  colors: Colors;
};

function EvolutionChain({ evolutionChain, colors }: EvolutionChainProps) {
  const trimmedChain = evolutionChain.filter(
    (chainLink) => chainLink.nextPokemon.name
  );

  return (
    <>
      {trimmedChain.length > 0 ? (
        <div className="divide-dashed divide-y">
          {trimmedChain.map((chainLink) => (
            <EvolutionLink
              key={chainLink.nextPokemon.name}
              chainLink={chainLink}
              colors={colors}
            />
          ))}
        </div>
      ) : (
        <div className="text-center font-semibold py-10">
          Pokemon has no evolved forms
        </div>
      )}
    </>
  );
}

export default EvolutionChain;
