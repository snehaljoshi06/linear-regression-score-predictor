import React, { useState } from 'react';
import { POSTER_MODEL, ALTERNATE_MODEL, RegressionModel } from '../utils/regression';
import { UpperGeometricGraphic, LowerGeometricGraphic } from './GeometricDeco';
import { PosterGraph } from './PosterGraph';
import { ArrowRight, Sliders, RotateCcw, Calculator, Info, Check, Eye } from 'lucide-react';

interface InteractivePosterProps {
  onOpenDerivation: () => void;
}

export const InteractivePoster: React.FC<InteractivePosterProps> = ({ onOpenDerivation }) => {
  const [datasetChoice, setDatasetChoice] = useState<'poster' | 'alternate'>('poster');
  const [currentHours, setCurrentHours] = useState<number>(6.0); // 6 hours is the poster's featured prediction!
  const [showResiduals, setShowResiduals] = useState<boolean>(false);

  const model: RegressionModel = datasetChoice === 'poster' ? POSTER_MODEL : ALTERNATE_MODEL;

  const predictedScore = model.predict(currentHours);
  const roundedScore = Math.round(predictedScore);

  const presets = [
    { label: '1 hr', value: 1.0 },
    { label: '2 hrs', value: 2.0 },
    { label: '4 hrs', value: 4.0 },
    { label: '6 hrs (Poster)', value: 6.0 },
    { label: '8 hrs', value: 8.0 },
    { label: '10 hrs', value: 10.0 },
  ];

  return (
    <div className="relative bg-[#ECE6DC] text-[#271428] font-sans min-h-screen overflow-x-hidden selection:bg-[#2C55D4]/20 selection:text-[#183494]">
      {/* Decorative constructivist geometric art in top right */}
      <UpperGeometricGraphic />

      {/* Main Poster Canvas Container - Styled like high-quality academic presentation poster */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* =========================================================================
            POSTER HEADER & METADATA BAR
           ========================================================================= */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#271428]/20">
          <div>
            <span className="block font-sans text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#271428] uppercase">
              Applied Mathematics
            </span>
            <span className="block font-sans text-[11px] sm:text-xs font-medium tracking-[0.2em] text-[#5E3B5A] uppercase">
              Linear Regression
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-right">
            <div className="hidden sm:block text-right">
              <span className="block font-sans text-[9px] font-bold tracking-[0.2em] text-[#271428] uppercase leading-tight">
                Study Hours<br />To<br />Exam Score
              </span>
            </div>

            <div className="hidden sm:block h-9 w-[1px] bg-[#271428]/30" />

            <div className="text-left sm:text-right">
              <span className="block font-sans text-[11px] font-bold tracking-wider text-[#271428]">
                CSE (AIML)
              </span>
              <span className="block font-sans text-[10px] font-medium text-[#5E3B5A]">
                UNIT 05
              </span>
            </div>

            <div className="hidden md:flex flex-col text-[9px] font-mono tracking-widest text-[#5E3B5A] uppercase text-right leading-tight">
              <span>Data</span>
              <span>Model</span>
              <span>Prediction</span>
              <span>Real-World</span>
              <span>Insights</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            POSTER DISPLAY TITLE: CAN YOU PREDICT A SCORE?
           ========================================================================= */}
        <div className="pt-8 pb-6">
          <div className="max-w-3xl">
            <h1 className="font-serif font-black tracking-tight text-[#271428] uppercase leading-[0.88] select-none">
              <span className="block text-4xl sm:text-6xl md:text-7xl font-bold">CAN</span>
              <span className="block text-4xl sm:text-6xl md:text-7xl font-bold">YOU</span>
              <span className="block text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-[#271428] scale-y-105 my-1">
                PREDICT
              </span>
              <span className="block text-3xl sm:text-5xl md:text-6xl font-serif font-normal italic tracking-normal">
                A SCORE?
              </span>
            </h1>

            <p className="mt-3 font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-[#271428] uppercase">
              Finding A Trend In The Data
            </p>
            {/* The distinctive solid underline from the poster */}
            <div className="w-14 h-1.5 bg-[#271428] mt-2" />
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE PRESENTATION CONTROL BAR
           ========================================================================= */}
        <section aria-label="Interactive Presentation Controls" className="my-6 bg-[#E3DCCF]/90 p-4 sm:p-5 rounded-lg border border-[#271428]/20 shadow-xs">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Slider with instant value display */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#2C55D4]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#271428]">
                    Interactive Study Duration:
                  </span>
                </div>
                <span className="font-mono text-base font-bold text-[#2C55D4] tabular-nums">
                  {currentHours.toFixed(1)} Hours
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={currentHours}
                onChange={(e) => setCurrentHours(parseFloat(e.target.value))}
                aria-label="Adjust study hours"
                className="w-full h-2.5 bg-[#D5CCBE] rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2C55D4]/40"
              />

              {/* Preset buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-semibold uppercase text-[#5E3B5A] mr-1">
                  Presets:
                </span>
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setCurrentHours(p.value)}
                    className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                      Math.abs(currentHours - p.value) < 0.05
                        ? 'bg-[#271428] text-[#ECE6DC] font-bold'
                        : 'bg-[#DCD4C6] text-[#271428] hover:bg-[#D0C6B5]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dataset switcher and mathematical options */}
            <div className="flex flex-wrap items-center gap-2 lg:border-l lg:border-[#271428]/20 lg:pl-5">
              <div className="flex items-center gap-1 bg-[#D5CCBE] p-0.5 rounded border border-[#271428]/20 text-xs">
                <button
                  type="button"
                  onClick={() => setDatasetChoice('poster')}
                  className={`px-2.5 py-1 font-medium rounded transition-colors ${
                    datasetChoice === 'poster'
                      ? 'bg-[#271428] text-white shadow-xs'
                      : 'text-[#271428] hover:text-black'
                  }`}
                >
                  Poster Model (6.35x + 28.21)
                </button>
                <button
                  type="button"
                  onClick={() => setDatasetChoice('alternate')}
                  className={`px-2.5 py-1 font-medium rounded transition-colors ${
                    datasetChoice === 'alternate'
                      ? 'bg-[#271428] text-white shadow-xs'
                      : 'text-[#271428] hover:text-black'
                  }`}
                >
                  Alternative Set (6.42x + 28.00)
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowResiduals(!showResiduals)}
                className={`px-2.5 py-1 text-xs font-medium rounded border border-[#271428]/20 transition-colors flex items-center gap-1.5 ${
                  showResiduals
                    ? 'bg-[#2C55D4] text-white'
                    : 'bg-[#ECE6DC] text-[#271428] hover:bg-[#DCD4C6]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showResiduals ? 'Hide Residuals' : 'Show Residuals (eᵢ)'}</span>
              </button>

              <button
                type="button"
                onClick={onOpenDerivation}
                className="px-3 py-1 text-xs font-semibold rounded bg-[#271428] text-[#ECE6DC] hover:bg-[#3D1E3E] transition-colors flex items-center gap-1.5"
              >
                <Calculator className="w-3.5 h-3.5 text-[#2C55D4]" />
                <span>OLS Proof & Formulas</span>
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            MAIN POSTER SECTION: MODEL, DATASET, GRAPH & PREDICTION
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 items-start">
          {/* Column 1: THE MODEL & DATASET TABLE (4 Cols) */}
          <div className="md:col-span-4 space-y-6">
            {/* THE MODEL CARD (Exact reproduction from poster) */}
            <div className="bg-[#E4DDD0] border border-[#271428]/25 p-4 sm:p-5 relative overflow-hidden">
              <span className="block font-sans text-[11px] font-bold tracking-[0.2em] text-[#271428] uppercase mb-2">
                The Model
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold italic tracking-tight text-[#271428] my-2 select-all">
                y = {model.displaySlope.toFixed(2)}x + {model.displayIntercept.toFixed(2)}
              </div>
              <p className="font-sans text-xs text-[#5E3B5A] leading-relaxed mt-2">
                A linear regression model that shows the relationship between study hours (x) and exam score (y).
              </p>
            </div>

            {/* DATASET TABLE (Exact reproduction from poster) */}
            <div className="border border-[#271428]/25 bg-[#ECE6DC]">
              <div className="px-3.5 py-2 border-b border-[#271428]/20 flex items-center justify-between">
                <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#271428] uppercase">
                  Dataset
                </span>
                <span className="text-[10px] text-[#5E3B5A] font-mono">
                  N = {model.points.length} Students
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs text-[#271428]">
                  <thead className="bg-[#DDD5C5] text-[#271428] font-bold border-b border-[#271428]/20 text-[11px]">
                    <tr>
                      <th scope="col" className="px-2 py-2 border-r border-[#271428]/15">Student</th>
                      <th scope="col" className="px-2 py-2 border-r border-[#271428]/15">Study Hours (x)</th>
                      <th scope="col" className="px-2 py-2">Exam Score (%) (y)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#271428]/15 font-mono text-[11px]">
                    {model.points.map((pt) => {
                      const isSelected = Math.abs(currentHours - pt.hours) < 0.05;
                      return (
                        <tr
                          key={pt.id}
                          onClick={() => setCurrentHours(pt.hours)}
                          title={`Click to set hours to ${pt.hours}`}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#2C55D4]/15 font-bold text-[#1E3A8A]'
                              : 'hover:bg-[#E2DACD]'
                          }`}
                        >
                          <td className="px-2 py-1.5 border-r border-[#271428]/15 font-sans font-medium">
                            {pt.id}
                          </td>
                          <td className="px-2 py-1.5 border-r border-[#271428]/15 tabular-nums">
                            {pt.hours}
                          </td>
                          <td className="px-2 py-1.5 font-bold tabular-nums">
                            {pt.score}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-2 text-[10px] text-[#5E3B5A] border-t border-[#271428]/15 bg-[#E4DDD0] text-center">
                Click any row to test that student's study duration.
              </div>
            </div>

            {/* HOW IT WORKS (From Poster) */}
            <div className="p-4 bg-[#E4DDD0] border border-[#271428]/25">
              <span className="block font-sans text-[11px] font-bold tracking-[0.2em] text-[#271428] uppercase mb-2">
                How It Works
              </span>
              <p className="font-sans text-xs text-[#271428] leading-relaxed">
                Linear regression finds the best fitting straight line through the data points. 
                The line minimises the overall difference between the observed scores and the predicted scores.
              </p>
            </div>
          </div>

          {/* Column 2: THE GRAPH & THE PREDICTION CARD (8 Cols) */}
          <div className="md:col-span-8 space-y-6">
            {/* The SVG Regression Chart */}
            <div className="bg-[#ECE6DC] border border-[#271428]/25 p-3 sm:p-5">
              <PosterGraph
                model={model}
                currentHours={currentHours}
                predictedScore={predictedScore}
                onHoursChange={setCurrentHours}
                showResiduals={showResiduals}
              />
            </div>

            {/* THE PREDICTION CARD (Exact reproduction from poster) */}
            <div className="bg-[#E4DDD0] border border-[#271428]/25 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#271428] uppercase">
                  The Prediction
                </span>
                <span className="text-xs font-mono text-[#5E3B5A]">
                  Live Dynamic Output
                </span>
              </div>

              {/* The Deep Plum Box from the Poster: 6 hours -> ≈ 66% predicted score */}
              <div className="bg-[#271428] text-[#ECE6DC] p-4 sm:p-5 rounded-sm flex flex-wrap items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3 text-lg sm:text-2xl font-bold font-serif">
                  <span>{currentHours.toFixed(1)} hours</span>
                  <span className="text-[#2C55D4] text-xl">→</span>
                  <span className="text-white font-mono text-xl sm:text-2xl">≈ {roundedScore}%</span>
                </div>
                <span className="text-xs sm:text-sm font-sans tracking-wide text-[#ECE6DC]/80 uppercase">
                  predicted score
                </span>
              </div>

              {/* Step-by-step substitution from the poster */}
              <div className="mt-4 font-mono text-xs text-[#271428] space-y-1">
                <div className="font-sans text-xs font-medium text-[#5E3B5A]">
                  Using the model:
                </div>
                <div className="pl-3 border-l-2 border-[#2C55D4] space-y-0.5">
                  <div>
                    y = {model.displaySlope.toFixed(2)}({currentHours.toFixed(1)}) + {model.displayIntercept.toFixed(2)}
                  </div>
                  <div>
                    &nbsp;&nbsp;= {(model.slope * currentHours + model.intercept).toFixed(2)}
                  </div>
                </div>
                <p className="font-sans text-xs text-[#271428] pt-2">
                  So, a student who studies for <strong className="text-[#2C55D4]">{currentHours.toFixed(1)} hours</strong> is 
                  predicted to score approximately <strong className="text-[#271428]">{roundedScore}%</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            LOWER SECTION: REAL-WORLD APPLICATIONS, GEOMETRIC DECO & LIMITATIONS
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-10 mt-8 border-t border-[#271428]/25 items-center">
          {/* Column 1: REAL-WORLD APPLICATIONS (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <h2 className="font-sans text-xs sm:text-sm font-bold tracking-[0.2em] text-[#271428] uppercase">
                Real-World Applications
              </h2>
              <div className="w-full h-[1.5px] bg-[#271428] mt-1 mb-4" />
            </div>

            {/* Application 1: Education */}
            <div className="flex items-start gap-3">
              <span className="text-[#2C55D4] text-base mt-0.5 font-bold">↗</span>
              <div>
                <span className="block font-sans text-xs font-bold tracking-wider text-[#271428] uppercase">
                  Education
                </span>
                <p className="text-xs text-[#5E3B5A]">
                  Estimate performance and plan study strategies.
                </p>
              </div>
            </div>

            {/* Application 2: Business */}
            <div className="flex items-start gap-3">
              <span className="text-[#2C55D4] text-base mt-0.5 font-bold">↗</span>
              <div>
                <span className="block font-sans text-xs font-bold tracking-wider text-[#271428] uppercase">
                  Business
                </span>
                <p className="text-xs text-[#5E3B5A]">
                  Forecast sales based on advertising spend.
                </p>
              </div>
            </div>

            {/* Application 3: Healthcare */}
            <div className="flex items-start gap-3">
              <span className="text-[#2C55D4] text-base mt-0.5 font-bold">↗</span>
              <div>
                <span className="block font-sans text-xs font-bold tracking-wider text-[#271428] uppercase">
                  Healthcare
                </span>
                <p className="text-xs text-[#5E3B5A]">
                  Identify trends, e.g. treatment time vs. recovery.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: LOWER GEOMETRIC ART (2 Cols) */}
          <div className="md:col-span-2 flex justify-center py-4">
            <LowerGeometricGraphic />
          </div>

          {/* Column 3: LIMITATIONS & CONCLUSION (5 Cols) */}
          <div className="md:col-span-5 space-y-5">
            {/* LIMITATIONS */}
            <div>
              <span className="block font-sans text-xs font-bold tracking-[0.2em] text-[#271428] uppercase mb-2">
                Limitations
              </span>
              <ul className="space-y-1 text-xs text-[#5E3B5A] list-disc list-inside">
                <li>Assumes a linear relationship.</li>
                <li>May not capture all factors affecting scores.</li>
                <li>Predictions are only estimates, not guarantees.</li>
                <li>Based on a small, illustrative dataset.</li>
              </ul>
            </div>

            {/* CONCLUSION */}
            <div className="pt-2 border-t border-[#271428]/15">
              <span className="block font-sans text-xs font-bold tracking-[0.2em] text-[#271428] uppercase mb-1">
                Conclusion
              </span>
              <p className="font-sans text-xs text-[#271428] leading-relaxed">
                Linear regression helps us understand patterns in data and make reasonable predictions, 
                but results should always be interpreted with caution.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROMINENT MODEL DISCLAIMER CALLOUT
           ========================================================================= */}
        <div className="mt-8 p-4 bg-[#E2DACD] border border-[#271428]/30 rounded-sm text-xs text-[#271428] flex items-start gap-3">
          <Info className="w-5 h-5 text-[#2C55D4] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold">Illustrative Model Presentation Disclaimer:</strong> This web application 
            and regression model are built specifically for an Applied Mathematics academic presentation. 
            Exam outcomes in practice are influenced by prior knowledge, exam difficulty, cognitive fatigue, and study 
            quality, which simple bivariate linear models cannot completely capture.
          </div>
        </div>

        {/* =========================================================================
            POSTER FOOTER (Exact reproduction from poster)
           ========================================================================= */}
        <footer className="mt-10 pt-6 border-t-2 border-[#271428] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-[#271428]">
          <div>
            PRESENTED BY: GROUP 4 &nbsp;|&nbsp; MIT AOE &nbsp;|&nbsp; APPLIED MATHEMATICS
          </div>
          <div className="text-[#5E3B5A]">
            REGRESSION &nbsp;/&nbsp; PREDICTION &nbsp;/&nbsp; INSIGHTS
          </div>
        </footer>
      </div>
    </div>
  );
};
