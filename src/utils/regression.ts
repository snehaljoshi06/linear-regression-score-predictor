/**
 * Ordinary Least Squares (OLS) Linear Regression Utility
 * Supports both the exact poster dataset (MIT AOE CSE AIML Unit 05)
 * and the alternative illustrative presentation dataset.
 */

export interface DataPoint {
  id: number;
  student: string;
  hours: number; // x
  score: number; // y
}

export interface DetailedPoint extends DataPoint {
  predictedScore: number; // y_hat
  residual: number; // e_i = y - y_hat
  squaredResidual: number; // e_i^2
  xDeviation: number; // x - x_bar
  yDeviation: number; // y - y_bar
  xyProductDeviation: number; // (x - x_bar)(y - y_bar)
  xSquaredDeviation: number; // (x - x_bar)^2
}

export interface RegressionModel {
  datasetKey: 'poster' | 'alternate';
  datasetName: string;
  n: number;
  meanX: number;
  meanY: number;
  sumX: number;
  sumY: number;
  sumXSquared: number;
  sumYSquared: number;
  sumXY: number;
  ssXX: number;
  ssYY: number;
  ssXY: number;
  slope: number; // m or beta_1
  intercept: number; // c or beta_0
  displaySlope: number;
  displayIntercept: number;
  r: number; // Pearson correlation coefficient
  rSquared: number; // Coefficient of determination
  sse: number; // Sum of squared errors
  standardError: number; // s_e
  points: DetailedPoint[];
  predict: (hours: number) => number;
}

/**
 * Dataset 1: Exact dataset from the student's poster:
 * MIT AOE | CSE (AIML) | Unit 05 | Group 4
 * (1,35), (2,42), (3,50), (4,55), (5,62), (6,68), (7,72), (8,80)
 * Poster fitted equation: y = 6.35x + 28.21
 */
export const POSTER_DATASET: DataPoint[] = [
  { id: 1, student: "Student 1", hours: 1, score: 35 },
  { id: 2, student: "Student 2", hours: 2, score: 42 },
  { id: 3, student: "Student 3", hours: 3, score: 50 },
  { id: 4, student: "Student 4", hours: 4, score: 55 },
  { id: 5, student: "Student 5", hours: 5, score: 62 },
  { id: 6, student: "Student 6", hours: 6, score: 68 },
  { id: 7, student: "Student 7", hours: 7, score: 72 },
  { id: 8, student: "Student 8", hours: 8, score: 80 },
];

/**
 * Dataset 2: Alternative illustrative dataset specified in initial prompt:
 * (1,35), (2,40), (3,48), (4,52), (5,61), (6,67), (7,73), (8,79)
 * Exact least squares: y = (77/12)x + 28 = 6.4167x + 28.00
 */
export const ALTERNATE_DATASET: DataPoint[] = [
  { id: 1, student: "Student 1", hours: 1, score: 35 },
  { id: 2, student: "Student 2", hours: 2, score: 40 },
  { id: 3, student: "Student 3", hours: 3, score: 48 },
  { id: 4, student: "Student 4", hours: 4, score: 52 },
  { id: 5, student: "Student 5", hours: 5, score: 61 },
  { id: 6, student: "Student 6", hours: 6, score: 67 },
  { id: 7, student: "Student 7", hours: 7, score: 73 },
  { id: 8, student: "Student 8", hours: 8, score: 79 },
];

export function calculateRegression(
  data: DataPoint[],
  datasetKey: 'poster' | 'alternate' = 'poster',
  usePosterPrintedParams: boolean = true
): RegressionModel {
  const n = data.length;
  const sumX = data.reduce((acc, p) => acc + p.hours, 0);
  const sumY = data.reduce((acc, p) => acc + p.score, 0);
  const meanX = sumX / n;
  const meanY = sumY / n;

  const sumXSquared = data.reduce((acc, p) => acc + p.hours * p.hours, 0);
  const sumYSquared = data.reduce((acc, p) => acc + p.score * p.score, 0);
  const sumXY = data.reduce((acc, p) => acc + p.hours * p.score, 0);

  const ssXX = sumXSquared - (sumX * sumX) / n;
  const ssYY = sumYSquared - (sumY * sumY) / n;
  const ssXY = sumXY - (sumX * sumY) / n;

  const exactSlope = ssXY / ssXX;
  const exactIntercept = meanY - exactSlope * meanX;

  // If poster dataset and requested to match the poster's printed equation y = 6.35x + 28.21:
  const slope = datasetKey === 'poster' && usePosterPrintedParams ? 6.35 : exactSlope;
  const intercept = datasetKey === 'poster' && usePosterPrintedParams ? 28.21 : exactIntercept;

  const r = ssXY / Math.sqrt(ssXX * ssYY);
  const rSquared = r * r;

  const predict = (x: number) => slope * x + intercept;

  let sse = 0;
  const points: DetailedPoint[] = data.map((pt) => {
    const yHat = predict(pt.hours);
    const residual = pt.score - yHat;
    const squaredResidual = residual * residual;
    const xDev = pt.hours - meanX;
    const yDev = pt.score - meanY;
    sse += squaredResidual;

    return {
      ...pt,
      predictedScore: yHat,
      residual,
      squaredResidual,
      xDeviation: xDev,
      yDeviation: yDev,
      xyProductDeviation: xDev * yDev,
      xSquaredDeviation: xDev * xDev,
    };
  });

  const degreesOfFreedom = n - 2;
  const standardError = Math.sqrt(sse / degreesOfFreedom);

  return {
    datasetKey,
    datasetName: datasetKey === 'poster' ? 'Poster Dataset (MIT AOE)' : 'Alternative Dataset',
    n,
    meanX,
    meanY,
    sumX,
    sumY,
    sumXSquared,
    sumYSquared,
    sumXY,
    ssXX,
    ssYY,
    ssXY,
    slope,
    intercept,
    displaySlope: Number(slope.toFixed(2)),
    displayIntercept: Number(intercept.toFixed(2)),
    r,
    rSquared,
    sse,
    standardError,
    points,
    predict,
  };
}

export const POSTER_MODEL = calculateRegression(POSTER_DATASET, 'poster', true);
export const ALTERNATE_MODEL = calculateRegression(ALTERNATE_DATASET, 'alternate', false);
export const MODEL = POSTER_MODEL;
