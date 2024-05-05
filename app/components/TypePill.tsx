import { pokemonTypeColors } from '~/constants/constants';

type TypePillProps = {
  type: string;
};

function TypePill({ type }: TypePillProps) {
  const bgColor = pokemonTypeColors[type].bgColor;

  return (
    <li>
      <span
        className={`font-semibold px-4 py-2 rounded-3xl capitalize text-sm text-white ${bgColor}`}
      >
        {type}
      </span>
    </li>
  );
}

export default TypePill;
