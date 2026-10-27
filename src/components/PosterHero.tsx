import React from 'react';
import { Sparkles, Calculator, Sigma, TrendingUp } from 'lucide-react';
import { MODEL } from '../utils/regression';

export const PosterHero: React.FC = () => {
  return (
    <section className="pt-8 pb-8 md:pt-12 md:pb-10 border-b border-[#3B182E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Sub-kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#75485E] mb-3">
          <span>Applied Mathematics Project</span>
          <span aria-hidden="true">/</span>
          <span>Bivariate Statistical Analysis</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#1D4ED8]">Ordinary Least Squares</span>
        </div>

        {/* Poster Headline */}
        <div className="max-w-4xl">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#3B182E] text-balance leading-[1.12]">
            Can You Predict Your Exam Score?
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-[#6B475D] leading-relaxed max-w-3xl">
            An interactive empirical demonstration of Simple Linear Regression. Explore how dedicated 
            study duration correlates with academic examination outcomes using our least-squares model 
            derived from an illustrative cohort dataset.
          </p>
        </div>

        {/* Mathematical summary strip - Clean unboxed presentation with hairline dividers */}
        <div className="mt-8 pt-6 border-t border-[#3B182E]/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="space-y-1">
            <span className="text-xs font-medium text-[#75485E]">Fitted Regression Equation</span>
            <div className="font-mono text-base sm:text-lg font-semibold text-[#1D4ED8] tabular-nums">
              ŷ = 6.42x + 28.00
            </div>
            <p className="text-[11px] text-[#8C6B80]">Slope m = 77/12 · Intercept c = 28</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-medium text-[#75485E]">Coefficient of Determination</span>
            <div className="font-mono text-base sm:text-lg font-semibold text-[#3B182E] tabular-nums">
              R² = {(MODEL.rSquared * 100).toFixed(1)}%
            </div>
            <p className="text-[11px] text-[#8C6B80]">99.7% of variance explained</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-medium text-[#75485E]">Pearson Correlation</span>
            <div className="font-mono text-base sm:text-lg font-semibold text-[#3B182E] tabular-nums">
              r = +{MODEL.r.toFixed(4)}
            </div>
            <p className="text-[11px] text-[#8C6B80]">Near-perfect positive linearity</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-medium text-[#75485E]">Cohort Sample Size</span>
            <div className="font-mono text-base sm:text-lg font-semibold text-[#3B182E] tabular-nums">
              N = {MODEL.n} Students
            </div>
            <p className="text-[11px] text-[#8C6B80]">Mean x̄ = {MODEL.meanX}h · ȳ = {MODEL.meanY.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </section>
  );
};
