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

export function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const lowercaseFirstLetter = (str: string): string => {
  if (str.length === 0) {
    return str; // If the string is empty, return it as is
  }
  return str.charAt(0).toLowerCase() + str.slice(1); // Lowercase the first letter and concatenate the rest of the string
};

export function extractEvolutionData(
  evolutionChain: EvolutionChainApiResponse
): EvolutionChainLink[] {
  const isEevee = evolutionChain.chain.species.name === 'eevee';
  const speciesArray: EvolutionChainLink[] = [];

  function processEeveeEvolution(chain: ChainLink) {
    const evolutions = ['flareon', 'jolteon', 'vaporeon'];

    chain.evolves_to.forEach((entry) => {
      const pokemonName = entry.species.name;
      if (evolutions.includes(pokemonName)) {
        const triggerType = entry.evolution_details[0].trigger?.name ?? null;
        const item = entry.evolution_details[0].item?.name ?? null;

        const data: EvolutionChainLink = {
          currentPokemon: {
            name: 'eevee',
          },
          nextPokemon: {
            name: entry.species.name,
          },
          trigger: { min_level: null, type: triggerType, item },
        };
        speciesArray.push(data);
      }
    });
  }

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

  if (!isEevee) {
    traverseChain(evolutionChain.chain);
  } else {
    processEeveeEvolution(evolutionChain.chain);
  }

  return speciesArray;
}

export const removeHyphens = (string: string) => {
  return string.replace(/-/g, ' ');
};
