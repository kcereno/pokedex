import { transformToThreeDigits } from '~/utils/transformers';

type BaseStatProps = {
  label: string;
  color: string;
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

function BaseStat({ label, color, value }: BaseStatProps) {
  const statAbbreviation = statAbbreviations[label];

  return (
    <div className="grid grid-cols-[50px,1fr] ">
      <div
        className={`col-span-1 text-right border-r-[1px] pr-4 border-black text-sm text-${color}`}
      >
        {statAbbreviation}
      </div>
      <div className="col-span-1 pl-4 flex items-center">
        <span className={`text-sm text-${color}`}>
          {transformToThreeDigits(value)}
        </span>
        <div className={'w-full bg-gray-300 rounded-full ml-2'}>
          <div
            className={`h-2 ${color} rounded-full`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default BaseStat;
