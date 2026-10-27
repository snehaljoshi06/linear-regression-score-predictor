import React, { useState } from 'react';
import { POSTER_MODEL, ALTERNATE_MODEL, RegressionModel } from '../utils/regression';
import { X, Copy, Check, Sigma, Table as TableIcon, FileText } from 'lucide-react';

interface DerivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDatasetKey: 'poster' | 'alternate';
}

export const DerivationModal: React.FC<DerivationModalProps> = ({
  isOpen,
  onClose,
  activeDatasetKey,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedKey, setSelectedKey] = useState<'poster' | 'alternate'>(activeDatasetKey);

  if (!isOpen) return null;

  const model: RegressionModel = selectedKey === 'poster' ? POSTER_MODEL : ALTERNATE_MODEL;

  const handleCopyEquation = () => {
    navigator.clipboard.writeText(`y = ${model.displaySlope.toFixed(2)}x + ${model.displayIntercept.toFixed(2)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#ECE6DC] text-[#271428] rounded-xl border border-[#271428]/30 shadow-2xl overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="derivation-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#E2DACD] border-b border-[#271428]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sigma className="w-5 h-5 text-[#2C55D4]" />
            <h2 id="derivation-title" className="font-serif font-bold text-lg text-[#271428]">
              Mathematical Derivation: Ordinary Least Squares (OLS)
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close mathematical derivation dialog"
            className="p-1.5 rounded-lg text-[#271428] hover:bg-[#D4C9BA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Dataset Selector inside modal */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#E4DDD0] rounded-lg border border-[#271428]/20">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#5E3B5A]">
              Inspecting Regression Formula:
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedKey('poster')}
                className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                  selectedKey === 'poster'
                    ? 'bg-[#271428] text-[#ECE6DC]'
                    : 'bg-[#DCD4C6] text-[#271428]'
                }`}
              >
                Poster Model (y = 6.35x + 28.21)
              </button>
              <button
                type="button"
                onClick={() => setSelectedKey('alternate')}
                className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                  selectedKey === 'alternate'
                    ? 'bg-[#271428] text-[#ECE6DC]'
                    : 'bg-[#DCD4C6] text-[#271428]'
                }`}
              >
                Alternative Dataset (y = 6.42x + 28.00)
              </button>
              <button
                type="button"
                onClick={handleCopyEquation}
                className="px-2.5 py-1 text-xs font-medium rounded bg-[#DCD4C6] hover:bg-[#D0C6B5] transition-colors flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Theoretical Foundations */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-[#271428]">
              The Objective Function
            </h3>
            <p className="text-xs text-[#5E3B5A] leading-relaxed">
              Simple linear regression fits a line <span className="font-mono font-bold">ŷ = mx + c</span> (or <span className="font-mono">ŷ = β₁x + β₀</span>) 
              such that the sum of the squared vertical differences between observed scores <span className="font-mono">yᵢ</span> and 
              predicted scores <span className="font-mono">ŷᵢ</span> is strictly minimized:
            </p>
            <div className="bg-[#E4DDD0] p-3 rounded font-mono text-center text-sm font-bold text-[#271428] border border-[#271428]/15">
              S(m, c) = ∑ᵢ₌₁ⁿ (yᵢ - (m·xᵢ + c))² → MINIMUM
            </div>
          </div>

          {/* Derivation Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="bg-[#E4DDD0] p-4 rounded border border-[#271428]/20 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E3B5A]">
                Step 1: Compute Centroids
              </span>
              <div className="font-serif font-bold text-sm text-[#271428]">
                Means (x̄, ȳ)
              </div>
              <div className="font-mono text-xs text-[#271428] space-y-1">
                <div>x̄ = ∑x / n = {model.sumX} / {model.n} = <strong className="text-[#2C55D4]">{model.meanX.toFixed(2)}</strong></div>
                <div>ȳ = ∑y / n = {model.sumY} / {model.n} = <strong className="text-[#2C55D4]">{model.meanY.toFixed(2)}</strong></div>
              </div>
              <p className="text-[11px] text-[#5E3B5A] pt-1">
                The fitted line must pass through the pivot coordinate (x̄, ȳ).
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#E4DDD0] p-4 rounded border border-[#271428]/20 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E3B5A]">
                Step 2: Sums of Squares
              </span>
              <div className="font-serif font-bold text-sm text-[#271428]">
                SS_xx &amp; SS_xy
              </div>
              <div className="font-mono text-xs text-[#271428] space-y-1">
                <div>SS_xx = ∑(x - x̄)² = <strong className="text-[#271428]">{model.ssXX.toFixed(2)}</strong></div>
                <div>SS_xy = ∑(x - x̄)(y - ȳ) = <strong className="text-[#271428]">{model.ssXY.toFixed(2)}</strong></div>
              </div>
              <p className="text-[11px] text-[#5E3B5A] pt-1">
                SS_xy quantifies co-variation between study hours and exam mark gains.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#E4DDD0] p-4 rounded border border-[#271428]/20 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E3B5A]">
                Step 3: Solve Slope &amp; Intercept
              </span>
              <div className="font-serif font-bold text-sm text-[#271428]">
                Slope (m) &amp; Intercept (c)
              </div>
              <div className="font-mono text-xs text-[#271428] space-y-1">
                <div>m = SS_xy / SS_xx = <strong className="text-[#2C55D4]">{model.displaySlope.toFixed(2)}</strong></div>
                <div>c = ȳ - m·x̄ = <strong className="text-[#2C55D4]">{model.displayIntercept.toFixed(2)}</strong></div>
              </div>
              <p className="text-[11px] text-[#5E3B5A] pt-1">
                Yields model equation <strong className="text-[#271428]">y = {model.displaySlope.toFixed(2)}x + {model.displayIntercept.toFixed(2)}</strong>
              </p>
            </div>
          </div>

          {/* Full Data & Residuals Table */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-base text-[#271428]">
              Empirical Observation Decomposition Table
            </h3>
            <div className="overflow-x-auto border border-[#271428]/25 rounded">
              <table className="w-full text-center text-xs text-[#271428]">
                <thead className="bg-[#DDD5C5] font-bold border-b border-[#271428]/20">
                  <tr>
                    <th scope="col" className="px-3 py-2">Student</th>
                    <th scope="col" className="px-3 py-2">Study Hours (xᵢ)</th>
                    <th scope="col" className="px-3 py-2">Observed Score (yᵢ)</th>
                    <th scope="col" className="px-3 py-2">Predicted ŷᵢ</th>
                    <th scope="col" className="px-3 py-2">Residual eᵢ = y - ŷ</th>
                    <th scope="col" className="px-3 py-2">Squared Error eᵢ²</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#271428]/15 font-mono text-[11px]">
                  {model.points.map((pt, idx) => {
                    const isPos = pt.residual >= 0;
                    return (
                      <tr key={pt.id} className={idx % 2 === 0 ? 'bg-[#ECE6DC]' : 'bg-[#E5DED1]'}>
                        <td className="px-3 py-1.5 font-sans font-medium">{pt.student}</td>
                        <td className="px-3 py-1.5 tabular-nums">{pt.hours}</td>
                        <td className="px-3 py-1.5 font-bold tabular-nums">{pt.score}%</td>
                        <td className="px-3 py-1.5 text-[#2C55D4] tabular-nums">{pt.predictedScore.toFixed(2)}%</td>
                        <td className="px-3 py-1.5 tabular-nums">
                          <span className={isPos ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                            {isPos ? '+' : ''}{pt.residual.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-3 py-1.5 tabular-nums">{pt.squaredResidual.toFixed(3)}</td>
                      </tr>
                    );
                  })}
                  <tr className="bg-[#DDD5C5] font-bold border-t-2 border-[#271428]/30">
                    <td className="px-3 py-2 font-sans">Sum (∑)</td>
                    <td className="px-3 py-2">∑x = {model.sumX}</td>
                    <td className="px-3 py-2">∑y = {model.sumY}</td>
                    <td className="px-3 py-2">—</td>
                    <td className="px-3 py-2 text-[#2C55D4]">
                      ∑eᵢ = {model.points.reduce((acc, p) => acc + p.residual, 0).toFixed(2)}
                    </td>
                    <td className="px-3 py-2">
                      SSE = {model.sse.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#E2DACD] border-t border-[#271428]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold rounded bg-[#271428] text-[#ECE6DC] hover:bg-[#3D1E3E] transition-colors"
          >
            Close Proof
          </button>
        </div>
      </div>
    </div>
  );
};
