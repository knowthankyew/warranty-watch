import React from 'react';
import { CheckCircle2, XCircle, Clock, PackageCheck } from 'lucide-react';
import { CoverageItem } from '../legal/types';

interface CoverageBreakdownProps {
  coverageList: CoverageItem[];
  duration: string;
}

export const CoverageBreakdown: React.FC<CoverageBreakdownProps> = ({ coverageList, duration }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
      
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <PackageCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-100">
            What's Actually Covered
          </h3>
          <p className="text-xs text-slate-400">
            Plain-English breakdown of component coverage, labor, and stated exclusions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {coverageList.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border transition-all ${
              item.covered
                ? 'bg-slate-950 border-slate-800 hover:border-emerald-500/40'
                : 'bg-slate-950/50 border-slate-800/80 opacity-75'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                {item.covered ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                )}
                <h4 className="text-sm font-semibold text-slate-200">{item.category}</h4>
              </div>
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                  item.covered
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {item.covered ? 'Covered' : 'Excluded'}
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {item.description}
            </p>

            {(item.duration || duration) && (
              <div className="flex items-center space-x-1 text-[11px] text-teal-400 mt-3 font-medium">
                <Clock className="w-3 h-3" />
                <span>Duration: {item.duration || duration}</span>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
