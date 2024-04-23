import PokemonListEntry from './PokemonListEntry';
import { PokemonListType } from '~/types/pokemon';

type PokemonListProps = {
  pokemonList: PokemonListType;
};

const PokemonList = ({ pokemonList }: PokemonListProps) => {
  console.log('PokemonList ~ pokemon:', pokemonList);
  return (
    <ul className="grid grid-cols-2 gap-2 p-2">
      {pokemonList.map((pokemon) => (
        <PokemonListEntry
          key={pokemon.number}
          pokemon={pokemon}
        />
      ))}
    </ul>
  );
};

export default PokemonList;
