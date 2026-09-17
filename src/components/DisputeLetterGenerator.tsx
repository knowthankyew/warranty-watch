import React, { useState } from 'react';
import { FileSignature, Copy, Check, Printer } from 'lucide-react';
import { LegalAnalysisResult, DisputeLetterData } from '../legal/types';
import { generateDisputeLetter } from '../legal/disputeLetter';

interface DisputeLetterGeneratorProps {
  analysis: LegalAnalysisResult;
}

export const DisputeLetterGenerator: React.FC<DisputeLetterGeneratorProps> = ({ analysis }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<DisputeLetterData>({
    consumerName: '',
    consumerAddress: '',
    consumerPhoneEmail: '',
    companyName: '',
    companyAddress: '',
    productNameModel: analysis.productType !== 'General' ? analysis.productType : '',
    purchaseDate: '',
    serialNumber: '',
    purchasePrice: '',
    stateCode: analysis.stateCode,
    defectDescription: '',
    repairHistory: '',
    demandedRemedy: 'Full Refund'
  });

  const letterText = generateDisputeLetter(formData, analysis);

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Formal Warranty Dispute Demand Letter</title>
            <style>
              body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; margin: 1in; color: #000; }
              pre { font-family: inherit; white-space: pre-wrap; word-wrap: break-word; }
            </style>
          </head>
          <body>
            <pre>${letterText}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <FileSignature className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Statutory Dispute Demand Letter Generator
            </h3>
            <p className="text-xs text-slate-400">
              Draft formal demand letter citing Magnuson-Moss & {analysis.lemonLawInfo.stateName} Lemon Law
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{copied ? 'Copied!' : 'Copy Letter'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-3.5 py-2 rounded-lg transition-colors font-bold"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Input Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        {/* Consumer Info */}
        <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] text-teal-400">
            Consumer Information
          </div>
          
          <input
            type="text"
            placeholder="Your Full Name"
            value={formData.consumerName}
            onChange={(e) => setFormData({ ...formData, consumerName: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-teal-500"
          />
          <input
            type="text"
            placeholder="Street Address, City, State ZIP"
            value={formData.consumerAddress}
            onChange={(e) => setFormData({ ...formData, consumerAddress: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-teal-500"
          />
          <input
            type="text"
            placeholder="Phone Number / Email Address"
            value={formData.consumerPhoneEmail}
            onChange={(e) => setFormData({ ...formData, consumerPhoneEmail: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Company Info */}
        <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] text-cyan-400">
            Manufacturer / Seller Information
          </div>
          
          <input
            type="text"
            placeholder="Company Name (e.g. Apex Tech Labs Inc.)"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-cyan-500"
          />
          <input
            type="text"
            placeholder="Company Claims Dept Address"
            value={formData.companyAddress}
            onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-cyan-500"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Product Name / Model"
              value={formData.productNameModel}
              onChange={(e) => setFormData({ ...formData, productNameModel: e.target.value })}
              className="bg-slate-900 border border-slate-800 text-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              placeholder="Serial # / Order ID"
              value={formData.serialNumber}
              onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
              className="bg-slate-900 border border-slate-800 text-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Defect Details & Remedy */}
        <div className="md:col-span-2 space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] text-emerald-400">
            Defect Description & Demanded Statutory Remedy
          </div>

          <textarea
            placeholder="Describe the defect in detail (e.g., Battery fails to hold charge, unit overheats and powers down unexpectedly)..."
            rows={3}
            value={formData.defectDescription}
            onChange={(e) => setFormData({ ...formData, defectDescription: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-emerald-500 font-mono"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Prior Repair Attempt History (e.g. Sent to service twice on Jan 10 & Feb 14)"
              value={formData.repairHistory}
              onChange={(e) => setFormData({ ...formData, repairHistory: e.target.value })}
              className="bg-slate-900 border border-slate-800 text-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-emerald-500"
            />

            <select
              value={formData.demandedRemedy}
              onChange={(e) => setFormData({ ...formData, demandedRemedy: e.target.value as any })}
              className="bg-slate-900 border border-slate-800 text-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="Full Refund">Demand: Full Refund of Purchase Price</option>
              <option value="Replacement Product">Demand: Brand New Replacement Unit</option>
              <option value="Free Repair Under Warranty">Demand: Free Repair Under Express/Implied Warranty</option>
              <option value="Reimbursement for Independent Repair">Demand: Reimbursement for Third-Party Repair</option>
            </select>
          </div>
        </div>

      </div>

      {/* Live Letter Preview */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Generated Statutory Demand Letter Preview
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-slate-200 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto selection:bg-teal-500 selection:text-slate-950">
          {letterText}
        </div>
      </div>

    </div>
  );
};
