import { EvolutionData } from '../../types/pokemon';

type EvolutionChainProps = {
  data: EvolutionData[];
};

function EvolutionChain({ data }: EvolutionChainProps) {
  console.log('EvolutionChain ~ data:', data);
  return (
    <div>
      <div className="grid grid-cols-3">
        <div className="flex flex-col justify-center items-center">
          <div className="">img</div>
          <div className="">{data[0].pokemon.name}</div>
        </div>
        <div className="flex justify-center items-center">1</div>
        <div className="flex flex-col justify-center items-center">
          <div className="">img</div>
          <div className="">{data[1].pokemon.name}</div>
        </div>
      </div>
    </div>
  );
}

export default EvolutionChain;
