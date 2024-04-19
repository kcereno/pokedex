import PokemonListEntry from './PokemonListEntry';
import { PokemonListEntryType } from '~/types/pokemon';

type PokemonListProps = {
  pokemon: PokemonListEntryType[];
};

const PokemonList = ({ pokemon }: PokemonListProps) => {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {pokemon.map((pokemon) => (
        <PokemonListEntry
          key={pokemon.number}
          pokemon={pokemon}
        />
      ))}
    </ul>
  );
};

export default PokemonList;
