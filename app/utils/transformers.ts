import { Chain, EvolutionChainApiResponse } from '~/types/api';
import { EvolutionData } from '~/types/pokemon';

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

export function extractEvolutionInfo(
  evolutionChain: EvolutionChainApiResponse
): EvolutionData[] {
  const result: EvolutionData[] = [];

  function traverse(chain: Chain): void {
    if (chain.species) {
      const speciesData: EvolutionData = {
        pokemon: {
          name: chain.species.name,
          url: chain.species.url,
        },
        item: {
          name:
            chain.evolution_details.length > 0 &&
            chain.evolution_details[0].item
              ? chain.evolution_details[0].item.name
              : null,
          url:
            chain.evolution_details.length > 0 &&
            chain.evolution_details[0].item
              ? chain.evolution_details[0].item.url
              : null,
        },
        min_level: 0, // Default value
        trigger: '', // Default value
      };
      if (chain.evolution_details && chain.evolution_details.length > 0) {
        chain.evolution_details.forEach((detail) => {
          speciesData.min_level = detail.min_level;
          speciesData.trigger = detail.trigger.name;
        });
      }
      result.push(speciesData);
    }

    if (chain.evolves_to && chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((childChain) => {
        traverse(childChain);
      });
    }
  }

  traverse(evolutionChain.chain);
  return result;
}
