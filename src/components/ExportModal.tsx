import React, { useState } from 'react';
import { Download, FileText, Check, Printer, X } from 'lucide-react';
import { LegalAnalysisResult } from '../legal/types';

interface ExportModalProps {
  analysis: LegalAnalysisResult;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ analysis, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  const generateMarkdownReport = (): string => {
    return `# WarrantyWatch Legal Analysis Report

**Date of Analysis**: ${new Date().toLocaleDateString()}
**Product Category**: ${analysis.productType}
**State Jurisdiction**: ${analysis.lemonLawInfo.stateName} (${analysis.stateCode})
**Consumer Protection Score**: ${analysis.protectionScore} / 100
**Warranty Designation**: ${analysis.warrantyType}
**Stated Term Duration**: ${analysis.extractedDuration}

---

## Executive Summary
${analysis.summary}

---

## Red Flags & Unenforceable Contract Clauses (${analysis.redFlags.length})
${analysis.redFlags.length === 0 ? '_No obvious statutory violations detected._' : ''}
${analysis.redFlags.map((rf, idx) => `
### ${idx + 1}. ${rf.title}
- **Quoted Clause**: "${rf.quote}"
- **Statutory Authority**: ${rf.statute}
- **Legal Status**: ${rf.enforceability}
- **Why It Fails**: ${rf.explanation}
- **Consumer Action Strategy**: ${rf.consumerAdvice}
`).join('\n')}

---

## State Lemon Law & Implied Protections (${analysis.lemonLawInfo.stateName})
- **Statute Reference**: ${analysis.lemonLawInfo.statuteRef}
- **Repair Attempts Threshold**: ${analysis.lemonLawInfo.repairAttemptsThreshold} Attempts
- **Days Out of Service**: ${analysis.lemonLawInfo.daysOutOfServiceThreshold} Days
- **Implied Warranty Status**: ${analysis.lemonLawInfo.impliedWarrantyWaivable ? 'Waivable if explicitly disclaimed' : 'STRICTLY NON-WAIVABLE under state law!'}
- **Prevailing Consumer Attorney Fees Shift**: ${analysis.lemonLawInfo.attorneyFeesShift ? 'Yes (Mandatory / Discretionary)' : 'No'}

---

## Magnuson-Moss Act Statutory Compliance Checklist
- **15 U.S.C. § 2302(c) Seal Ban**: ${analysis.magnusonMossCompliance.hasIllegalVoidIf ? 'NON-COMPLIANT (Illegal void sticker clause found)' : 'COMPLIANT'}
- **15 U.S.C. § 2302(c) Tie-In Repair Ban**: ${analysis.magnusonMossCompliance.hasIllegalTieIn ? 'NON-COMPLIANT (Illegal third-party repair ban)' : 'COMPLIANT'}
- **15 U.S.C. § 2308 Implied Disclaimers**: ${analysis.magnusonMossCompliance.hasImpliedDisclaimer ? 'NON-COMPLIANT (Prohibited disclaimer found)' : 'COMPLIANT'}

---
*Generated 100% locally with WarrantyWatch (MIT Public Good - Knowthankyew Privacy Architecture).*
`;
  };

  const handleDownloadMarkdown = () => {
    const mdContent = generateMarkdownReport();
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `warranty_watch_report_${analysis.stateCode}_${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-slate-100">Export Analysis Report</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Export your complete plain-English legal analysis report, statutory red flags, state lemon law provisions, and Magnuson-Moss compliance breakdown locally.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleDownloadMarkdown}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-200">Download Markdown (.md)</div>
                <div className="text-[11px] text-slate-400">Clean markdown format for docs or note-taking</div>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-400">Save File</span>
          </button>

          <button
            onClick={() => { window.print(); onClose(); }}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <Printer className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-200">Print / Save PDF</div>
                <div className="text-[11px] text-slate-400">Use browser print dialog to print or export PDF</div>
              </div>
            </div>
            <span className="text-xs font-semibold text-cyan-400">Print / PDF</span>
          </button>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
