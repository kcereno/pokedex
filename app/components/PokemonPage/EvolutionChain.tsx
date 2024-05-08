import { Colors } from '~/types/general';
import { EvolutionChainLink } from '../../types/pokemon';
import EvolutionLink from './EvolutionLink';

type EvolutionChainProps = {
  evolutionChain: EvolutionChainLink[];
  colors: Colors;
};

function EvolutionChain({ evolutionChain, colors }: EvolutionChainProps) {
  return (
    <div>
      {evolutionChain.map((chainLink) => (
        <EvolutionLink
          key={chainLink.currentPokemon.name}
          chainLink={chainLink}
        />
      ))}
    </div>
  );
}

export default EvolutionChain;
