import React from 'react';
import { BookOpen, RotateCcw, Presentation } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  isPresentationMode: boolean;
  onTogglePresentationMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  isPresentationMode,
  onTogglePresentationMode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#3B182E]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in editorial face) */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-md bg-[#3B182E] text-[#FAF7F2] flex items-center justify-center font-serif text-sm font-bold shadow-sm">
            ∑
          </div>
          <span className="font-serif font-bold text-lg tracking-tight text-[#3B182E]">
            Applied Mathematics <span className="font-sans font-normal text-xs text-[#75485E] ml-1.5 hidden sm:inline">Linear Regression Series</span>
          </span>
        </div>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#75485E]">
          <a
            href="#interactive-model"
            className="hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
          >
            Predictor
          </a>
          <a
            href="#graph-view"
            className="hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
          >
            Regression Plot
          </a>
          <a
            href="#derivation"
            className="hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
          >
            Derivation & OLS
          </a>
          <a
            href="#theory"
            className="hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
          >
            Methodology
          </a>
          <a
            href="#dataset"
            className="hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
          >
            Empirical Data
          </a>
        </nav>

        {/* Zone 3: Primary action button with presentation toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onReset}
            title="Reset to sample average (4.5 hours)"
            aria-label="Reset study hours to average"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#75485E] hover:text-[#3B182E] bg-[#FAF7F2] hover:bg-[#F2ECE3] border border-[#3B182E]/15 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Mean</span>
          </button>

          <button
            onClick={onTogglePresentationMode}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              isPresentationMode
                ? 'bg-[#1D4ED8] text-white shadow-sm ring-2 ring-[#1D4ED8]/30'
                : 'bg-[#3B182E] text-[#FAF7F2] hover:bg-[#4E213E] shadow-sm'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>{isPresentationMode ? 'Exit Stage Mode' : 'Stage View'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
