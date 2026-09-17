import React from 'react';
import { ShieldCheck, AlertTriangle, Scale, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { LegalAnalysisResult } from '../legal/types';

interface ExecutiveSummaryProps {
  result: LegalAnalysisResult;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ result }) => {
  const { protectionScore, summary, warrantyType, extractedDuration, redFlags, magnusonMossCompliance, lemonLawInfo } = result;

  let scoreColor = 'from-emerald-500 to-teal-400 text-emerald-400';
  let scoreBadge = 'High Consumer Protection';
  if (protectionScore < 50) {
    scoreColor = 'from-red-500 to-rose-400 text-red-400';
    scoreBadge = 'High Risk / Severe Red Flags';
  } else if (protectionScore < 80) {
    scoreColor = 'from-amber-500 to-yellow-400 text-amber-400';
    scoreBadge = 'Moderate Protection / Caution';
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        
        {/* Protection Score Donut / Gauge */}
        <div className="flex items-center space-x-5">
          <div className="relative flex items-center justify-center" role="meter" aria-valuenow={protectionScore} aria-valuemin={0} aria-valuemax={100} aria-label="Consumer Protection Rating Score">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="38"
                stroke="currentColor"
                strokeWidth="7"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r="38"
                stroke="currentColor"
                strokeWidth="7"
                strokeDasharray={238.76}
                strokeDashoffset={238.76 - (238.76 * protectionScore) / 100}
                strokeLinecap="round"
                className={`transition-all duration-1000 ${scoreColor.split(' ')[2]}`}
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className={`text-2xl font-black ${scoreColor.split(' ')[2]}`}>
                {protectionScore}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Score</span>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 ${scoreColor.split(' ')[2]}`}>
                {scoreBadge}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-100 mt-1">
              Consumer Protection Rating
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Based on Magnuson-Moss Act standards & {lemonLawInfo.stateName} Lemon Law
            </p>
          </div>
        </div>

        {/* Quick Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
          
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400">
              <Scale className="w-3.5 h-3.5 text-teal-400" />
              <span>Designation</span>
            </div>
            <div className="text-sm font-bold text-slate-200 mt-1">{warrantyType}</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Term Duration</span>
            </div>
            <div className="text-sm font-bold text-slate-200 mt-1">{extractedDuration}</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl col-span-2 sm:col-span-1">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Red Flags</span>
            </div>
            <div className={`text-sm font-bold mt-1 ${redFlags.length > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {redFlags.length} Identified
            </div>
          </div>

        </div>

      </div>

      {/* Summary Text Box */}
      <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>Executive Legal Rundown</span>
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {summary}
        </p>
      </div>

      {/* Statutory Compliance Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
          {magnusonMossCompliance.hasIllegalVoidIf ? (
            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          )}
          <div>
            <div className="text-xs font-semibold text-slate-200">15 U.S.C. § 2302(c) Seal Ban</div>
            <div className="text-[11px] text-slate-400">
              {magnusonMossCompliance.hasIllegalVoidIf ? 'Illegal Void Sticker Clause Found' : 'No Tampering Seal Violations'}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
          {magnusonMossCompliance.hasIllegalTieIn ? (
            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          )}
          <div>
            <div className="text-xs font-semibold text-slate-200">Tie-In Repair Ban</div>
            <div className="text-[11px] text-slate-400">
              {magnusonMossCompliance.hasIllegalTieIn ? 'Illegal 3rd Party Repair Ban' : 'No Mandatory Service Restrictions'}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
          {magnusonMossCompliance.hasImpliedDisclaimer ? (
            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          )}
          <div>
            <div className="text-xs font-semibold text-slate-200">15 U.S.C. § 2308 Implied Rule</div>
            <div className="text-[11px] text-slate-400">
              {magnusonMossCompliance.hasImpliedDisclaimer ? 'Illegal AS-IS / Disclaimer' : 'Implied Warranties Intact'}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
