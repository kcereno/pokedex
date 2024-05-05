import { RiRulerLine, RiWeightLine } from 'react-icons/ri';

function Metrics() {
  return (
    <div className="grid grid-cols-2 divide-x  mt-4 w-4/5">
      <div className="">
        <div className="flex justify-center items-center gap-3">
          <RiWeightLine className="text-sm" />
          <span>5.6 kg</span>
        </div>
        <div className="text-center mt-2 text-sm text-slate-600">Weight</div>
      </div>
      <div className="">
        <div className="flex justify-center items-center gap-3">
          <RiRulerLine className="text-sm" />
          <span>5.6 kg</span>
        </div>
        <div className="text-center mt-2 text-sm text-slate-600">Height</div>
      </div>
    </div>
  );
}

export default Metrics;
