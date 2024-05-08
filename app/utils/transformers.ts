import { EvolutionChainApiResponse } from '~/types/api';
import { ChainLink, EvolutionChainLink } from '~/types/pokemon';

export function transformToThreeDigits(number: number): string {
  return number.toString().padStart(3, '0');
}

export function hectogramsToPounds(hectograms: number): number {
  // 1 hectogram is equal to 0.220462 pounds
  return Math.round(hectograms * 0.220462 * 10) / 10;
}

export function decimetersToFeet(decimeters: number): number {
  // 1 decimeter is equal to 0.328084 feet
  return Math.round(decimeters * 0.328084 * 10) / 10;
}

export function extractEvolutionData(
  evolutionChain: EvolutionChainApiResponse
): EvolutionChainLink[] {
  const speciesArray: EvolutionChainLink[] = [];

  function traverseChain(chain: ChainLink) {
    const nextSpeciesName =
      chain.evolves_to.length > 0 ? chain.evolves_to[0].species.name : null;

    const min_level =
      chain.evolves_to[0]?.evolution_details[0]?.min_level ?? null;

    const triggerType =
      chain.evolves_to[0]?.evolution_details[0]?.trigger?.name ?? null;

    const item = chain.evolves_to[0]?.evolution_details[0]?.item?.name ?? null;

    const data: EvolutionChainLink = {
      currentPokemon: {
        name: chain.species.name,
      },
      nextPokemon: {
        name: nextSpeciesName,
      },
      trigger: { min_level, type: triggerType, item },
    };

    speciesArray.push(data);

    chain.evolves_to.forEach((evolvesTo) => traverseChain(evolvesTo));
  }

  traverseChain(evolutionChain.chain);
  return speciesArray;
}
