import { RiRulerLine, RiWeightLine } from 'react-icons/ri';
import { decimetersToFeet, hectogramsToPounds } from '~/utils/transformers';

type MetricsProps = {
  weight: number;
  height: number;
};

function Metrics({ weight, height }: MetricsProps) {
  return (
    <div className="grid grid-cols-2 divide-x mt-4 w-4/5">
      <div>
        <div className="flex justify-center items-center gap-3">
          <RiWeightLine className="text-sm" />
          <span>{`${hectogramsToPounds(weight)} lbs`}</span>
        </div>
        <div className="text-center mt-2 text-sm text-slate-600">Weight</div>
      </div>
      <div>
        <div className="flex justify-center items-center gap-3">
          <RiRulerLine className="text-sm" />
          <span>{`${decimetersToFeet(height)} feet`}</span>
        </div>
        <div className="text-center mt-2 text-sm text-slate-600">Height</div>
      </div>
    </div>
  );
}

export default Metrics;
