import { Colors } from '~/types/general';
import { EvolutionData } from '../../types/pokemon';

type EvolutionChainProps = {
  data: EvolutionData[];
  colors: Colors;
};

function EvolutionChain({ data, colors }: EvolutionChainProps) {
  console.log('EvolutionChain ~ data:', data);
  return (
    <div>
      <div className={``}>Evolution Chain</div>
    </div>
  );
}

export default EvolutionChain;
