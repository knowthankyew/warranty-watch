import React, { useEffect } from 'react';
import { X, Scale } from 'lucide-react';
import { STATE_LEMON_LAWS } from '../legal/lemonLaws';

interface GroundedSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedState: string;
}

export const GroundedSourcesModal: React.FC<GroundedSourcesModalProps> = ({
  isOpen,
  onClose,
  selectedState,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentState = STATE_LEMON_LAWS[selectedState] || STATE_LEMON_LAWS.CA;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                <span>Grounded Statutory Canon</span>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                  Magnuson-Moss & Lemon Laws
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Official federal statutes and state warranty protections enforced by WarrantyWatch
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Active State Source */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                  {currentState.stateCode} ACTIVE JURISDICTION
                </span>
                <h3 className="font-bold text-slate-100">{currentState.stateName} Warranty Protections</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                Repair Threshold: {currentState.repairAttemptsThreshold} attempts
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400">{currentState.statuteRef}</p>
            <div className="text-xs text-slate-300 space-y-1.5 pt-1 border-t border-emerald-500/20">
              {currentState.specialRules.map((rule, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Federal Authorities */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Federal Statutory Baselines (Magnuson-Moss Warranty Act)
            </h3>

            {/* Anti-Tampering & Anti-Tying */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-200">
                  Anti-Tie-In & "Void If Seal Broken" Ban
                </h4>
                <span className="text-xs font-mono text-teal-400">15 U.S.C. § 2302(c)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Under federal law (15 U.S.C. § 2302(c)), manufacturers cannot condition warranty coverage on keeping a sticker, seal, or label intact, nor can they mandate the use of brand-name parts or authorized repair shops unless the parts or services are provided completely free of charge under warranty. The FTC has confirmed that "Warranty Void If Broken" stickers are deceptive and illegal.
              </p>
            </div>

            {/* Implied Warranty Disclaimers */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-200">
                  Prohibition on Disclaiming Implied Warranties
                </h4>
                <span className="text-xs font-mono text-teal-400">15 U.S.C. § 2308(a)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                If a seller or manufacturer offers a written warranty, federal law strictly prohibits them from disclaiming implied warranties of merchantability and fitness. Any "AS IS" or disclaimer language in a written warranty is null, void, and unenforceable.
              </p>
            </div>

            {/* Registration Card Rule */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-200">
                  Mandatory Warranty Registration Card Prohibition
                </h4>
                <span className="text-xs font-mono text-teal-400">16 C.F.R. § 700.7</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                FTC rules prohibit warrantors from conditioning warranty coverage on the consumer returning a warranty registration card or registering online, unless designated as a Full Warranty with explicit disclosure. Failure to register does not forfeit warranty rights.
              </p>
            </div>

            {/* Attorney Fees */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-200">
                  Consumer Remedies & Mandatory Attorney Fee Shifting
                </h4>
                <span className="text-xs font-mono text-teal-400">15 U.S.C. § 2310(d)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Consumers who prevail in an action for breach of warranty or failure to comply with Magnuson-Moss are entitled to recover the cost of the suit, including reasonable attorney's fees, shifting financial risk onto non-compliant manufacturers.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
