import React from 'react';
import { MODEL } from '../utils/regression';
import { Minus, Plus, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

interface PredictionCalculatorProps {
  currentHours: number;
  onHoursChange: (hours: number) => void;
}

export const PredictionCalculator: React.FC<PredictionCalculatorProps> = ({
  currentHours,
  onHoursChange,
}) => {
  const predictedScore = MODEL.predict(currentHours);
  const slopeContribution = MODEL.slope * currentHours;
  const intercept = MODEL.intercept;

  // Presets for presentation quick-clicks
  const presets = [
    { label: '1 hr', value: 1.0 },
    { label: '3 hrs', value: 3.0 },
    { label: '4.5 hrs (Mean)', value: 4.5 },
    { label: '6 hrs', value: 6.0 },
    { label: '8 hrs', value: 8.0 },
    { label: '10 hrs (Max)', value: 10.0 },
  ];

  const handleStep = (delta: number) => {
    const next = Math.min(10, Math.max(1, parseFloat((currentHours + delta).toFixed(1))));
    onHoursChange(next);
  };

  // Difference compared to cohort average
  const deltaFromMean = predictedScore - MODEL.meanY;
  const isAboveMean = deltaFromMean >= 0;

  // Domain status (interpolation vs extrapolation)
  const isExtrapolation = currentHours > 8;

  return (
    <div className="bg-[#FAF7F2] border border-[#3B182E]/15 rounded-xl p-5 sm:p-7 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header kicker */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3B182E]/10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#75485E]">
            Interactive Model Console
          </span>
          <span className="text-xs text-[#1D4ED8] font-medium">
            Ordinary Least Squares Fit
          </span>
        </div>

        {/* 1. The Study Hours Slider */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <label htmlFor="study-hours-slider" className="font-serif font-bold text-lg text-[#3B182E]">
              Select Daily Study Hours
            </label>
            <div className="flex items-center gap-1.5 font-mono text-2xl font-bold text-[#1D4ED8] tabular-nums">
              <span>{currentHours.toFixed(1)}</span>
              <span className="text-sm font-sans font-normal text-[#75485E]">hours</span>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="relative pt-1 pb-2">
            <input
              id="study-hours-slider"
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={currentHours}
              onChange={(e) => onHoursChange(parseFloat(e.target.value))}
              aria-valuemin={1}
              aria-valuemax={10}
              aria-valuenow={currentHours}
              aria-label="Study hours slider"
              className="w-full h-2.5 bg-[#EAE2D7] rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/40"
            />

            {/* Slider Scale Ticks */}
            <div className="flex justify-between items-center text-[11px] font-mono text-[#8C6B80] mt-1.5 px-0.5 tabular-nums">
              <span>1.0h</span>
              <span className="hidden sm:inline">2.5h</span>
              <span className="text-[#3B182E] font-semibold">4.5h (Mean)</span>
              <span className="hidden sm:inline">7.0h</span>
              <span className="text-[#3B182E] font-medium">8.0h (Data Max)</span>
              <span>10.0h</span>
            </div>
          </div>

          {/* Quick Adjustment & Presets Strip */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="flex items-center gap-1 bg-[#F2ECE3] rounded-lg p-0.5 border border-[#3B182E]/10">
              <button
                type="button"
                onClick={() => handleStep(-0.5)}
                disabled={currentHours <= 1}
                aria-label="Decrease by 0.5 hours"
                className="w-7 h-7 flex items-center justify-center rounded text-[#3B182E] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleStep(0.5)}
                disabled={currentHours >= 10}
                aria-label="Increase by 0.5 hours"
                className="w-7 h-7 flex items-center justify-center rounded text-[#3B182E] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Preset Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {presets.map((p) => {
                const isActive = Math.abs(currentHours - p.value) < 0.05;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => onHoursChange(p.value)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-[#1D4ED8] text-white shadow-sm'
                        : 'bg-[#F2ECE3] text-[#75485E] hover:text-[#3B182E] hover:bg-[#EAE2D7]'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Instant Predicted Exam Score Display */}
        <div className="mt-8 pt-6 border-t border-[#3B182E]/10 bg-[#F4EFEA]/80 rounded-xl p-5 border border-[#3B182E]/10">
          <div className="flex items-center justify-between text-xs font-medium text-[#75485E] mb-1">
            <span>Predicted Exam Score (ŷ)</span>
            <span className="font-mono tabular-nums">
              {isAboveMean ? '+' : ''}{deltaFromMean.toFixed(1)}% vs Cohort Mean
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-[#3B182E] tabular-nums">
              {predictedScore.toFixed(1)}%
            </span>
            <span className="text-sm font-medium text-[#75485E]">
              / 100 Marks
            </span>
          </div>

          {/* Contextual qualitative tier */}
          <div className="mt-2 text-xs text-[#6B475D] flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#1D4ED8]" />
            <span>
              {predictedScore >= 80
                ? 'High Distinction Tier (Strong master of syllabus material)'
                : predictedScore >= 65
                ? 'Distinction / Merit Tier (Solid grasp of analytical problems)'
                : predictedScore >= 50
                ? 'Passing Competency Tier (Core concepts demonstrated)'
                : 'Developing Performance Tier (Foundational support required)'}
            </span>
          </div>

          {isExtrapolation && (
            <div className="mt-3 p-2.5 rounded-lg bg-[#FAF7F2] border border-amber-600/30 text-amber-900 text-xs flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Note on Extrapolation:</strong> You are evaluating {currentHours.toFixed(1)} hours, which lies outside 
                the sample domain (1 to 8 hours). Mathematical predictions beyond 8h assume the linear rate never fatigues or saturates.
              </span>
            </div>
          )}
        </div>

        {/* 3. Live Mathematical Substitution Breakdown */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#75485E]">
              Mathematical Substitution
            </span>
            <span className="font-mono text-xs text-[#8C6B80]">ŷ = β₁x + β₀</span>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-lg border border-[#3B182E]/10 space-y-2.5">
            {/* Step 1: General Equation */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#75485E]">Fitted Equation:</span>
              <span className="text-[#3B182E] font-semibold">
                ŷ = ({MODEL.slope.toFixed(4)}) · x + {MODEL.intercept.toFixed(2)}
              </span>
            </div>

            {/* Step 2: Value Substitution */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#75485E]">Step 1 (Rate × Hours):</span>
              <span className="text-[#3B182E] tabular-nums">
                6.4167 × {currentHours.toFixed(1)} = <strong className="text-[#1D4ED8]">+{slopeContribution.toFixed(2)}</strong>
              </span>
            </div>

            {/* Step 3: Base Constant Addition */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#75485E]">Step 2 (+ Baseline Intercept):</span>
              <span className="text-[#3B182E] tabular-nums">
                {slopeContribution.toFixed(2)} + 28.00 = <strong className="text-[#3B182E]">{predictedScore.toFixed(2)}</strong>
              </span>
            </div>

            {/* Final Result */}
            <div className="pt-2 border-t border-[#3B182E]/10 flex items-center justify-between text-xs">
              <span className="font-sans font-medium text-[#75485E]">Final Rounded Prediction:</span>
              <span className="font-mono font-bold text-[#1D4ED8] text-sm tabular-nums">
                ŷ = {predictedScore.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Marginal Interpretation Callout */}
      <div className="mt-6 pt-4 border-t border-[#3B182E]/10 text-xs text-[#6B475D] leading-relaxed">
        <p>
          <strong className="text-[#3B182E]">Slope Meaning:</strong> For every additional 1 hour of study, the model estimates an expected increase of{' '}
          <span className="font-mono font-semibold text-[#1D4ED8] tabular-nums">+{MODEL.slope.toFixed(2)}%</span> marks. The intercept of{' '}
          <span className="font-mono font-semibold text-[#3B182E] tabular-nums">28.00%</span> represents the baseline prior-knowledge foundation at zero hours.
        </p>
      </div>
    </div>
  );
};
