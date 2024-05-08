import { Colors } from '~/types/general';
import BaseStat from '../BaseStat';
import { PokemonStats } from '~/types/pokemon';

type BaseStatsProps = {
  stats: PokemonStats;
  colors: Colors;
};

function BaseStats({ stats, colors }: BaseStatsProps) {
  return (
    <div>
      {stats.map((stat) => (
        <BaseStat
          key={stat.stat.name}
          label={stat.stat.name}
          value={stat.base_stat}
          colors={colors}
        />
      ))}
    </div>
  );
}

export default BaseStats;
