import PokemonCard from './PokemonCard';
import { twMerge } from 'tailwind-merge';
import { PokemonListEntryType } from '~/types/pokemon';

type PokemonGridProps = {
  className?: string;
  pokemon: PokemonListEntryType[];
};

function PokemonGrid({ className = '', pokemon }: PokemonGridProps) {
  return (
    <div className="md:h-[700px] overflow-auto">
      <ul className={twMerge('grid grid-cols-2 p-4 gap-2', className)}>
        {pokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.number}
            {...pokemon}
          />
        ))}
      </ul>
    </div>
  );
}

export default PokemonGrid;
