import PokemonCard from './PokemonCard';
import { twMerge } from 'tailwind-merge';
import { PokemonListEntryType } from '~/types/pokemon';

type PokemonGridProps = {
  className?: string;
  pokemon: PokemonListEntryType[];
};

function PokemonGrid({ className = '', pokemon }: PokemonGridProps) {
  return (
    <ul className={twMerge('grid grid-cols-2 p-4 gap-2', className)}>
      {pokemon.map((pokemon) => (
        <PokemonCard
          key={pokemon.number}
          {...pokemon}
        />
      ))}
    </ul>
  );
}

export default PokemonGrid;
