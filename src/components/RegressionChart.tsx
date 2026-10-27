import React, { useState, useId } from 'react';
import { MODEL, DataPoint, DetailedPoint } from '../utils/regression';
import { Layers, Crosshair, HelpCircle, Activity } from 'lucide-react';

interface RegressionChartProps {
  currentHours: number;
  predictedScore: number;
  onSelectHours: (hours: number) => void;
}

export const RegressionChart: React.FC<RegressionChartProps> = ({
  currentHours,
  predictedScore,
  onSelectHours,
}) => {
  const [showResiduals, setShowResiduals] = useState<boolean>(true);
  const [showCentroid, setShowCentroid] = useState<boolean>(true);
  const [showPredictionBand, setShowPredictionBand] = useState<boolean>(false);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  // Chart Dimensions & Coordinate Bounds
  const width = 640;
  const height = 440;
  const margin = { top: 32, right: 36, bottom: 56, left: 60 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Domain & Range
  const minX = 0;
  const maxX = 10;
  const minY = 0;
  const maxY = 100;

  // Coordinate transforms
  const scaleX = (x: number) => margin.left + ((x - minX) / (maxX - minX)) * innerWidth;
  const scaleY = (y: number) => margin.top + innerHeight - ((y - minY) / (maxY - minY)) * innerHeight;

  // Regression line endpoints (from x = 0 to x = 10)
  const lineStart = { x: 0, y: MODEL.predict(0) };
  const lineEnd = { x: 10, y: MODEL.predict(10) };

  // Grid tick definitions
  const xTicks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const yTicks = [0, 20, 40, 60, 80, 100];

  const currentXPos = scaleX(currentHours);
  const currentYPos = scaleY(predictedScore);

  const centroidXPos = scaleX(MODEL.meanX);
  const centroidYPos = scaleY(MODEL.meanY);

  // Gradient ID for SVG
  const gradientId = useId();

  return (
    <div className="bg-[#FAF7F2] border border-[#3B182E]/15 rounded-xl p-4 sm:p-6 shadow-sm">
      {/* Chart Top Bar & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-2 border-b border-[#3B182E]/10">
        <div>
          <h2 className="font-serif font-bold text-lg text-[#3B182E]">
            Empirical Scatter Plot & Fitted Regression Line
          </h2>
          <p className="text-xs text-[#75485E] mt-0.5">
            Sample size N = 8 · Fitted line: <span className="font-mono font-medium text-[#1D4ED8]">ŷ = 6.42x + 28.00</span>
          </p>
        </div>

        {/* Visual Inspection Toggles */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setShowResiduals(!showResiduals)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              showResiduals
                ? 'bg-[#3B182E] text-[#FAF7F2]'
                : 'bg-[#FAF7F2] text-[#75485E] hover:bg-[#F2ECE3] border border-[#3B182E]/15'
            }`}
          >
            Residuals (eᵢ)
          </button>

          <button
            type="button"
            onClick={() => setShowCentroid(!showCentroid)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              showCentroid
                ? 'bg-[#3B182E] text-[#FAF7F2]'
                : 'bg-[#FAF7F2] text-[#75485E] hover:bg-[#F2ECE3] border border-[#3B182E]/15'
            }`}
          >
            Centroid (x̄, ȳ)
          </button>

          <button
            type="button"
            onClick={() => setShowPredictionBand(!showPredictionBand)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              showPredictionBand
                ? 'bg-[#3B182E] text-[#FAF7F2]'
                : 'bg-[#FAF7F2] text-[#75485E] hover:bg-[#F2ECE3] border border-[#3B182E]/15'
            }`}
          >
            Error Band
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full aspect-[16/11] max-w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id={`${gradientId}-band`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* Plot Background Area */}
          <rect
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="#FDFBF7"
            stroke="#3B182E"
            strokeOpacity="0.12"
            strokeWidth="1"
            rx="4"
          />

          {/* Grid lines - Horizontal */}
          {yTicks.map((tick) => {
            const y = scaleY(tick);
            return (
              <g key={`y-${tick}`}>
                <line
                  x1={margin.left}
                  y1={y}
                  x2={margin.left + innerWidth}
                  y2={y}
                  stroke="#3B182E"
                  strokeOpacity={tick === 0 ? "0.25" : "0.06"}
                  strokeDasharray={tick === 0 ? "none" : "3,3"}
                />
                <text
                  x={margin.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="font-mono text-[11px] fill-[#75485E] tabular-nums"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* Grid lines - Vertical */}
          {xTicks.map((tick) => {
            const x = scaleX(tick);
            return (
              <g key={`x-${tick}`}>
                <line
                  x1={x}
                  y1={margin.top}
                  x2={x}
                  y2={margin.top + innerHeight}
                  stroke="#3B182E"
                  strokeOpacity={tick === 0 ? "0.25" : "0.06"}
                  strokeDasharray={tick === 0 ? "none" : "3,3"}
                />
                <text
                  x={x}
                  y={margin.top + innerHeight + 18}
                  textAnchor="middle"
                  className="font-mono text-[11px] fill-[#75485E] tabular-nums"
                >
                  {tick}h
                </text>
              </g>
            );
          })}

          {/* Axis Labels */}
          <text
            x={margin.left + innerWidth / 2}
            y={height - 12}
            textAnchor="middle"
            className="font-sans font-medium text-xs fill-[#3B182E] tracking-wide"
          >
            Study Duration in Hours (x)
          </text>

          <text
            transform={`rotate(-90, 16, ${margin.top + innerHeight / 2})`}
            x={16}
            y={margin.top + innerHeight / 2}
            textAnchor="middle"
            className="font-sans font-medium text-xs fill-[#3B182E] tracking-wide"
          >
            Exam Score Percentage (y)
          </text>

          {/* Optional Prediction Band */}
          {showPredictionBand && (
            <path
              d={`
                M ${scaleX(0)} ${scaleY(MODEL.predict(0) + MODEL.standardError * 2)}
                L ${scaleX(10)} ${scaleY(MODEL.predict(10) + MODEL.standardError * 2)}
                L ${scaleX(10)} ${scaleY(MODEL.predict(10) - MODEL.standardError * 2)}
                L ${scaleX(0)} ${scaleY(MODEL.predict(0) - MODEL.standardError * 2)}
                Z
              `}
              fill={`url(#${gradientId}-band)`}
            />
          )}

          {/* Residual Vertical Lines (showing vertical distance from actual y to fitted line y_hat) */}
          {showResiduals &&
            MODEL.points.map((pt: DetailedPoint) => {
              const x = scaleX(pt.hours);
              const actualY = scaleY(pt.score);
              const predictedY = scaleY(pt.predictedScore);
              const isPositive = pt.residual >= 0;

              return (
                <g key={`residual-${pt.id}`}>
                  <line
                    x1={x}
                    y1={actualY}
                    x2={x}
                    y2={predictedY}
                    stroke={isPositive ? "#2563EB" : "#DC2626"}
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                    strokeOpacity="0.8"
                  />
                  {/* Small tick at the regression line intersection */}
                  <circle
                    cx={x}
                    cy={predictedY}
                    r="2"
                    fill={isPositive ? "#2563EB" : "#DC2626"}
                    fillOpacity="0.7"
                  />
                </g>
              );
            })}

          {/* The Fitted Regression Line: y = 6.42x + 28.00 */}
          <line
            x1={scaleX(lineStart.x)}
            y1={scaleY(lineStart.y)}
            x2={scaleX(lineEnd.x)}
            y2={scaleY(lineEnd.y)}
            stroke="#1D4ED8"
            strokeWidth="2.75"
            strokeLinecap="round"
          />

          {/* Centroid Reference: (x̄ = 4.5, ȳ = 56.88) */}
          {showCentroid && (
            <g className="cursor-pointer">
              <line
                x1={scaleX(minX)}
                y1={centroidYPos}
                x2={scaleX(maxX)}
                y2={centroidYPos}
                stroke="#6B475D"
                strokeWidth="1"
                strokeDasharray="3,3"
                strokeOpacity="0.35"
              />
              <line
                x1={centroidXPos}
                y1={scaleY(minY)}
                x2={centroidXPos}
                y2={scaleY(maxY)}
                stroke="#6B475D"
                strokeWidth="1"
                strokeDasharray="3,3"
                strokeOpacity="0.35"
              />
              <circle
                cx={centroidXPos}
                cy={centroidYPos}
                r="5"
                fill="#FAF7F2"
                stroke="#3B182E"
                strokeWidth="2"
              />
              <text
                x={centroidXPos + 8}
                y={centroidYPos - 8}
                className="font-mono text-[10px] font-medium fill-[#3B182E] select-none"
              >
                (x̄=4.5, ȳ=56.9)
              </text>
            </g>
          )}

          {/* Dynamic Projection Lines for Current User Selected Slider Value */}
          <line
            x1={currentXPos}
            y1={margin.top + innerHeight}
            x2={currentXPos}
            y2={currentYPos}
            stroke="#2563EB"
            strokeWidth="1.75"
            strokeDasharray="4,4"
          />
          <line
            x1={margin.left}
            y1={currentYPos}
            x2={currentXPos}
            y2={currentYPos}
            stroke="#2563EB"
            strokeWidth="1.75"
            strokeDasharray="4,4"
          />

          {/* Current Projected Point Marker */}
          <g>
            <circle
              cx={currentXPos}
              cy={currentYPos}
              r="10"
              fill="#2563EB"
              fillOpacity="0.18"
            />
            <circle
              cx={currentXPos}
              cy={currentYPos}
              r="5"
              fill="#2563EB"
              stroke="#FAF7F2"
              strokeWidth="2"
            />
            {/* Coordinate Label */}
            <g transform={`translate(${currentXPos > width - 120 ? currentXPos - 90 : currentXPos + 10}, ${currentYPos < margin.top + 30 ? currentYPos + 22 : currentYPos - 12})`}>
              <rect
                x="0"
                y="-14"
                width="84"
                height="20"
                rx="4"
                fill="#1E3A8A"
                fillOpacity="0.95"
              />
              <text
                x="42"
                y="0"
                textAnchor="middle"
                className="font-mono text-[10px] font-semibold fill-white tabular-nums"
              >
                ({currentHours.toFixed(1)}h, {predictedScore.toFixed(1)}%)
              </text>
            </g>
          </g>

          {/* Empirical Data Points (The 8 student observations) */}
          {MODEL.points.map((pt: DetailedPoint) => {
            const cx = scaleX(pt.hours);
            const cy = scaleY(pt.score);
            const isHovered = hoveredPoint?.id === pt.id;

            return (
              <g
                key={`point-${pt.id}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
                onClick={() => onSelectHours(pt.hours)}
              >
                {/* Hit area */}
                <circle cx={cx} cy={cy} r="14" fill="transparent" />

                {/* Outer ring on hover */}
                {isHovered && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="8"
                    fill="#3B182E"
                    fillOpacity="0.15"
                  />
                )}

                {/* Point circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="4.5"
                  fill="#3B182E"
                  stroke="#FAF7F2"
                  strokeWidth="1.5"
                />

                {/* Quiet Data Point Label */}
                <text
                  x={cx}
                  y={cy - 8}
                  textAnchor="middle"
                  className="font-mono text-[9px] fill-[#75485E] tabular-nums select-none opacity-80"
                >
                  ({pt.hours},{pt.score})
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip for Hovered Point */}
        {hoveredPoint && (
          <div
            className="absolute z-20 pointer-events-none bg-[#3B182E] text-[#FAF7F2] text-xs p-2.5 rounded-lg shadow-lg border border-[#FAF7F2]/20"
            style={{
              left: `${(scaleX(hoveredPoint.hours) / width) * 100}%`,
              top: `${(scaleY(hoveredPoint.score) / height) * 100}%`,
              transform: 'translate(-50%, -125%)',
            }}
          >
            <div className="font-semibold text-white mb-1">
              {hoveredPoint.student}
            </div>
            <div className="font-mono space-y-0.5 text-[11px] text-[#FAF7F2]/90 tabular-nums">
              <div>Study Time: <span className="text-white font-medium">{hoveredPoint.hours} hr(s)</span></div>
              <div>Actual Score: <span className="text-white font-medium">{hoveredPoint.score}%</span></div>
              <div>Model Prediction: <span className="text-blue-300 font-medium">{MODEL.predict(hoveredPoint.hours).toFixed(2)}%</span></div>
              <div>
                Residual Error: {' '}
                <span className={hoveredPoint.score - MODEL.predict(hoveredPoint.hours) >= 0 ? "text-emerald-300 font-medium" : "text-amber-300 font-medium"}>
                  {(hoveredPoint.score - MODEL.predict(hoveredPoint.hours) >= 0 ? '+' : '')}
                  {(hoveredPoint.score - MODEL.predict(hoveredPoint.hours)).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend & Guide Bar */}
      <div className="mt-4 pt-3 border-t border-[#3B182E]/10 flex flex-wrap items-center justify-between gap-y-2 text-xs text-[#75485E]">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#1D4ED8]" />
            <span>Regression Line (ŷ)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B182E]" />
            <span>Sample Data (N=8)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] ring-2 ring-[#2563EB]/30" />
            <span>Your Selected Study Point</span>
          </div>
          {showResiduals && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-t border-dashed border-[#2563EB]" />
              <span>Residual Deviations (eᵢ)</span>
            </div>
          )}
        </div>
        <p className="text-[11px] text-[#8C6B80]">
          Click any data point to set the slider to that student's study hours.
        </p>
      </div>
    </div>
  );
};
