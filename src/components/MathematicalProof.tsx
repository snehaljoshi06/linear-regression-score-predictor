import React, { useState } from 'react';
import { MODEL, DetailedPoint } from '../utils/regression';
import { Copy, Check, Calculator, BookOpen, Sigma, Table as TableIcon } from 'lucide-react';

export const MathematicalProof: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'derivation' | 'table'>('derivation');

  const equationText = `ŷ = ${MODEL.slope.toFixed(4)}x + ${MODEL.intercept.toFixed(2)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(equationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="derivation" className="py-12 border-b border-[#3B182E]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#75485E] mb-2">
              <Sigma className="w-3.5 h-3.5 text-[#1D4ED8]" />
              <span>Analytical Mathematics & Verification</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#3B182E]">
              Ordinary Least Squares (OLS) Derivation
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6B475D] max-w-2xl">
              How the regression coefficients are mathematically solved to guarantee the absolute minimum 
              sum of squared residuals across the 8 empirical data points.
            </p>
          </div>

          {/* Tab selector and copy */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-1 p-1 bg-[#F2ECE3] rounded-lg border border-[#3B182E]/10">
              <button
                type="button"
                onClick={() => setActiveTab('derivation')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'derivation'
                    ? 'bg-[#FAF7F2] text-[#3B182E] shadow-xs'
                    : 'text-[#75485E] hover:text-[#3B182E]'
                }`}
              >
                Calculations & Proof
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('table')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'table'
                    ? 'bg-[#FAF7F2] text-[#3B182E] shadow-xs'
                    : 'text-[#75485E] hover:text-[#3B182E]'
                }`}
              >
                Residuals Data Table
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#75485E] hover:text-[#3B182E] bg-[#FAF7F2] hover:bg-[#F2ECE3] border border-[#3B182E]/15 rounded-lg transition-colors whitespace-nowrap"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Equation'}</span>
            </button>
          </div>
        </div>

        {activeTab === 'derivation' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: Means & Centroid */}
            <div className="bg-[#FAF7F2] border border-[#3B182E]/15 rounded-xl p-5 shadow-xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#75485E] mb-2">
                01. Sample Centroid
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3B182E] mb-3">
                Cohort Means (x̄, ȳ)
              </h3>
              <p className="text-xs text-[#6B475D] mb-4">
                The regression line is mathematically anchored to pass through the balance centroid of the sample data.
              </p>

              <div className="space-y-3 font-mono text-xs bg-[#F4EFEA] p-3.5 rounded-lg border border-[#3B182E]/10">
                <div>
                  <span className="text-[#75485E]">x̄ = (∑x) / n = </span>
                  <span className="text-[#3B182E] font-semibold">36 / 8 = 4.50 hrs</span>
                </div>
                <div>
                  <span className="text-[#75485E]">ȳ = (∑y) / n = </span>
                  <span className="text-[#3B182E] font-semibold">455 / 8 = 56.88%</span>
                </div>
                <div className="pt-2 border-t border-[#3B182E]/10 text-[11px] text-[#75485E] font-sans">
                  The point <strong className="text-[#3B182E] font-mono">(4.5, 56.88)</strong> is the geometric pivot.
                </div>
              </div>
            </div>

            {/* Step 2: Sums of Squares */}
            <div className="bg-[#FAF7F2] border border-[#3B182E]/15 rounded-xl p-5 shadow-xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#75485E] mb-2">
                02. Covariance & Variance
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3B182E] mb-3">
                Sums of Squares (SS_xx, SS_xy)
              </h3>
              <p className="text-xs text-[#6B475D] mb-4">
                Computing the spread of study hours and joint co-variation with exam marks.
              </p>

              <div className="space-y-3 font-mono text-xs bg-[#F4EFEA] p-3.5 rounded-lg border border-[#3B182E]/10">
                <div>
                  <span className="text-[#75485E]">SS_xx = ∑(x - x̄)² = </span>
                  <span className="text-[#3B182E] font-semibold">42.00</span>
                </div>
                <div>
                  <span className="text-[#75485E]">SS_xy = ∑(x - x̄)(y - ȳ) = </span>
                  <span className="text-[#3B182E] font-semibold">269.50</span>
                </div>
                <div className="pt-2 border-t border-[#3B182E]/10 text-[11px] text-[#75485E] font-sans">
                  SS_xy {'>'} 0 confirms a strictly positive directional co-movement.
                </div>
              </div>
            </div>

            {/* Step 3: Slope & Intercept Solution */}
            <div className="bg-[#FAF7F2] border border-[#3B182E]/15 rounded-xl p-5 shadow-xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#75485E] mb-2">
                03. OLS Parameters
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3B182E] mb-3">
                Slope & Intercept
              </h3>
              <p className="text-xs text-[#6B475D] mb-4">
                Calculating the slope (rate of score gain) and y-intercept (foundation baseline).
              </p>

              <div className="space-y-3 font-mono text-xs bg-[#F4EFEA] p-3.5 rounded-lg border border-[#3B182E]/10">
                <div>
                  <span className="text-[#75485E]">m = SS_xy / SS_xx = </span>
                  <span className="text-[#1D4ED8] font-semibold">269.5 / 42 = 77/12 ≈ 6.4167</span>
                </div>
                <div>
                  <span className="text-[#75485E]">c = ȳ - m·x̄ = </span>
                  <span className="text-[#3B182E] font-semibold">56.875 - (6.4167 × 4.5) = 28.000</span>
                </div>
                <div className="pt-2 border-t border-[#3B182E]/10 text-[11px] text-[#75485E] font-sans">
                  Yields exact equation <strong className="text-[#1D4ED8] font-mono">ŷ = 6.42x + 28.00</strong>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empirical Data & Residuals Table */
          <div className="bg-[#FAF7F2] border border-[#3B182E]/15 rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 sm:p-5 border-b border-[#3B182E]/10 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-[#3B182E]">
                  Illustrative Cohort Observations & OLS Error Decomposition
                </h3>
                <p className="text-xs text-[#75485E]">
                  Residual eᵢ = yᵢ - ŷᵢ represents the individual discrepancy between actual student score and model prediction.
                </p>
              </div>
              <div className="text-xs font-mono font-medium text-[#1D4ED8] tabular-nums hidden sm:block">
                Min Sum of Squares (SSE) = {MODEL.sse.toFixed(2)}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#3B182E]">
                <thead className="bg-[#F2ECE3] text-[#75485E] font-medium border-b border-[#3B182E]/10 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th scope="col" className="px-4 py-3">Student</th>
                    <th scope="col" className="px-4 py-3">Study Hours (xᵢ)</th>
                    <th scope="col" className="px-4 py-3">Actual Score (yᵢ)</th>
                    <th scope="col" className="px-4 py-3">Model ŷᵢ (6.42x+28)</th>
                    <th scope="col" className="px-4 py-3">Residual (eᵢ = y - ŷ)</th>
                    <th scope="col" className="px-4 py-3">Squared Error (eᵢ²)</th>
                    <th scope="col" className="px-4 py-3">Deviation (xᵢ - x̄)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3B182E]/10 font-mono">
                  {MODEL.points.map((pt: DetailedPoint, idx: number) => {
                    const isPositive = pt.residual >= 0;
                    return (
                      <tr key={pt.id} className={idx % 2 === 0 ? 'bg-[#FAF7F2]' : 'bg-[#F9F5EF]'}>
                        <td className="px-4 py-2.5 font-sans font-medium text-[#3B182E]">{pt.student}</td>
                        <td className="px-4 py-2.5 tabular-nums">{pt.hours} hr</td>
                        <td className="px-4 py-2.5 font-semibold tabular-nums">{pt.score}%</td>
                        <td className="px-4 py-2.5 text-[#1D4ED8] tabular-nums">{pt.predictedScore.toFixed(2)}%</td>
                        <td className="px-4 py-2.5 tabular-nums">
                          <span className={isPositive ? 'text-emerald-700 font-medium' : 'text-rose-700 font-medium'}>
                            {isPositive ? '+' : ''}{pt.residual.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-[#6B475D] tabular-nums">{pt.squaredResidual.toFixed(3)}</td>
                        <td className="px-4 py-2.5 text-[#75485E] tabular-nums">
                          {pt.xDeviation >= 0 ? '+' : ''}{pt.xDeviation.toFixed(1)}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Totals / Summary Row */}
                  <tr className="bg-[#EFE7DC] font-bold text-[#3B182E] border-t-2 border-[#3B182E]/20">
                    <td className="px-4 py-3 font-sans">Summary (∑)</td>
                    <td className="px-4 py-3 tabular-nums">∑x = {MODEL.sumX}h</td>
                    <td className="px-4 py-3 tabular-nums">∑y = {MODEL.sumY}%</td>
                    <td className="px-4 py-3 tabular-nums">—</td>
                    <td className="px-4 py-3 tabular-nums text-[#1D4ED8]">
                      ∑eᵢ = 0.00 (Balanced!)
                    </td>
                    <td className="px-4 py-3 tabular-nums text-[#3B182E]">
                      SSE = {MODEL.sse.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 tabular-nums">∑(x - x̄) = 0.0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3.5 bg-[#FAF7F2] text-[11px] text-[#75485E] border-t border-[#3B182E]/10">
              <strong>Mathematical Verification:</strong> The sum of all residuals ∑eᵢ = 0 is a mathematical law of Ordinary Least Squares regression with an intercept. 
              The SSE of {MODEL.sse.toFixed(2)} is the lowest possible quadratic error across all linear configurations in 2D space.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
