import { Colors } from '~/types/general';
import { transformToThreeDigits } from '~/utils/transformers';

type BaseStatProps = {
  label: string;
  colors: Colors;
  value: number;
};

const statAbbreviations: {
  [key: string]: string;
} = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SATK',
  'special-defense': 'SDEF',
  speed: 'SPD',
};

function BaseStat({ label, colors, value }: BaseStatProps) {
  const statAbbreviation = statAbbreviations[label];

  const statValue = value > 100 ? 100 : value;

  return (
    <div className="grid grid-cols-[50px,1fr] ">
      <div
        className={`col-span-1 text-right border-r-[1px] pr-4 font-semibold border-black text-sm ${colors.text}`}
      >
        {statAbbreviation}
      </div>
      <div className="col-span-1 pl-4 flex items-center">
        <span className={`text-sm ${colors.text}`}>
          {transformToThreeDigits(value)}
        </span>
        <div className={'w-full bg-gray-300 rounded-full ml-2'}>
          <div
            className={`h-2 ${colors.bg} rounded-full`}
            style={{ width: `${statValue}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default BaseStat;
