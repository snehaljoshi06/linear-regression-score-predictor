import React, { useState } from 'react';
import { DataPoint, RegressionModel } from '../utils/regression';

interface PosterGraphProps {
  model: RegressionModel;
  currentHours: number;
  predictedScore: number;
  onHoursChange: (hours: number) => void;
  showResiduals?: boolean;
}

export const PosterGraph: React.FC<PosterGraphProps> = ({
  model,
  currentHours,
  predictedScore,
  onHoursChange,
  showResiduals = false,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  // SVG coordinate dimensions
  const width = 520;
  const height = 400;
  const margin = { top: 30, right: 30, bottom: 50, left: 60 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const minX = 0;
  const maxX = 10;
  const minY = 0;
  const maxY = 100;

  const scaleX = (x: number) => margin.left + ((x - minX) / (maxX - minX)) * innerWidth;
  const scaleY = (y: number) => margin.top + innerHeight - ((y - minY) / (maxY - minY)) * innerHeight;

  const xTicks = [0, 2, 4, 6, 8, 10];
  const yTicks = [0, 20, 40, 60, 80, 100];

  const currentX = scaleX(currentHours);
  const currentY = scaleY(predictedScore);

  // Handle clicking directly on the plot to set study hours
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const svgX = (clickX / rect.width) * width;

    if (svgX >= margin.left && svgX <= margin.left + innerWidth) {
      const hours = minX + ((svgX - margin.left) / innerWidth) * (maxX - minX);
      const roundedHours = Math.round(Math.min(10, Math.max(1, hours)) * 10) / 10;
      onHoursChange(roundedHours);
    }
  };

  return (
    <div className="relative w-full aspect-[4/3] max-w-full select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full cursor-crosshair overflow-visible"
        onClick={handleSvgClick}
      >
        {/* Subtle coordinate grid lines */}
        {yTicks.map((tick) => {
          const y = scaleY(tick);
          return (
            <g key={`y-${tick}`}>
              <line
                x1={margin.left}
                y1={y}
                x2={margin.left + innerWidth}
                y2={y}
                stroke="#271428"
                strokeWidth={tick === 0 ? "1.5" : "0.5"}
                strokeOpacity={tick === 0 ? "0.8" : "0.15"}
              />
              {/* Tick marks on left axis */}
              <line
                x1={margin.left - 5}
                y1={y}
                x2={margin.left}
                y2={y}
                stroke="#271428"
                strokeWidth="1"
                strokeOpacity="0.8"
              />
              <text
                x={margin.left - 10}
                y={y + 4}
                textAnchor="end"
                className="font-sans text-[11px] font-medium fill-[#271428] tabular-nums"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* X-axis ticks */}
        {xTicks.map((tick) => {
          const x = scaleX(tick);
          return (
            <g key={`x-${tick}`}>
              <line
                x1={x}
                y1={margin.top}
                x2={x}
                y2={margin.top + innerHeight}
                stroke="#271428"
                strokeWidth={tick === 0 ? "1.5" : "0.5"}
                strokeOpacity={tick === 0 ? "0.8" : "0.15"}
              />
              {/* Tick marks on bottom axis */}
              <line
                x1={x}
                y1={margin.top + innerHeight}
                x2={x}
                y2={margin.top + innerHeight + 5}
                stroke="#271428"
                strokeWidth="1"
                strokeOpacity="0.8"
              />
              <text
                x={x}
                y={margin.top + innerHeight + 18}
                textAnchor="middle"
                className="font-sans text-[11px] font-medium fill-[#271428] tabular-nums"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* Axis Labels (Matching poster typography) */}
        <text
          x={margin.left + innerWidth / 2}
          y={margin.top + innerHeight + 36}
          textAnchor="middle"
          className="font-sans text-xs font-semibold fill-[#271428] tracking-wide"
        >
          Study Hours
        </text>

        <text
          transform={`rotate(-90, 18, ${margin.top + innerHeight / 2})`}
          x={18}
          y={margin.top + innerHeight / 2}
          textAnchor="middle"
          className="font-sans text-xs font-semibold fill-[#271428] tracking-wide"
        >
          Exam Score (%)
        </text>

        {/* Optional: Residual Error Lines */}
        {showResiduals &&
          model.points.map((pt) => {
            const x = scaleX(pt.hours);
            const actualY = scaleY(pt.score);
            const fitY = scaleY(model.predict(pt.hours));
            return (
              <line
                key={`res-${pt.id}`}
                x1={x}
                y1={actualY}
                x2={x}
                y2={fitY}
                stroke="#DC2626"
                strokeWidth="1.2"
                strokeDasharray="2,2"
              />
            );
          })}

        {/* The Bold Blue Regression Line (Exact match to poster) */}
        <line
          x1={scaleX(0)}
          y1={scaleY(model.predict(0))}
          x2={scaleX(10)}
          y2={scaleY(model.predict(10))}
          stroke="#2C55D4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Interactive Vertical Dotted Line at Selected Hours */}
        <line
          x1={currentX}
          y1={margin.top + innerHeight}
          x2={currentX}
          y2={currentY}
          stroke="#271428"
          strokeWidth="1.5"
          strokeDasharray="3,3"
        />

        {/* Interactive Target Dot at (currentHours, predictedScore) */}
        <circle
          cx={currentX}
          cy={currentY}
          r="6.5"
          fill="#271428"
          stroke="#ECE6DC"
          strokeWidth="1.5"
        />

        {/* Prediction Label Callout (Matches "Predicted score ≈ 66%" from poster) */}
        <g
          transform={`translate(${
            currentX > width - 150 ? currentX - 130 : currentX + 12
          }, ${currentY < margin.top + 40 ? currentY + 30 : currentY - 14})`}
        >
          <rect
            x="0"
            y="-18"
            width="120"
            height="34"
            rx="4"
            fill="#ECE6DC"
            stroke="#271428"
            strokeWidth="0.8"
            className="shadow-sm"
          />
          <text
            x="8"
            y="-3"
            className="font-sans text-[11px] font-bold fill-[#271428]"
          >
            Predicted score
          </text>
          <text
            x="8"
            y="11"
            className="font-sans text-[13px] font-black fill-[#2C55D4] tabular-nums"
          >
            ≈ {Math.round(predictedScore)}%{' '}
            <tspan className="font-mono text-[10px] font-normal fill-[#5E3B5A]">
              ({predictedScore.toFixed(1)}%)
            </tspan>
          </text>
        </g>

        {/* Empirical Data Points (The 8 students) */}
        {model.points.map((pt) => {
          const cx = scaleX(pt.hours);
          const cy = scaleY(pt.score);
          const isHovered = hoveredPoint?.id === pt.id;

          return (
            <g
              key={`dot-${pt.id}`}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(pt)}
              onMouseLeave={() => setHoveredPoint(null)}
              onClick={(e) => {
                e.stopPropagation();
                onHoursChange(pt.hours);
              }}
            >
              {/* Invisible large touch/hover area */}
              <circle cx={cx} cy={cy} r="14" fill="transparent" />

              {/* Hover ring */}
              {isHovered && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="7.5"
                  fill="#2C55D4"
                  fillOpacity="0.25"
                />
              )}

              {/* Solid dark plum data point */}
              <circle
                cx={cx}
                cy={cy}
                r="4.25"
                fill="#271428"
              />
            </g>
          );
        })}
      </svg>

      {/* Floating Hover Tooltip */}
      {hoveredPoint && (
        <div
          className="absolute z-20 pointer-events-none bg-[#271428] text-[#ECE6DC] text-xs p-2.5 rounded shadow-lg border border-[#ECE6DC]/20"
          style={{
            left: `${(scaleX(hoveredPoint.hours) / width) * 100}%`,
            top: `${(scaleY(hoveredPoint.score) / height) * 100}%`,
            transform: 'translate(-50%, -125%)',
          }}
        >
          <div className="font-bold text-white mb-0.5">{hoveredPoint.student}</div>
          <div className="font-mono text-[11px] space-y-0.5 tabular-nums">
            <div>Study: {hoveredPoint.hours} hr(s)</div>
            <div>Actual Score: <span className="text-white font-bold">{hoveredPoint.score}%</span></div>
            <div>Model Fit: {model.predict(hoveredPoint.hours).toFixed(1)}%</div>
          </div>
        </div>
      )}
    </div>
  );
};
