import { EvolutionData } from '../../types/pokemon';

type EvolutionChainProps = {
  data: EvolutionData[];
};

function EvolutionChain({ data }: EvolutionChainProps) {
  console.log('EvolutionChain ~ data:', data);
  return (
    <div>
      <div className="">Evolution Chain</div>
    </div>
  );
}

export default EvolutionChain;
