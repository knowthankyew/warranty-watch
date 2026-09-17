import { useState } from 'react';
import { Header } from './components/Header';
import { WarrantyInput, PRODUCT_CATEGORIES } from './components/WarrantyInput';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { RedFlagsList } from './components/RedFlagsList';
import { CoverageBreakdown } from './components/CoverageBreakdown';
import { StateLemonLawCard } from './components/StateLemonLawCard';
import { DisputeLetterGenerator } from './components/DisputeLetterGenerator';
import { ExportModal } from './components/ExportModal';
import { analyzeWarrantyText } from './legal/parser';
import { SampleWarranty, LegalAnalysisResult } from './legal/types';
import { SAMPLE_WARRANTIES } from './legal/sampleWarranties';
import { ShieldCheck, Download, Lock } from 'lucide-react';

export function App() {
  const [inputText, setInputText] = useState<string>(SAMPLE_WARRANTIES[0].text);
  const [productType, setProductType] = useState<string>(PRODUCT_CATEGORIES[0]);
  const [selectedState, setSelectedState] = useState<string>('CA');
  const [analysisResult, setAnalysisResult] = useState<LegalAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'redflags' | 'coverage' | 'lemonlaw' | 'dispute'>('overview');
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  // Trigger Legal Analysis
  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    const result = analyzeWarrantyText(inputText, productType, selectedState);
    setAnalysisResult(result);
    setActiveTab('overview');
  };

  // Handle Preset Loading
  const handleSelectSample = (sample: SampleWarranty) => {
    setInputText(sample.text);
    if (sample.category.includes('Electronics')) setProductType(PRODUCT_CATEGORIES[0]);
    else if (sample.category.includes('Automotive')) setProductType(PRODUCT_CATEGORIES[1]);
    else if (sample.category.includes('Appliance')) setProductType(PRODUCT_CATEGORIES[2]);
    else if (sample.category.includes('Tool')) setProductType(PRODUCT_CATEGORIES[3]);

    const result = analyzeWarrantyText(sample.text, sample.category, selectedState);
    setAnalysisResult(result);
    setActiveTab('overview');
  };

  // State Change update
  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    if (inputText.trim()) {
      const result = analyzeWarrantyText(inputText, productType, newState);
      setAnalysisResult(result);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header Navigation */}
      <Header onSelectSample={handleSelectSample} onReset={handleReset} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Input Section */}
        <section>
          <WarrantyInput
            inputText={inputText}
            setInputText={setInputText}
            productType={productType}
            setProductType={setProductType}
            selectedState={selectedState}
            setSelectedState={handleStateChange}
            onAnalyze={handleAnalyze}
          />
        </section>

        {/* Results Section */}
        {analysisResult && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Nav Tabs Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  Overview & Protection Score
                </button>

                <button
                  onClick={() => setActiveTab('redflags')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                    activeTab === 'redflags'
                      ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span>Red Flags</span>
                  {analysisResult.redFlags.length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-slate-950/40 text-[10px]">
                      {analysisResult.redFlags.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('coverage')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === 'coverage'
                      ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  What's Covered
                </button>

                <button
                  onClick={() => setActiveTab('lemonlaw')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === 'lemonlaw'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {analysisResult.lemonLawInfo.stateName} Lemon Rights
                </button>

                <button
                  onClick={() => setActiveTab('dispute')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === 'dispute'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  Draft Dispute Letter
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setShowExportModal(true)}
                  className="flex items-center space-x-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 px-3.5 py-2 rounded-xl border border-slate-800 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Export Report</span>
                </button>
              </div>
            </div>

            {/* Tab Views */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <ExecutiveSummary result={analysisResult} />
                <RedFlagsList redFlags={analysisResult.redFlags} />
                <CoverageBreakdown coverageList={analysisResult.coverageList} duration={analysisResult.extractedDuration} />
              </div>
            )}

            {activeTab === 'redflags' && (
              <RedFlagsList redFlags={analysisResult.redFlags} />
            )}

            {activeTab === 'coverage' && (
              <CoverageBreakdown coverageList={analysisResult.coverageList} duration={analysisResult.extractedDuration} />
            )}

            {activeTab === 'lemonlaw' && (
              <StateLemonLawCard lemonLaw={analysisResult.lemonLawInfo} />
            )}

            {activeTab === 'dispute' && (
              <DisputeLetterGenerator analysis={analysisResult} />
            )}

          </section>
        )}

      </main>

      {/* Export Modal */}
      {showExportModal && analysisResult && (
        <ExportModal analysis={analysisResult} onClose={() => setShowExportModal(false)} />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-300">WarrantyWatch</span>
            <span>— Free Public Good (MIT License)</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400 text-[11px]">
            <span className="flex items-center space-x-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>100% Client-Side Execution</span>
            </span>
            <span>•</span>
            <span>Zero Network Telemetry</span>
            <span>•</span>
            <span>Magnuson-Moss Act 15 U.S.C. § 2301</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
