import BaseStat from '../BaseStat';
import { PokemonStats } from '~/types/api';

type BaseStatsProps = {
  stats: PokemonStats;
  bgColor: string;
};

function BaseStats({ stats, bgColor }: BaseStatsProps) {
  return (
    <div>
      {stats.map((stat) => (
        <BaseStat
          key={stat.stat.name}
          label={stat.stat.name}
          value={stat.base_stat}
          color={bgColor}
        />
      ))}
    </div>
  );
}

export default BaseStats;
