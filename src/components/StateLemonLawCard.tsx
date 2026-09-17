import { MapPin, Scale, Award, CheckCircle } from 'lucide-react';
import { StateLemonLaw } from '../legal/types';

interface StateLemonLawCardProps {
  lemonLaw: StateLemonLaw;
}

export const StateLemonLawCard: React.FC<StateLemonLawCardProps> = ({ lemonLaw }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              {lemonLaw.stateName} State Lemon Law & Implied Protections
            </h3>
            <p className="text-xs text-slate-400">
              Statutory reference: <span className="text-teal-400 font-mono">{lemonLaw.statuteRef}</span>
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
          {lemonLaw.stateCode} Presumption Rules
        </span>
      </div>

      {/* Threshold Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Repair Attempts Threshold</div>
          <div className="text-lg font-bold text-slate-100 mt-1">
            {lemonLaw.repairAttemptsThreshold} Attempts
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Same defect uncorrected after {lemonLaw.repairAttemptsThreshold} tries</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Days Out of Service</div>
          <div className="text-lg font-bold text-slate-100 mt-1">
            {lemonLaw.daysOutOfServiceThreshold} Days
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Cumulative days in repair facility</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Safety Defect Threshold</div>
          <div className="text-lg font-bold text-rose-400 mt-1">
            {lemonLaw.safetyDefectAttemptsThreshold} Attempt
          </div>
          <p className="text-[11px] text-slate-400 mt-1">For defects likely to cause death or bodily injury</p>
        </div>

      </div>

      {/* State Specific Overrides & Remedies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="font-semibold text-slate-200 flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Statutory Remedies Available</span>
          </div>
          <ul className="space-y-1 text-slate-300">
            {lemonLaw.remedies.map((rem, i) => (
              <li key={i} className="flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{rem}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="font-semibold text-slate-200 flex items-center space-x-1.5">
            <Scale className="w-4 h-4 text-teal-400" />
            <span>Implied Warranty Status ({lemonLaw.stateCode})</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {lemonLaw.impliedWarrantyWaivable ? (
              `In ${lemonLaw.stateName}, sellers may limit implied warranties if explicitly stated in writing and not prohibited by Magnuson-Moss.`
            ) : (
              <span className="text-emerald-400 font-medium">
                {lemonLaw.stateName} state law STRICTLY PROHIBITS sellers from waiving or disclaiming implied warranties of merchantability on consumer goods! Any "AS IS" clause is void.
              </span>
            )}
          </p>
          {lemonLaw.attorneyFeesShift && (
            <div className="text-[11px] text-teal-400 font-medium pt-1">
              ✓ Prevailing consumers recover 100% of reasonable attorney fees and costs under state law.
            </div>
          )}
        </div>

      </div>

      {/* Special Rules List */}
      {lemonLaw.specialRules && lemonLaw.specialRules.length > 0 && (
        <div className="bg-teal-950/20 border border-teal-500/20 p-4 rounded-xl">
          <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1.5">
            Key {lemonLaw.stateName} Consumer Provisions
          </div>
          <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
            {lemonLaw.specialRules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};
