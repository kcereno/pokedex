import React, { useEffect, useRef } from 'react';
import { EvolutionData } from '../../types/pokemon';
import { fetchPokemonDetails } from '~/utils/fetchers';

type SingleEvolutionChainProps = {
  current: EvolutionData;
  next: EvolutionData | null;
};

function SingleEvolutionChain({ current, next }: SingleEvolutionChainProps) {
  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col justify-center items-center">
        <div className="">img</div>
        <div className="">test</div>
      </div>
      <div className="flex justify-center items-center">1</div>
      <div className="flex flex-col justify-center items-center">
        <div className="">img</div>
        <div className="">test</div>
      </div>
    </div>
  );
}

export default SingleEvolutionChain;
