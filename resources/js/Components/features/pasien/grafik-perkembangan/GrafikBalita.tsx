import { useMemo, useState } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ReferenceDot,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

// Generate data untuk Berat Badan (Weight) - Data WHO/CDC
export const generateBoyWeightPercentileData = () => {
  return [
    { month: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.3 },
    { month: 1, p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.7 },
    { month: 2, p3: 4.4, p15: 4.9, p50: 5.6, p85: 6.3, p97: 7.0 },
    { month: 3, p3: 5.1, p15: 5.6, p50: 6.4, p85: 7.2, p97: 7.9 },
    { month: 4, p3: 5.6, p15: 6.2, p50: 7.0, p85: 7.9, p97: 8.6 },
    { month: 5, p3: 6.1, p15: 6.7, p50: 7.5, p85: 8.4, p97: 9.2 },
    { month: 6, p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.9, p97: 9.7 },
    { month: 7, p3: 6.7, p15: 7.4, p50: 8.3, p85: 9.3, p97: 10.2 },
    { month: 8, p3: 7.0, p15: 7.7, p50: 8.6, p85: 9.6, p97: 10.5 },
    { month: 9, p3: 7.2, p15: 7.9, p50: 8.9, p85: 10.0, p97: 10.9 },
    { month: 10, p3: 7.5, p15: 8.2, p50: 9.2, p85: 10.3, p97: 11.2 },
    { month: 11, p3: 7.7, p15: 8.4, p50: 9.4, p85: 10.5, p97: 11.5 },
    { month: 12, p3: 7.8, p15: 8.6, p50: 9.6, p85: 10.8, p97: 11.8 },
    { month: 13, p3: 8.0, p15: 8.8, p50: 9.9, p85: 11.1, p97: 12.1 },
    { month: 14, p3: 8.2, p15: 9.0, p50: 10.1, p85: 11.3, p97: 12.4 },
    { month: 15, p3: 8.4, p15: 9.2, p50: 10.3, p85: 11.6, p97: 12.7 },
    { month: 16, p3: 8.5, p15: 9.4, p50: 10.5, p85: 11.8, p97: 12.9 },
    { month: 17, p3: 8.7, p15: 9.6, p50: 10.7, p85: 12.0, p97: 13.2 },
    { month: 18, p3: 8.9, p15: 9.7, p50: 10.9, p85: 12.3, p97: 13.5 },
    { month: 19, p3: 9.0, p15: 9.9, p50: 11.1, p85: 12.5, p97: 13.7 },
    { month: 20, p3: 9.2, p15: 10.1, p50: 11.3, p85: 12.7, p97: 14.0 },
    { month: 21, p3: 9.3, p15: 10.3, p50: 11.5, p85: 13.0, p97: 14.3 },
    { month: 22, p3: 9.5, p15: 10.5, p50: 11.8, p85: 13.2, p97: 14.5 },
    { month: 23, p3: 9.7, p15: 10.6, p50: 12.0, p85: 13.4, p97: 14.8 },
    { month: 24, p3: 9.8, p15: 10.8, p50: 12.2, p85: 13.7, p97: 15.1 },
    { month: 25, p3: 10.0, p15: 11.0, p50: 12.4, p85: 13.9, p97: 15.3 },
    { month: 26, p3: 10.1, p15: 11.1, p50: 12.5, p85: 14.1, p97: 15.6 },
    { month: 27, p3: 10.2, p15: 11.3, p50: 12.7, p85: 14.4, p97: 15.9 },
    { month: 28, p3: 10.4, p15: 11.5, p50: 12.9, p85: 14.6, p97: 16.1 },
    { month: 29, p3: 10.5, p15: 11.6, p50: 13.1, p85: 14.8, p97: 16.4 },
    { month: 30, p3: 10.7, p15: 11.8, p50: 13.3, p85: 15.0, p97: 16.6 },
    { month: 31, p3: 10.8, p15: 11.9, p50: 13.5, p85: 15.2, p97: 16.9 },
    { month: 32, p3: 10.9, p15: 12.1, p50: 13.7, p85: 15.5, p97: 17.1 },
    { month: 33, p3: 11.1, p15: 12.2, p50: 13.8, p85: 15.7, p97: 17.3 },
    { month: 34, p3: 11.2, p15: 12.4, p50: 14.0, p85: 15.9, p97: 17.6 },
    { month: 35, p3: 11.3, p15: 12.5, p50: 14.2, p85: 16.1, p97: 17.8 },
    { month: 36, p3: 11.4, p15: 12.7, p50: 14.3, p85: 16.3, p97: 18.0 },
    { month: 37, p3: 11.6, p15: 12.8, p50: 14.5, p85: 16.5, p97: 18.3 },
    { month: 38, p3: 11.7, p15: 12.9, p50: 14.7, p85: 16.7, p97: 18.5 },
    { month: 39, p3: 11.8, p15: 13.1, p50: 14.8, p85: 16.9, p97: 18.7 },
    { month: 40, p3: 11.9, p15: 13.2, p50: 15.0, p85: 17.1, p97: 19.0 },
    { month: 41, p3: 12.1, p15: 13.4, p50: 15.2, p85: 17.3, p97: 19.2 },
    { month: 42, p3: 12.2, p15: 13.5, p50: 15.3, p85: 17.5, p97: 19.4 },
    { month: 43, p3: 12.3, p15: 13.6, p50: 15.5, p85: 17.7, p97: 19.7 },
    { month: 44, p3: 12.4, p15: 13.8, p50: 15.7, p85: 17.9, p97: 19.9 },
    { month: 45, p3: 12.5, p15: 13.9, p50: 15.8, p85: 18.1, p97: 20.1 },
    { month: 46, p3: 12.7, p15: 14.1, p50: 16.0, p85: 18.3, p97: 20.4 },
    { month: 47, p3: 12.8, p15: 14.2, p50: 16.2, p85: 18.5, p97: 20.6 },
    { month: 48, p3: 12.9, p15: 14.3, p50: 16.3, p85: 18.7, p97: 20.9 },
    { month: 49, p3: 13.0, p15: 14.5, p50: 16.5, p85: 18.9, p97: 21.1 },
    { month: 50, p3: 13.1, p15: 14.6, p50: 16.7, p85: 19.1, p97: 21.3 },
    { month: 51, p3: 13.3, p15: 14.7, p50: 16.8, p85: 19.3, p97: 21.6 },
    { month: 52, p3: 13.4, p15: 14.9, p50: 17.0, p85: 19.5, p97: 21.8 },
    { month: 53, p3: 13.5, p15: 15.0, p50: 17.2, p85: 19.7, p97: 22.1 },
    { month: 54, p3: 13.6, p15: 15.2, p50: 17.3, p85: 19.9, p97: 22.3 },
    { month: 55, p3: 13.7, p15: 15.3, p50: 17.5, p85: 20.1, p97: 22.5 },
    { month: 56, p3: 13.8, p15: 15.4, p50: 17.7, p85: 20.3, p97: 22.8 },
    { month: 57, p3: 13.9, p15: 15.6, p50: 17.8, p85: 20.5, p97: 23.0 },
    { month: 58, p3: 14.1, p15: 15.7, p50: 18.0, p85: 20.7, p97: 23.3 },
    { month: 59, p3: 14.2, p15: 15.8, p50: 18.2, p85: 20.9, p97: 23.5 },
    { month: 60, p3: 14.3, p15: 16.0, p50: 18.3, p85: 21.1, p97: 23.8 },
  ];
};

export const generateGirlWeightPercentileData = () => {
  return [
    { month: 0, p3: 2.4, p15: 2.8, p50: 3.2, p85: 3.7, p97: 4.2 },
    { month: 1, p3: 3.2, p15: 3.6, p50: 4.2, p85: 4.8, p97: 5.4 },
    { month: 2, p3: 4.0, p15: 4.5, p50: 5.1, p85: 5.9, p97: 6.5 },
    { month: 3, p3: 4.6, p15: 5.1, p50: 5.8, p85: 6.7, p97: 7.4 },
    { month: 4, p3: 5.1, p15: 5.6, p50: 6.4, p85: 7.3, p97: 8.1 },
    { month: 5, p3: 5.5, p15: 6.1, p50: 6.9, p85: 7.8, p97: 8.7 },
    { month: 6, p3: 5.8, p15: 6.4, p50: 7.3, p85: 8.3, p97: 9.2 },
    { month: 7, p3: 6.1, p15: 6.7, p50: 7.6, p85: 8.7, p97: 9.6 },
    { month: 8, p3: 6.3, p15: 7.0, p50: 7.9, p85: 9.0, p97: 10.0 },
    { month: 9, p3: 6.6, p15: 7.3, p50: 8.2, p85: 9.3, p97: 10.4 },
    { month: 10, p3: 6.8, p15: 7.5, p50: 8.5, p85: 9.6, p97: 10.7 },
    { month: 11, p3: 7.0, p15: 7.7, p50: 8.7, p85: 9.9, p97: 11.0 },
    { month: 12, p3: 7.1, p15: 7.9, p50: 8.9, p85: 10.2, p97: 11.3 },
    { month: 13, p3: 7.3, p15: 8.1, p50: 9.2, p85: 10.4, p97: 11.6 },
    { month: 14, p3: 7.5, p15: 8.3, p50: 9.4, p85: 10.7, p97: 11.9 },
    { month: 15, p3: 7.7, p15: 8.5, p50: 9.6, p85: 10.9, p97: 12.2 },
    { month: 16, p3: 7.8, p15: 8.7, p50: 9.8, p85: 11.2, p97: 12.5 },
    { month: 17, p3: 8.0, p15: 8.8, p50: 10.0, p85: 11.4, p97: 12.7 },
    { month: 18, p3: 8.2, p15: 9.0, p50: 10.2, p85: 11.6, p97: 13.0 },
    { month: 19, p3: 8.3, p15: 9.2, p50: 10.4, p85: 11.9, p97: 13.3 },
    { month: 20, p3: 8.5, p15: 9.4, p50: 10.6, p85: 12.1, p97: 13.5 },
    { month: 21, p3: 8.7, p15: 9.6, p50: 10.9, p85: 12.4, p97: 13.8 },
    { month: 22, p3: 8.8, p15: 9.8, p50: 11.1, p85: 12.6, p97: 14.1 },
    { month: 23, p3: 9.0, p15: 9.9, p50: 11.3, p85: 12.8, p97: 14.3 },
    { month: 24, p3: 9.2, p15: 10.1, p50: 11.5, p85: 13.1, p97: 14.6 },
    { month: 25, p3: 9.3, p15: 10.3, p50: 11.7, p85: 13.3, p97: 14.9 },
    { month: 26, p3: 9.5, p15: 10.5, p50: 11.9, p85: 13.6, p97: 15.2 },
    { month: 27, p3: 9.6, p15: 10.7, p50: 12.1, p85: 13.8, p97: 15.4 },
    { month: 28, p3: 9.8, p15: 10.8, p50: 12.3, p85: 14.0, p97: 15.7 },
    { month: 29, p3: 10.0, p15: 11.0, p50: 12.5, p85: 14.3, p97: 16.0 },
    { month: 30, p3: 10.1, p15: 11.2, p50: 12.7, p85: 14.5, p97: 16.2 },
    { month: 31, p3: 10.3, p15: 11.3, p50: 12.9, p85: 14.7, p97: 16.5 },
    { month: 32, p3: 10.4, p15: 11.5, p50: 13.1, p85: 15.0, p97: 16.8 },
    { month: 33, p3: 10.5, p15: 11.7, p50: 13.3, p85: 15.2, p97: 17.0 },
    { month: 34, p3: 10.7, p15: 11.8, p50: 13.5, p85: 15.4, p97: 17.3 },
    { month: 35, p3: 10.8, p15: 12.0, p50: 13.7, p85: 15.7, p97: 17.6 },
    { month: 36, p3: 11.0, p15: 12.1, p50: 13.9, p85: 15.9, p97: 17.8 },
    { month: 37, p3: 11.1, p15: 12.3, p50: 14.0, p85: 16.1, p97: 18.1 },
    { month: 38, p3: 11.2, p15: 12.5, p50: 14.2, p85: 16.3, p97: 18.4 },
    { month: 39, p3: 11.4, p15: 12.6, p50: 14.4, p85: 16.6, p97: 18.6 },
    { month: 40, p3: 11.5, p15: 12.8, p50: 14.6, p85: 16.8, p97: 18.9 },
    { month: 41, p3: 11.6, p15: 12.9, p50: 14.8, p85: 17.0, p97: 19.2 },
    { month: 42, p3: 11.8, p15: 13.1, p50: 15.0, p85: 17.3, p97: 19.5 },
    { month: 43, p3: 11.9, p15: 13.2, p50: 15.2, p85: 17.5, p97: 19.7 },
    { month: 44, p3: 12.0, p15: 13.4, p50: 15.3, p85: 17.7, p97: 20.0 },
    { month: 45, p3: 12.1, p15: 13.5, p50: 15.5, p85: 17.9, p97: 20.3 },
    { month: 46, p3: 12.3, p15: 13.7, p50: 15.7, p85: 18.2, p97: 20.6 },
    { month: 47, p3: 12.4, p15: 13.8, p50: 15.9, p85: 18.4, p97: 20.8 },
    { month: 48, p3: 12.5, p15: 14.0, p50: 16.1, p85: 18.6, p97: 21.1 },
    { month: 49, p3: 12.6, p15: 14.1, p50: 16.3, p85: 18.9, p97: 21.4 },
    { month: 50, p3: 12.8, p15: 14.3, p50: 16.4, p85: 19.1, p97: 21.7 },
    { month: 51, p3: 12.9, p15: 14.4, p50: 16.6, p85: 19.3, p97: 22.0 },
    { month: 52, p3: 13.0, p15: 14.5, p50: 16.8, p85: 19.5, p97: 22.2 },
    { month: 53, p3: 13.1, p15: 14.7, p50: 17.0, p85: 19.8, p97: 22.5 },
    { month: 54, p3: 13.2, p15: 14.8, p50: 17.2, p85: 20.0, p97: 22.8 },
    { month: 55, p3: 13.4, p15: 15.0, p50: 17.3, p85: 20.2, p97: 23.1 },
    { month: 56, p3: 13.5, p15: 15.1, p50: 17.5, p85: 20.4, p97: 23.3 },
    { month: 57, p3: 13.6, p15: 15.3, p50: 17.7, p85: 20.7, p97: 23.6 },
    { month: 58, p3: 13.7, p15: 15.4, p50: 17.9, p85: 20.9, p97: 23.9 },
    { month: 59, p3: 13.8, p15: 15.5, p50: 18.0, p85: 21.1, p97: 24.2 },
    { month: 60, p3: 14.0, p15: 15.7, p50: 18.2, p85: 21.3, p97: 24.4 },
  ];
};

// Generate data untuk Tinggi Badan (Height)
export const generateBoyHeightPercentileData = () => {
    return [
        { month: 0, p3: 46.3, p15: 47.9, p50: 49.9, p85: 51.8, p97: 53.4 },
        { month: 1, p3: 51.1, p15: 52.7, p50: 54.7, p85: 56.7, p97: 58.4 },
        { month: 2, p3: 54.7, p15: 56.4, p50: 58.4, p85: 60.5, p97: 62.2 },
        { month: 3, p3: 57.6, p15: 59.3, p50: 61.4, p85: 63.5, p97: 65.3 },
        { month: 4, p3: 60.0, p15: 61.7, p50: 63.9, p85: 66.0, p97: 67.8 },
        { month: 5, p3: 61.9, p15: 63.7, p50: 65.9, p85: 68.1, p97: 69.9 },
        { month: 6, p3: 63.6, p15: 65.4, p50: 67.6, p85: 69.8, p97: 71.6 },
        { month: 7, p3: 65.1, p15: 66.9, p50: 69.2, p85: 71.4, p97: 73.2 },
        { month: 8, p3: 66.5, p15: 68.3, p50: 70.6, p85: 72.9, p97: 74.7 },
        { month: 9, p3: 67.7, p15: 69.6, p50: 72.0, p85: 74.3, p97: 76.2 },
        { month: 10, p3: 69.0, p15: 70.9, p50: 73.3, p85: 75.6, p97: 77.6 },
        { month: 11, p3: 70.2, p15: 72.1, p50: 74.5, p85: 77.0, p97: 78.9 },
        { month: 12, p3: 71.3, p15: 73.3, p50: 75.7, p85: 78.2, p97: 80.2 },
        { month: 13, p3: 72.4, p15: 74.4, p50: 76.9, p85: 79.4, p97: 81.5 },
        { month: 14, p3: 73.4, p15: 75.5, p50: 78.0, p85: 80.6, p97: 82.7 },
        { month: 15, p3: 74.4, p15: 76.5, p50: 79.1, p85: 81.8, p97: 83.9 },
        { month: 16, p3: 75.4, p15: 77.5, p50: 80.2, p85: 82.9, p97: 85.1 },
        { month: 17, p3: 76.3, p15: 78.5, p50: 81.2, p85: 84.0, p97: 86.2 },
        { month: 18, p3: 77.2, p15: 79.5, p50: 82.3, p85: 85.1, p97: 87.3 },
        { month: 19, p3: 78.1, p15: 80.4, p50: 83.2, p85: 86.1, p97: 88.4 },
        { month: 20, p3: 78.9, p15: 81.3, p50: 84.2, p85: 87.1, p97: 89.5 },
        { month: 21, p3: 79.7, p15: 82.2, p50: 85.1, p85: 88.1, p97: 90.5 },
        { month: 22, p3: 80.5, p15: 83.0, p50: 86.0, p85: 89.1, p97: 91.6 },
        { month: 23, p3: 81.3, p15: 83.8, p50: 86.9, p85: 90.0, p97: 92.6 },
        { month: 24, p3: 81.4, p15: 83.9, p50: 87.1, p85: 90.3, p97: 92.9 },
        { month: 25, p3: 82.1, p15: 84.7, p50: 88.0, p85: 91.2, p97: 93.8 },
        { month: 26, p3: 82.8, p15: 85.5, p50: 88.8, p85: 92.1, p97: 94.8 },
        { month: 27, p3: 83.5, p15: 86.3, p50: 89.6, p85: 93.0, p97: 95.7 },
        { month: 28, p3: 84.2, p15: 87.0, p50: 90.4, p85: 93.8, p97: 96.6 },
        { month: 29, p3: 84.9, p15: 87.7, p50: 91.2, p85: 94.7, p97: 97.5 },
        { month: 30, p3: 85.5, p15: 88.4, p50: 91.9, p85: 95.5, p97: 98.3 },
        { month: 31, p3: 86.2, p15: 89.1, p50: 92.7, p85: 96.2, p97: 99.2 },
        { month: 32, p3: 86.8, p15: 89.7, p50: 93.4, p85: 97.0, p97: 100.0 },
        { month: 33, p3: 87.4, p15: 90.4, p50: 94.1, p85: 97.8, p97: 100.8 },
        { month: 34, p3: 88.0, p15: 91.0, p50: 94.8, p85: 98.5, p97: 101.5 },
        { month: 35, p3: 88.5, p15: 91.6, p50: 95.4, p85: 99.2, p97: 102.3 },
        { month: 36, p3: 89.1, p15: 92.2, p50: 96.1, p85: 99.9, p97: 103.1 },
        { month: 37, p3: 89.7, p15: 92.8, p50: 96.7, p85: 100.6, p97: 103.8 },
        { month: 38, p3: 90.2, p15: 93.4, p50: 97.4, p85: 101.3, p97: 104.5 },
        { month: 39, p3: 90.8, p15: 94.0, p50: 98.0, p85: 102.0, p97: 105.2 },
        { month: 40, p3: 91.3, p15: 94.6, p50: 98.6, p85: 102.7, p97: 105.9 },
        { month: 41, p3: 91.9, p15: 95.2, p50: 99.2, p85: 103.3, p97: 106.6 },
        { month: 42, p3: 92.4, p15: 95.7, p50: 99.9, p85: 104.0, p97: 107.3 },
        { month: 43, p3: 92.9, p15: 96.3, p50: 100.4, p85: 104.6, p97: 108.0 },
        { month: 44, p3: 93.4, p15: 96.8, p50: 101.0, p85: 105.2, p97: 108.6 },
        { month: 45, p3: 93.9, p15: 97.4, p50: 101.6, p85: 105.8, p97: 109.3 },
        { month: 46, p3: 94.4, p15: 97.9, p50: 102.2, p85: 106.5, p97: 109.9 },
        { month: 47, p3: 94.9, p15: 98.5, p50: 102.8, p85: 107.1, p97: 110.6 },
        { month: 48, p3: 95.4, p15: 99.0, p50: 103.3, p85: 107.7, p97: 111.2 },
        { month: 49, p3: 95.9, p15: 99.5, p50: 103.9, p85: 108.3, p97: 111.8 },
        { month: 50, p3: 96.4, p15: 100.0, p50: 104.4, p85: 108.9, p97: 112.5 },
        { month: 51, p3: 96.9, p15: 100.5, p50: 105.0, p85: 109.5, p97: 113.1 },
        { month: 52, p3: 97.4, p15: 101.1, p50: 105.6, p85: 110.1, p97: 113.7 },
        { month: 53, p3: 97.9, p15: 101.6, p50: 106.1, p85: 110.7, p97: 114.3 },
        { month: 54, p3: 98.4, p15: 102.1, p50: 106.7, p85: 111.2, p97: 115.0 },
        { month: 55, p3: 98.8, p15: 102.6, p50: 107.2, p85: 111.8, p97: 115.6 },
        { month: 56, p3: 99.3, p15: 103.1, p50: 107.8, p85: 112.4, p97: 116.2 },
        { month: 57, p3: 99.8, p15: 103.6, p50: 108.3, p85: 113.0, p97: 116.8 },
        { month: 58, p3: 100.3, p15: 104.1, p50: 108.9, p85: 113.6, p97: 117.4 },
        { month: 59, p3: 100.8, p15: 104.7, p50: 109.4, p85: 114.2, p97: 118.1 },
        { month: 60, p3: 101.2, p15: 105.2, p50: 110.0, p85: 114.8, p97: 118.7 },
    ];
};

export const generateGirlHeightPercentileData = () => {
    return [
        { month: 0, p3: 45.6, p15: 47.2, p50: 49.1, p85: 51.1, p97: 52.7 },
        { month: 1, p3: 50.0, p15: 51.7, p50: 53.7, p85: 55.7, p97: 57.4 },
        { month: 2, p3: 53.2, p15: 55.0, p50: 57.1, p85: 59.2, p97: 60.9 },
        { month: 3, p3: 55.8, p15: 57.6, p50: 59.8, p85: 62.0, p97: 63.8 },
        { month: 4, p3: 58.0, p15: 59.8, p50: 62.1, p85: 64.3, p97: 66.2 },
        { month: 5, p3: 59.9, p15: 61.7, p50: 64.0, p85: 66.3, p97: 68.2 },
        { month: 6, p3: 61.5, p15: 63.4, p50: 65.7, p85: 68.1, p97: 70.0 },
        { month: 7, p3: 62.9, p15: 64.9, p50: 67.3, p85: 69.7, p97: 71.6 },
        { month: 8, p3: 64.3, p15: 66.3, p50: 68.7, p85: 71.2, p97: 73.2 },
        { month: 9, p3: 65.6, p15: 67.6, p50: 70.1, p85: 72.6, p97: 74.7 },
        { month: 10, p3: 66.8, p15: 68.9, p50: 71.5, p85: 74.0, p97: 76.1 },
        { month: 11, p3: 68.0, p15: 70.2, p50: 72.8, p85: 75.4, p97: 77.5 },
        { month: 12, p3: 69.2, p15: 71.3, p50: 74.0, p85: 76.7, p97: 78.9 },
        { month: 13, p3: 70.3, p15: 72.5, p50: 75.2, p85: 77.9, p97: 80.2 },
        { month: 14, p3: 71.3, p15: 73.6, p50: 76.4, p85: 79.2, p97: 81.4 },
        { month: 15, p3: 72.4, p15: 74.7, p50: 77.5, p85: 80.3, p97: 82.7 },
        { month: 16, p3: 73.3, p15: 75.7, p50: 78.6, p85: 81.5, p97: 83.9 },
        { month: 17, p3: 74.3, p15: 76.7, p50: 79.7, p85: 82.6, p97: 85.0 },
        { month: 18, p3: 75.2, p15: 77.7, p50: 80.7, p85: 83.7, p97: 86.2 },
        { month: 19, p3: 76.2, p15: 78.7, p50: 81.7, p85: 84.8, p97: 87.3 },
        { month: 20, p3: 77.0, p15: 79.6, p50: 82.7, p85: 85.8, p97: 88.4 },
        { month: 21, p3: 77.9, p15: 80.5, p50: 83.7, p85: 86.8, p97: 89.4 },
        { month: 22, p3: 78.7, p15: 81.4, p50: 84.6, p85: 87.8, p97: 90.5 },
        { month: 23, p3: 79.6, p15: 82.2, p50: 85.5, p85: 88.8, p97: 91.5 },
        { month: 24, p3: 80.3, p15: 83.1, p50: 86.4, p85: 89.8, p97: 92.5 },
        { month: 25, p3: 80.4, p15: 83.2, p50: 86.6, p85: 90.0, p97: 92.8 },
        { month: 26, p3: 81.2, p15: 84.0, p50: 87.4, p85: 90.9, p97: 93.7 },
        { month: 27, p3: 81.9, p15: 84.8, p50: 88.3, p85: 91.8, p97: 94.6 },
        { month: 28, p3: 82.6, p15: 85.5, p50: 89.1, p85: 92.7, p97: 95.6 },
        { month: 29, p3: 83.4, p15: 86.3, p50: 89.9, p85: 93.5, p97: 96.4 },
        { month: 30, p3: 84.0, p15: 87.0, p50: 90.7, p85: 94.3, p97: 97.3 },
        { month: 31, p3: 84.7, p15: 87.7, p50: 91.4, p85: 95.2, p97: 98.2 },
        { month: 32, p3: 85.4, p15: 88.4, p50: 92.2, p85: 95.9, p97: 99.0 },
        { month: 33, p3: 86.0, p15: 89.1, p50: 92.9, p85: 96.7, p97: 99.8 },
        { month: 34, p3: 86.7, p15: 89.8, p50: 93.6, p85: 97.5, p97: 100.6 },
        { month: 35, p3: 87.3, p15: 90.5, p50: 94.4, p85: 98.3, p97: 101.4 },
        { month: 36, p3: 87.9, p15: 91.1, p50: 95.1, p85: 99.0, p97: 102.2 },
        { month: 37, p3: 88.5, p15: 91.7, p50: 95.7, p85: 99.7, p97: 103.0 },
        { month: 38, p3: 89.1, p15: 92.4, p50: 96.4, p85: 100.5, p97: 103.7 },
        { month: 39, p3: 89.7, p15: 93.0, p50: 97.1, p85: 101.2, p97: 104.5 },
        { month: 40, p3: 90.3, p15: 93.6, p50: 97.7, p85: 101.9, p97: 105.2 },
        { month: 41, p3: 90.8, p15: 94.2, p50: 98.4, p85: 102.6, p97: 106.0 },
        { month: 42, p3: 91.4, p15: 94.8, p50: 99.0, p85: 103.3, p97: 106.7 },
        { month: 43, p3: 92.0, p15: 95.4, p50: 99.7, p85: 103.9, p97: 107.4 },
        { month: 44, p3: 92.5, p15: 96.0, p50: 100.3, p85: 104.6, p97: 108.1 },
        { month: 45, p3: 93.0, p15: 96.6, p50: 100.9, p85: 105.3, p97: 108.8 },
        { month: 46, p3: 93.6, p15: 97.2, p50: 101.5, p85: 105.9, p97: 109.5 },
        { month: 47, p3: 94.1, p15: 97.7, p50: 102.1, p85: 106.6, p97: 110.2 },
        { month: 48, p3: 94.6, p15: 98.3, p50: 102.7, p85: 107.2, p97: 110.8 },
        { month: 49, p3: 95.1, p15: 98.8, p50: 103.3, p85: 107.8, p97: 111.5 },
        { month: 50, p3: 95.7, p15: 99.4, p50: 103.9, p85: 108.4, p97: 112.1 },
        { month: 51, p3: 96.2, p15: 99.9, p50: 104.5, p85: 109.1, p97: 112.8 },
        { month: 52, p3: 96.7, p15: 100.4, p50: 105.0, p85: 109.7, p97: 113.4 },
        { month: 53, p3: 97.2, p15: 101.0, p50: 105.6, p85: 110.3, p97: 114.1 },
        { month: 54, p3: 97.6, p15: 101.5, p50: 106.2, p85: 110.9, p97: 114.7 },
        { month: 55, p3: 98.1, p15: 102.0, p50: 106.7, p85: 111.5, p97: 115.3 },
        { month: 56, p3: 98.6, p15: 102.5, p50: 107.3, p85: 112.1, p97: 116.0 },
        { month: 57, p3: 99.1, p15: 103.0, p50: 107.8, p85: 112.6, p97: 116.6 },
        { month: 58, p3: 99.6, p15: 103.5, p50: 108.4, p85: 113.2, p97: 117.2 },
        { month: 59, p3: 100.0, p15: 104.0, p50: 108.9, p85: 113.8, p97: 117.8 },
        { month: 60, p3: 100.5, p15: 104.5, p50: 109.4, p85: 114.4, p97: 118.4 },
    ];
};

// Generate data untuk Lingkar Kepala (Head Circumference)
export const generateBoyHeadCircumferenceData = () => {
    return [
        { month: 0, p3: 32.1, p15: 33.1, p50: 34.5, p85: 35.8, p97: 36.9 },
        { month: 1, p3: 35.1, p15: 36.1, p50: 37.3, p85: 38.5, p97: 39.5 },
        { month: 2, p3: 36.9, p15: 37.9, p50: 39.1, p85: 40.3, p97: 41.3 },
        { month: 3, p3: 38.3, p15: 39.3, p50: 40.5, p85: 41.7, p97: 42.7 },
        { month: 4, p3: 39.4, p15: 40.4, p50: 41.6, p85: 42.9, p97: 43.9 },
        { month: 5, p3: 40.3, p15: 41.3, p50: 42.6, p85: 43.8, p97: 44.8 },
        { month: 6, p3: 41.0, p15: 42.1, p50: 43.3, p85: 44.6, p97: 45.6 },
        { month: 7, p3: 41.7, p15: 42.7, p50: 44.0, p85: 45.3, p97: 46.3 },
        { month: 8, p3: 42.2, p15: 43.2, p50: 44.5, p85: 45.8, p97: 46.9 },
        { month: 9, p3: 42.6, p15: 43.7, p50: 45.0, p85: 46.3, p97: 47.4 },
        { month: 10, p3: 43.0, p15: 44.1, p50: 45.4, p85: 46.7, p97: 47.8 },
        { month: 11, p3: 43.4, p15: 44.4, p50: 45.8, p85: 47.1, p97: 48.2 },
        { month: 12, p3: 43.6, p15: 44.7, p50: 46.1, p85: 47.4, p97: 48.5 },
        { month: 13, p3: 43.9, p15: 45.0, p50: 46.3, p85: 47.7, p97: 48.8 },
        { month: 14, p3: 44.1, p15: 45.2, p50: 46.6, p85: 47.9, p97: 49.0 },
        { month: 15, p3: 44.3, p15: 45.5, p50: 46.8, p85: 48.2, p97: 49.3 },
        { month: 16, p3: 44.5, p15: 45.6, p50: 47.0, p85: 48.4, p97: 49.5 },
        { month: 17, p3: 44.7, p15: 45.8, p50: 47.2, p85: 48.6, p97: 49.7 },
        { month: 18, p3: 44.9, p15: 46.0, p50: 47.4, p85: 48.7, p97: 49.9 },
        { month: 19, p3: 45.0, p15: 46.2, p50: 47.5, p85: 48.9, p97: 50.0 },
        { month: 20, p3: 45.2, p15: 46.3, p50: 47.7, p85: 49.1, p97: 50.2 },
        { month: 21, p3: 45.3, p15: 46.4, p50: 47.8, p85: 49.2, p97: 50.4 },
        { month: 22, p3: 45.4, p15: 46.6, p50: 48.0, p85: 49.4, p97: 50.5 },
        { month: 23, p3: 45.6, p15: 46.7, p50: 48.1, p85: 49.5, p97: 50.7 },
        { month: 24, p3: 45.7, p15: 46.8, p50: 48.3, p85: 49.7, p97: 50.8 },
        { month: 25, p3: 45.8, p15: 47.0, p50: 48.4, p85: 49.8, p97: 50.9 },
        { month: 26, p3: 45.9, p15: 47.1, p50: 48.5, p85: 49.9, p97: 51.1 },
        { month: 27, p3: 46.0, p15: 47.2, p50: 48.6, p85: 50.0, p97: 51.2 },
        { month: 28, p3: 46.1, p15: 47.3, p50: 48.7, p85: 50.2, p97: 51.3 },
        { month: 29, p3: 46.2, p15: 47.4, p50: 48.8, p85: 50.3, p97: 51.4 },
        { month: 30, p3: 46.3, p15: 47.5, p50: 48.9, p85: 50.4, p97: 51.6 },
        { month: 31, p3: 46.4, p15: 47.6, p50: 49.0, p85: 50.5, p97: 51.7 },
        { month: 32, p3: 46.5, p15: 47.7, p50: 49.1, p85: 50.6, p97: 51.8 },
        { month: 33, p3: 46.6, p15: 47.8, p50: 49.2, p85: 50.7, p97: 51.9 },
        { month: 34, p3: 46.6, p15: 47.8, p50: 49.3, p85: 50.8, p97: 52.0 },
        { month: 35, p3: 46.7, p15: 47.9, p50: 49.4, p85: 50.8, p97: 52.0 },
        { month: 36, p3: 46.8, p15: 48.0, p50: 49.5, p85: 50.9, p97: 52.1 },
        { month: 37, p3: 46.9, p15: 48.1, p50: 49.5, p85: 51.0, p97: 52.2 },
        { month: 38, p3: 46.9, p15: 48.1, p50: 49.6, p85: 51.1, p97: 52.3 },
        { month: 39, p3: 47.0, p15: 48.2, p50: 49.7, p85: 51.2, p97: 52.4 },
        { month: 40, p3: 47.0, p15: 48.3, p50: 49.7, p85: 51.2, p97: 52.4 },
        { month: 41, p3: 47.1, p15: 48.3, p50: 49.8, p85: 51.3, p97: 52.5 },
        { month: 42, p3: 47.2, p15: 48.4, p50: 49.9, p85: 51.4, p97: 52.6 },
        { month: 43, p3: 47.2, p15: 48.4, p50: 49.9, p85: 51.4, p97: 52.7 },
        { month: 44, p3: 47.3, p15: 48.5, p50: 50.0, p85: 51.5, p97: 52.7 },
        { month: 45, p3: 47.3, p15: 48.5, p50: 50.1, p85: 51.6, p97: 52.8 },
        { month: 46, p3: 47.4, p15: 48.6, p50: 50.1, p85: 51.6, p97: 52.8 },
        { month: 47, p3: 47.4, p15: 48.6, p50: 50.2, p85: 51.7, p97: 52.9 },
        { month: 48, p3: 47.5, p15: 48.7, p50: 50.2, p85: 51.7, p97: 53.0 },
        { month: 49, p3: 47.5, p15: 48.7, p50: 50.3, p85: 51.8, p97: 53.0 },
        { month: 50, p3: 47.5, p15: 48.8, p50: 50.3, p85: 51.8, p97: 53.1 },
        { month: 51, p3: 47.6, p15: 48.8, p50: 50.4, p85: 51.9, p97: 53.1 },
        { month: 52, p3: 47.6, p15: 48.9, p50: 50.4, p85: 51.9, p97: 53.2 },
        { month: 53, p3: 47.7, p15: 49.0, p50: 50.4, p85: 52.0, p97: 53.2 },
        { month: 54, p3: 47.7, p15: 49.0, p50: 50.5, p85: 52.0, p97: 53.3 },
        { month: 55, p3: 47.7, p15: 49.0, p50: 50.5, p85: 52.1, p97: 53.3 },
        { month: 56, p3: 47.8, p15: 49.0, p50: 50.6, p85: 52.1, p97: 53.4 },
        { month: 57, p3: 47.8, p15: 49.1, p50: 50.6, p85: 52.2, p97: 53.4 },
        { month: 58, p3: 47.9, p15: 49.1, p50: 50.7, p85: 52.2, p97: 53.5 },
        { month: 59, p3: 47.9, p15: 49.2, p50: 50.7, p85: 52.2, p97: 53.5 },
        { month: 60, p3: 47.9, p15: 49.2, p50: 50.7, p85: 52.3, p97: 53.5 },
    ];
};

export const generateGirlHeadCircumferenceData = () => {
    return [
        { month: 0, p3: 31.7, p15: 32.7, p50: 33.9, p85: 35.1, p97: 36.1 },
        { month: 1, p3: 34.3, p15: 35.3, p50: 36.5, p85: 37.8, p97: 38.8 },
        { month: 2, p3: 36.0, p15: 37.0, p50: 38.3, p85: 39.5, p97: 40.5 },
        { month: 3, p3: 37.2, p15: 38.2, p50: 39.5, p85: 40.8, p97: 41.9 },
        { month: 4, p3: 38.2, p15: 39.3, p50: 40.6, p85: 41.9, p97: 43.0 },
        { month: 5, p3: 39.0, p15: 40.1, p50: 41.5, p85: 42.8, p97: 43.9 },
        { month: 6, p3: 39.7, p15: 40.8, p50: 42.2, p85: 43.5, p97: 44.6 },
        { month: 7, p3: 40.4, p15: 41.5, p50: 42.8, p85: 44.2, p97: 45.3 },
        { month: 8, p3: 40.9, p15: 42.0, p50: 43.4, p85: 44.7, p97: 45.9 },
        { month: 9, p3: 41.3, p15: 42.4, p50: 43.8, p85: 45.2, p97: 46.3 },
        { month: 10, p3: 41.7, p15: 42.8, p50: 44.2, p85: 45.6, p97: 46.8 },
        { month: 11, p3: 42.0, p15: 43.2, p50: 44.6, p85: 46.0, p97: 47.1 },
        { month: 12, p3: 42.3, p15: 43.5, p50: 44.9, p85: 46.3, p97: 47.5 },
        { month: 13, p3: 42.6, p15: 43.8, p50: 45.2, p85: 46.6, p97: 47.7 },
        { month: 14, p3: 42.9, p15: 44.0, p50: 45.4, p85: 46.8, p97: 48.0 },
        { month: 15, p3: 43.1, p15: 44.2, p50: 45.7, p85: 47.1, p97: 48.2 },
        { month: 16, p3: 43.3, p15: 44.4, p50: 45.9, p85: 47.3, p97: 48.5 },
        { month: 17, p3: 43.5, p15: 44.6, p50: 46.1, p85: 47.5, p97: 48.7 },
        { month: 18, p3: 43.6, p15: 44.8, p50: 46.2, p85: 47.7, p97: 48.8 },
        { month: 19, p3: 43.8, p15: 45.0, p50: 46.4, p85: 47.8, p97: 49.0 },
        { month: 20, p3: 44.0, p15: 45.1, p50: 46.6, p85: 48.0, p97: 49.2 },
        { month: 21, p3: 44.1, p15: 45.3, p50: 46.7, p85: 48.2, p97: 49.4 },
        { month: 22, p3: 44.3, p15: 45.4, p50: 46.9, p85: 48.3, p97: 49.5 },
        { month: 23, p3: 44.4, p15: 45.6, p50: 47.0, p85: 48.5, p97: 49.7 },
        { month: 24, p3: 44.6, p15: 45.7, p50: 47.2, p85: 48.6, p97: 49.8 },
        { month: 25, p3: 44.7, p15: 45.9, p50: 47.3, p85: 48.8, p97: 49.9 },
        { month: 26, p3: 44.8, p15: 46.0, p50: 47.5, p85: 48.9, p97: 50.1 },
        { month: 27, p3: 44.9, p15: 46.1, p50: 47.6, p85: 49.0, p97: 50.2 },
        { month: 28, p3: 45.1, p15: 46.3, p50: 47.7, p85: 49.2, p97: 50.3 },
        { month: 29, p3: 45.2, p15: 46.4, p50: 47.8, p85: 49.3, p97: 50.5 },
        { month: 30, p3: 45.3, p15: 46.5, p50: 47.9, p85: 49.4, p97: 50.6 },
        { month: 31, p3: 45.4, p15: 46.6, p50: 48.0, p85: 49.5, p97: 50.7 },
        { month: 32, p3: 45.5, p15: 46.7, p50: 48.1, p85: 49.6, p97: 50.8 },
        { month: 33, p3: 45.6, p15: 46.8, p50: 48.2, p85: 49.7, p97: 50.9 },
        { month: 34, p3: 45.7, p15: 46.9, p50: 48.3, p85: 49.8, p97: 51.0 },
        { month: 35, p3: 45.8, p15: 47.0, p50: 48.4, p85: 49.9, p97: 51.1 },
        { month: 36, p3: 45.9, p15: 47.0, p50: 48.5, p85: 50.0, p97: 51.2 },
        { month: 37, p3: 45.9, p15: 47.1, p50: 48.6, p85: 50.1, p97: 51.3 },
        { month: 38, p3: 46.0, p15: 47.2, p50: 48.7, p85: 50.1, p97: 51.3 },
        { month: 39, p3: 46.1, p15: 47.3, p50: 48.7, p85: 50.2, p97: 51.4 },
        { month: 40, p3: 46.2, p15: 47.4, p50: 48.8, p85: 50.3, p97: 51.5 },
        { month: 41, p3: 46.2, p15: 47.4, p50: 48.9, p85: 50.4, p97: 51.6 },
        { month: 42, p3: 46.3, p15: 47.5, p50: 49.0, p85: 50.4, p97: 51.6 },
        { month: 43, p3: 46.4, p15: 47.6, p50: 49.0, p85: 50.5, p97: 51.7 },
        { month: 44, p3: 46.4, p15: 47.6, p50: 49.1, p85: 50.6, p97: 51.8 },
        { month: 45, p3: 46.5, p15: 47.7, p50: 49.2, p85: 50.6, p97: 51.8 },
        { month: 46, p3: 46.5, p15: 47.7, p50: 49.2, p85: 50.7, p97: 51.9 },
        { month: 47, p3: 46.6, p15: 47.8, p50: 49.3, p85: 50.7, p97: 51.9 },
        { month: 48, p3: 46.7, p15: 47.9, p50: 49.3, p85: 50.8, p97: 52.0 },
        { month: 49, p3: 46.7, p15: 47.9, p50: 49.4, p85: 50.9, p97: 52.1 },
        { month: 50, p3: 46.8, p15: 48.0, p50: 49.4, p85: 50.9, p97: 52.1 },
        { month: 51, p3: 46.8, p15: 48.0, p50: 49.5, p85: 51.0, p97: 52.2 },
        { month: 52, p3: 46.9, p15: 48.1, p50: 49.5, p85: 51.0, p97: 52.2 },
        { month: 53, p3: 46.9, p15: 48.1, p50: 49.6, p85: 51.1, p97: 52.3 },
        { month: 54, p3: 47.0, p15: 48.2, p50: 49.6, p85: 51.1, p97: 52.3 },
        { month: 55, p3: 47.0, p15: 48.2, p50: 49.7, p85: 51.2, p97: 52.4 },
        { month: 56, p3: 47.1, p15: 48.3, p50: 49.7, p85: 51.2, p97: 52.4 },
        { month: 57, p3: 47.1, p15: 48.3, p50: 49.8, p85: 51.3, p97: 52.5 },
        { month: 58, p3: 47.2, p15: 48.4, p50: 49.8, p85: 51.3, p97: 52.5 },
        { month: 59, p3: 47.2, p15: 48.4, p50: 49.9, p85: 51.4, p97: 52.6 },
        { month: 60, p3: 47.2, p15: 48.4, p50: 49.9, p85: 51.4, p97: 52.6 },
    ];
};

export default function GrafikBalita({ growth, child, activeTab }: any) {

    // State untuk tracking row yang terbuka
    const [openRows, setOpenRows] = useState<number[]>([]);

    // Tentukan jenis kelamin anak (asumsi field: child.jenis_kelamin atau child.gender)
    // Sesuaikan dengan struktur data Anda: 'L' untuk laki-laki, 'P' untuk perempuan
    const isMale = child?.kelamin === 'L' || child?.gender === 'male' || child?.gender === 'L';

    // Fungsi untuk mendapatkan data percentile berdasarkan gender
    const getPercentileData = (type: 'weight' | 'height' | 'headCircumference') => {
        if (type === 'weight') {
            return isMale ? generateBoyWeightPercentileData() : generateGirlWeightPercentileData();
        } else if (type === 'height') {
            return isMale ? generateBoyHeightPercentileData() : generateGirlHeightPercentileData();
        } else {
            return isMale ? generateBoyHeadCircumferenceData() : generateGirlHeadCircumferenceData();
        }
    };

    const childMeasurements = useMemo(() => {
        if (!growth || growth.length === 0) {
            return { weight: [], height: [], headCircumference: [] };
        }

        return {
            weight: growth
                .map((g: any) => ({
                    month: g.usia_saat_periksa_bulan,
                    value: parseFloat(g.berat_badan_kg),
                    date: g.tanggal_pemeriksaan,
                }))
                .sort((a: any, b: any) => a.month - b.month),
            height: growth
                .map((g: any) => ({
                    month: g.usia_saat_periksa_bulan,
                    value: parseFloat(g.tinggi_badan_cm),
                    date: g.tanggal_pemeriksaan,
                }))
                .sort((a: any, b: any) => a.month - b.month),
            headCircumference: growth
                .map((g: any) => ({
                    month: g.usia_saat_periksa_bulan,
                    value: parseFloat(g.lingkar_kepala_cm),
                    date: g.tanggal_pemeriksaan,
                }))
                .sort((a: any, b: any) => a.month - b.month),
        };
    }, [growth]);

    // Fungsi untuk menghitung Z-Score sederhana
    const calculateZScore = (
        value: number,
        percentileData: any[],
        month: number,
    ) => {
        const dataPoint = percentileData.find((d) => d.month === month);
        if (!dataPoint) return 0;

        const median = dataPoint.p50;
        const sd = (dataPoint.p85 - dataPoint.p50) / 1.036; // Approximate SD
        return ((value - median) / sd).toFixed(2);
    };

    // Fungsi untuk menentukan kategori status
    const getCategory = (zScore: string, type: string) => {
        const z = parseFloat(zScore);
        if (type === 'weight') {
            if (z < -3) return { text: 'stunting berat', color: 'red' };
            if (z < -2) return { text: 'gizi kurang', color: 'orange' };
            if (z < -1)
                return { text: 'berisiko gizi kurang', color: 'yellow' };
            if (z <= 1) return { text: 'normal', color: 'green' };
            if (z <= 2) return { text: 'berisiko gizi lebih', color: 'yellow' };
            return { text: 'gizi lebih', color: 'orange' };
        } else if (type === 'height') {
            if (z < -3)
                return {
                    text: 'sangat pendek (severely stunted)',
                    color: 'red',
                };
            if (z < -2) return { text: 'pendek (stunted)', color: 'orange' };
            if (z < -1) return { text: 'berisiko pendek', color: 'yellow' };
            return { text: 'normal', color: 'green' };
        } else {
            if (z < -2) return { text: 'di bawah normal', color: 'orange' };
            if (z < -1) return { text: 'berisiko', color: 'yellow' };
            return { text: 'normal', color: 'green' };
        }
    };

    // Toggle function untuk expand/collapse
    const toggleRow = (index: number) => {
        setOpenRows((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index],
        );
    };

    // Konfigurasi chart
    const chartConfigs = useMemo(() => {
        const latestWeight =
            childMeasurements.weight[childMeasurements.weight.length - 1];
        const latestHeight =
            childMeasurements.height[childMeasurements.height.length - 1];
        const latestHead =
            childMeasurements.headCircumference[
                childMeasurements.headCircumference.length - 1
            ];

        // Gunakan data percentile sesuai gender
        const weightPercentile = getPercentileData('weight');
        const heightPercentile = getPercentileData('height');
        const headPercentile = getPercentileData('headCircumference');

        const weightZScore = latestWeight
            ? calculateZScore(
                  latestWeight.value,
                  weightPercentile,
                  latestWeight.month,
              )
            : '0';
        const heightZScore = latestHeight
            ? calculateZScore(
                  latestHeight.value,
                  heightPercentile,
                  latestHeight.month,
              )
            : '0';
        const headZScore = latestHead
            ? calculateZScore(
                  latestHead.value,
                  headPercentile,
                  latestHead.month,
              )
            : '0';

        return {
            weight: {
                title: `Grafik Berat Badan per Usia (${isMale ? 'Laki-laki' : 'Perempuan'})`,
                yAxisLabel: 'Berat Badan (Kg)',
                unit: 'Kg',
                yDomain: [2, 28],
                data: weightPercentile,
                measurements: childMeasurements.weight,
                status: {
                    value: latestWeight?.value || 0,
                    zScore: weightZScore,
                    category: getCategory(weightZScore, 'weight').text,
                    color: getCategory(weightZScore, 'weight').color,
                },
            },
            height: {
                title: `Grafik Tinggi Badan per Usia (${isMale ? 'Laki-laki' : 'Perempuan'})`,
                yAxisLabel: 'Tinggi Badan (cm)',
                unit: 'cm',
                yDomain: [40, 120],
                data: heightPercentile,
                measurements: childMeasurements.height,
                status: {
                    value: latestHeight?.value || 0,
                    zScore: heightZScore,
                    category: getCategory(heightZScore, 'height').text,
                    color: getCategory(heightZScore, 'height').color,
                },
            },
            headCircumference: {
                title: `Grafik Lingkar Kepala per Usia (${isMale ? 'Laki-laki' : 'Perempuan'})`,
                yAxisLabel: 'Lingkar Kepala (cm)',
                unit: 'cm',
                yDomain: [30, 55],
                data: headPercentile,
                measurements: childMeasurements.headCircumference,
                status: {
                    value: latestHead?.value || 0,
                    zScore: headZScore,
                    category: getCategory(headZScore, 'headCircumference').text,
                    color: getCategory(headZScore, 'headCircumference').color,
                },
            },
        };
    }, [childMeasurements, isMale]);

    const currentConfig = chartConfigs[activeTab as keyof typeof chartConfigs];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const measurement = currentConfig.measurements.find(
                (m: any) => m.month === data.month,
            );

            if (measurement) {
                return (
                    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg">
                        <p className="mb-1 text-sm font-semibold text-gray-800">
                            Usia: {data.month} Bulan
                        </p>
                        <p className="text-sm text-gray-700">
                            {currentConfig.yAxisLabel}: {measurement.value}{' '}
                            {currentConfig.unit}
                        </p>
                        <p className="text-xs text-gray-500">
                            Tanggal: {measurement.date}
                        </p>
                    </div>
                );
            }
        }
        return null;
    };

    const getStatusColor = (color: string) => {
        const colors: Record<string, any> = {
            red: {
                bg: 'bg-red-50',
                border: 'border-red-500',
                text: 'text-red-700',
                heading: 'text-red-800',
                icon: 'bg-red-500',
            },
            orange: {
                bg: 'bg-orange-50',
                border: 'border-orange-500',
                text: 'text-orange-700',
                heading: 'text-orange-800',
                icon: 'bg-orange-500',
            },
            yellow: {
                bg: 'bg-yellow-50',
                border: 'border-yellow-500',
                text: 'text-yellow-700',
                heading: 'text-yellow-800',
                icon: 'bg-yellow-500',
            },
            green: {
                bg: 'bg-green-50',
                border: 'border-green-500',
                text: 'text-green-700',
                heading: 'text-green-800',
                icon: 'bg-green-500',
            },
        };
        return colors[color] || colors.red;
    };

    const statusColors = getStatusColor(currentConfig.status.color);

    return (
        <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    {currentConfig.title}
                </h2>
            </div>

          <ResponsiveContainer width="100%" height={450}>
                <AreaChart
                    data={currentConfig.data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
                >
                    <defs>
                        <linearGradient
                            id="colorP3"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#ef4444"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor="#ef4444"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                        <linearGradient
                            id="colorP15"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#f97316"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor="#f97316"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                        <linearGradient
                            id="colorP50"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#84cc16"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor="#84cc16"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                        <linearGradient
                            id="colorP85"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#fbbf24"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor="#fbbf24"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                        <linearGradient
                            id="colorP97"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#eab308"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor="#eab308"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                    <XAxis
                        dataKey="month"
                        label={{
                            value: 'Usia (bulan)',
                            position: 'insideBottom',
                            offset: -20,
                        }}
                        tick={{ fontSize: 12 }}
                        domain={[0, 60]}
                    />

                    <YAxis
                        label={{
                            value: currentConfig.yAxisLabel,
                            angle: -90,
                            position: 'insideLeft',
                        }}
                        tick={{ fontSize: 12 }}
                        domain={currentConfig.yDomain}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Area
                        type="monotone"
                        dataKey="p3"
                        stroke="#ef4444"
                        fill="url(#colorP3)"
                        strokeWidth={2}
                    />
                    <Area
                        type="monotone"
                        dataKey="p15"
                        stroke="#f97316"
                        fill="url(#colorP15)"
                        strokeWidth={2}
                    />
                    <Area
                        type="monotone"
                        dataKey="p50"
                        stroke="#84cc16"
                        fill="url(#colorP50)"
                        strokeWidth={2}
                    />
                    <Area
                        type="monotone"
                        dataKey="p85"
                        stroke="#fbbf24"
                        fill="url(#colorP85)"
                        strokeWidth={2}
                    />
                    <Area
                        type="monotone"
                        dataKey="p97"
                        stroke="#eab308"
                        fill="url(#colorP97)"
                        strokeWidth={2}
                    />

                    {currentConfig.measurements.map(
                        (point: any, idx: number) => (
                            <ReferenceDot
                                key={idx}
                                x={point.month}
                                y={point.value}
                                r={6}
                                fill="#3b82f6"
                                stroke="#fff"
                                strokeWidth={2}
                            />
                        ),
                    )}
                </AreaChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div
                        className="h-4 w-4 rounded"
                        style={{ backgroundColor: '#ef4444' }}
                    ></div>
                    <span className="text-gray-600">P3</span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="h-4 w-4 rounded"
                        style={{ backgroundColor: '#f97316' }}
                    ></div>
                    <span className="text-gray-600">P15</span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="h-4 w-4 rounded"
                        style={{ backgroundColor: '#84cc16' }}
                    ></div>
                    <span className="text-gray-600">P50</span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="h-4 w-4 rounded"
                        style={{ backgroundColor: '#fbbf24' }}
                    ></div>
                    <span className="text-gray-600">P85</span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="h-4 w-4 rounded"
                        style={{ backgroundColor: '#eab308' }}
                    ></div>
                    <span className="text-gray-600">P97</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full border-2 border-white bg-blue-500"></div>
                    <span className="text-gray-600">
                        Data Anak ({currentConfig.measurements.length}{' '}
                        pengukuran)
                    </span>
                </div>
            </div>

            {/* Status Info */}
            {currentConfig.measurements.length > 0 && (
                <div
                    className={`mt-6 rounded-r-lg border-l-4 p-4 ${statusColors.bg} ${statusColors.border}`}
                >
                    <div className="flex items-start gap-3">
                        <div
                            className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${statusColors.icon}`}
                        >
                            <span className="text-xs font-bold text-white">
                                !
                            </span>
                        </div>
                        <div>
                            <h4
                                className={`mb-1 font-semibold ${statusColors.heading}`}
                            >
                                Status Pertumbuhan
                            </h4>
                            <p className={`text-sm ${statusColors.text}`}>
                                {activeTab === 'weight' &&
                                    `Berat badan anak saat ini ${currentConfig.status.value} kg dengan Z-Score ${currentConfig.status.zScore}, menandakan `}
                                {activeTab === 'height' &&
                                    `Tinggi badan anak saat ini ${currentConfig.status.value} cm dengan Z-Score ${currentConfig.status.zScore}, menandakan `}
                                {activeTab === 'headCircumference' &&
                                    `Lingkar kepala anak saat ini ${currentConfig.status.value} cm dengan Z-Score ${currentConfig.status.zScore}, menandakan `}
                                <span className="font-semibold">
                                    {currentConfig.status.category}
                                </span>
                                .
                                {currentConfig.status.color === 'red' ||
                                currentConfig.status.color === 'orange'
                                    ? ' Diperlukan konsultasi dengan ahli gizi dan dokter anak untuk penanganan lebih lanjut.'
                                    : ' Pertumbuhan anak dalam kondisi baik.'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {currentConfig.measurements.length === 0 && (
                <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                    <p className="text-gray-600">
                        Belum ada data pemeriksaan untuk ditampilkan
                    </p>
                </div>
            )}

             {growth.length > 0 && (
                <div className="mt-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-800">
                        Riwayat Pemeriksaan Anak
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                        Usia (Bulan)
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                        Tanggal
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                        Berat Badan (kg)
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                        Tinggi Badan (cm)
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                        Lingkar Kepala (cm)
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                        Suhu Tubuh (°C)
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">
                                        Detail Pemeriksaan
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 bg-white">
                                {growth.map((item: any, idx: number) => {
                                    const isOpen = openRows.includes(idx);
                                    const riwayatSakit =
                                        item.riwayat_sakit || [];
                                    const petugas = item.petugas;
                                    const faskes = petugas?.faskes;

                                    return (
                                        <>
                                            <tr
                                                key={`row-${idx}`}
                                                className="cursor-pointer transition hover:bg-gray-50"
                                                onClick={() => toggleRow(idx)}
                                            >
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                    {
                                                        item.usia_saat_periksa_bulan
                                                    }{' '}
                                                    Bulan
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-500">
                                                    {new Date(
                                                        item.tanggal_pemeriksaan,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-blue-600">
                                                    {item.berat_badan_kg}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-green-600">
                                                    {item.tinggi_badan_cm}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-purple-600">
                                                    {item.lingkar_kepala_cm}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-800">
                                                    {item.suhu_tubuh_celsius}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <button
                                                        type="button"
                                                        className="text-sm font-medium text-blue-600 hover:underline focus:outline-none"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleRow(idx);
                                                        }}
                                                    >
                                                        {isOpen
                                                            ? 'Tutup'
                                                            : 'Lihat'}
                                                    </button>
                                                </td>
                                            </tr>

                                            {/* Expand untuk Detail Pemeriksaan Anak */}
                                            {isOpen && (
                                                <tr key={`expand-${idx}`}>
                                                    <td
                                                        colSpan={7}
                                                        className="bg-gray-50 px-6 py-4"
                                                    >
                                                        <div className="space-y-4 rounded-lg border bg-white p-4 shadow-sm">
                                                            <p className="mb-2 font-semibold text-gray-800">
                                                                🩺 Detail
                                                                Pemeriksaan Anak
                                                            </p>

                                                            {/* Info Petugas & Faskes */}
                                                            {(petugas ||
                                                                faskes) && (
                                                                <div className="mb-4 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                                                                    <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-800">
                                                                        <span className="text-lg">
                                                                            👨‍⚕️
                                                                        </span>
                                                                        Informasi
                                                                        Petugas
                                                                        &
                                                                        Fasilitas
                                                                        Kesehatan
                                                                    </h4>
                                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                                        {/* Info Petugas */}
                                                                        {petugas && (
                                                                            <div className="rounded-lg border border-blue-100 bg-white p-3">
                                                                                <h5 className="mb-2 text-sm font-medium text-blue-700">
                                                                                    Petugas
                                                                                    Pemeriksa
                                                                                </h5>
                                                                                <div className="space-y-1 text-sm">
                                                                                    <div className="flex justify-between">
                                                                                        <span className="text-gray-600">
                                                                                            Nama:
                                                                                        </span>
                                                                                        <span className="font-medium text-gray-800">
                                                                                            {
                                                                                                petugas.name
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex justify-between">
                                                                                        <span className="text-gray-600">
                                                                                            NIK:
                                                                                        </span>
                                                                                        <span className="text-gray-700">
                                                                                            {
                                                                                                petugas.nik
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex justify-between">
                                                                                        <span className="text-gray-600">
                                                                                            Role:
                                                                                        </span>
                                                                                        <span className="text-gray-700">
                                                                                            {
                                                                                                petugas.role
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex justify-between">
                                                                                        <span className="text-gray-600">
                                                                                            Kontak:
                                                                                        </span>
                                                                                        <span className="text-gray-700">
                                                                                            {
                                                                                                petugas.no_telp
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                        {/* Info Faskes */}
                                                                        {faskes && (
                                                                            <div className="rounded-lg border border-indigo-100 bg-white p-3">
                                                                                <h5 className="mb-2 text-sm font-medium text-indigo-700">
                                                                                    Fasilitas
                                                                                    Kesehatan
                                                                                </h5>
                                                                                <div className="space-y-1 text-sm">
                                                                                    <div className="flex justify-between">
                                                                                        <span className="text-gray-600">
                                                                                            Nama:
                                                                                        </span>
                                                                                        <span className="font-medium text-gray-800">
                                                                                            {
                                                                                                faskes.nama
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex justify-between">
                                                                                        <span className="text-gray-600">
                                                                                            Tipe:
                                                                                        </span>
                                                                                        <span className="text-gray-700">
                                                                                            {
                                                                                                faskes.tipe_faskes
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="col-span-2 pt-1">
                                                                                        <span className="text-gray-600">
                                                                                            Alamat:
                                                                                        </span>
                                                                                        <p className="mt-1 text-gray-700">
                                                                                            {
                                                                                                faskes.alamat
                                                                                            }
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Tabel ringkas nilai vital */}
                                                            <div className="overflow-x-auto">
                                                                <table className="mb-3 min-w-full text-sm">
                                                                    <thead>
                                                                        <tr className="border-b bg-gray-100">
                                                                            <th className="px-3 py-2 text-left font-medium text-gray-600">
                                                                                Cara
                                                                                Ukur
                                                                                Tinggi
                                                                            </th>
                                                                            <th className="px-3 py-2 text-left font-medium text-gray-600">
                                                                                Suhu
                                                                                (°C)
                                                                            </th>
                                                                            <th className="px-3 py-2 text-left font-medium text-gray-600">
                                                                                Napas
                                                                                (/menit)
                                                                            </th>
                                                                            <th className="px-3 py-2 text-left font-medium text-gray-600">
                                                                                Jantung
                                                                                (/menit)
                                                                            </th>
                                                                            <th className="px-3 py-2 text-left font-medium text-gray-600">
                                                                                Oksigen
                                                                                (%)
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr className="border-b last:border-0">
                                                                            <td className="px-3 py-2 text-gray-700">
                                                                                {item.cara_ukur_tinggi ||
                                                                                    '-'}
                                                                            </td>
                                                                            <td className="px-3 py-2 text-gray-700">
                                                                                {item.suhu_tubuh_celsius ||
                                                                                    '-'}
                                                                            </td>
                                                                            <td className="px-3 py-2 text-gray-700">
                                                                                {item.frekuensi_napas_per_menit ||
                                                                                    '-'}
                                                                            </td>
                                                                            <td className="px-3 py-2 text-gray-700">
                                                                                {item.frekuensi_jantung_per_menit ||
                                                                                    '-'}
                                                                            </td>
                                                                            <td className="px-3 py-2 text-gray-700">
                                                                                {item.saturasi_oksigen_persen ||
                                                                                    '-'}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            {/* Perkembangan Anak */}
                                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                                <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                                                                    <h4 className="mb-1 font-medium text-blue-700">
                                                                        Perkembangan
                                                                        Motorik
                                                                    </h4>
                                                                    <p className="whitespace-pre-line text-sm text-gray-700">
                                                                        {item.perkembangan_motorik ||
                                                                            'Belum diisi'}
                                                                    </p>
                                                                </div>

                                                                <div className="rounded-lg border border-teal-100 bg-teal-50 p-3">
                                                                    <h4 className="mb-1 font-medium text-teal-700">
                                                                        Perkembangan
                                                                        Kognitif
                                                                    </h4>
                                                                    <p className="whitespace-pre-line text-sm text-gray-700">
                                                                        {item.perkembangan_kognitif ||
                                                                            'Belum diisi'}
                                                                    </p>
                                                                </div>

                                                                <div className="rounded-lg border border-purple-100 bg-purple-50 p-3">
                                                                    <h4 className="mb-1 font-medium text-purple-700">
                                                                        Perkembangan
                                                                        Emosional
                                                                    </h4>
                                                                    <p className="whitespace-pre-line text-sm text-gray-700">
                                                                        {item.perkembangan_emosional ||
                                                                            'Belum diisi'}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {/* Catatan Pemeriksaan */}
                                                            <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
                                                                <h4 className="mb-1 font-medium text-gray-800">
                                                                    📝 Catatan
                                                                    Pemeriksaan
                                                                </h4>
                                                                <p className="whitespace-pre-line text-sm text-gray-700">
                                                                    {item.catatan_pemeriksaan ||
                                                                        'Tidak ada catatan.'}
                                                                </p>
                                                            </div>

                                                            {/* Riwayat Sakit (jika ada) */}
                                                            <div className="mt-4">
                                                                <h4 className="mb-2 font-semibold text-gray-800">
                                                                    🤒 Riwayat
                                                                    Sakit
                                                                </h4>
                                                                {riwayatSakit.length >
                                                                0 ? (
                                                                    <div className="overflow-x-auto">
                                                                        <table className="min-w-full text-sm">
                                                                            <thead>
                                                                                <tr className="border-b bg-gray-100">
                                                                                    <th className="px-3 py-2 text-left font-medium text-gray-600">
                                                                                        Tanggal
                                                                                    </th>
                                                                                    <th className="px-3 py-2 text-left font-medium text-gray-600">
                                                                                        Diagnosis
                                                                                    </th>
                                                                                    <th className="px-3 py-2 text-left font-medium text-gray-600">
                                                                                        Gejala
                                                                                    </th>
                                                                                    <th className="px-3 py-2 text-left font-medium text-gray-600">
                                                                                        Tindakan
                                                                                    </th>
                                                                                    <th className="px-3 py-2 text-left font-medium text-gray-600">
                                                                                        Catatan
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {riwayatSakit.map(
                                                                                    (
                                                                                        rs: any,
                                                                                        i: number,
                                                                                    ) => (
                                                                                        <tr
                                                                                            key={
                                                                                                i
                                                                                            }
                                                                                            className="border-b last:border-0 hover:bg-gray-50"
                                                                                        >
                                                                                            <td className="px-3 py-2 text-gray-800">
                                                                                                {new Date(
                                                                                                    rs.tanggal_sakit,
                                                                                                ).toLocaleDateString(
                                                                                                    'id-ID',
                                                                                                )}
                                                                                            </td>
                                                                                            <td className="px-3 py-2 text-gray-700">
                                                                                                {
                                                                                                    rs.diagnosis
                                                                                                }
                                                                                            </td>
                                                                                            <td className="px-3 py-2 text-gray-700">
                                                                                                {
                                                                                                    rs.gejala
                                                                                                }
                                                                                            </td>
                                                                                            <td className="px-3 py-2 text-gray-700">
                                                                                                {
                                                                                                    rs.tindakan_pengobatan
                                                                                                }
                                                                                            </td>
                                                                                            <td className="px-3 py-2 text-gray-700">
                                                                                                {
                                                                                                    rs.catatan
                                                                                                }
                                                                                            </td>
                                                                                        </tr>
                                                                                    ),
                                                                                )}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                ) : (
                                                                    <p className="text-sm italic text-gray-500">
                                                                        Tidak
                                                                        ada
                                                                        riwayat
                                                                        sakit
                                                                        pada
                                                                        kunjungan
                                                                        ini.
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
