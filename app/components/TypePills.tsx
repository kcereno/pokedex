import TypePill from './TypePill';
import { PokemonTypes } from '~/types/api';

type TypePillsProps = {
  types: PokemonTypes;
};

function TypePills({ types }: TypePillsProps) {
  return (
    <ul className="flex gap-4 justify-center">
      {types.map(({ type }) => (
        <TypePill
          key={type.name}
          type={type.name}
        />
      ))}
    </ul>
  );
}

export default TypePills;
