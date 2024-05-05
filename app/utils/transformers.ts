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

// test
export type EvolutionChain = {
  baby_trigger_item: string | null;
  chain: Chain;
  id: number;
};

type Chain = {
  evolution_details: EvolutionDetails[];
  evolves_to: Chain[];
  is_baby: boolean;
  species: Species;
};

type EvolutionDetails = {
  min_level: number;
  trigger: Trigger;
  item: Item | null;
};

type Trigger = {
  name: string;
  url: string;
};

type Item = {
  name: string | null;
  url: string | null;
};

type Species = {
  name: string;
  url: string;
};

export type EvolutionData = {
  pokemon: {
    name: string;
    url: string;
  };
  item: {
    name: string | null;
    url: string | null;
  };
  min_level: number;
  trigger: string;
};

export function extractEvolutionInfo(
  evolutionChain: EvolutionChain
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
