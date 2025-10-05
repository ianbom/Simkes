import { useState } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ReferenceDot,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

// Data perkembangan janin per minggu kehamilan
const generateFetalData = () => {
    const weeks = Array.from({ length: 40 }, (_, i) => i + 1);
    return weeks.map((week) => {
        let weight = 0;
        let length = 0;
        let heartRate = 0;

        // Rumus estimasi berat janin (dalam gram)
        if (week <= 8) {
            weight = week * 0.15;
        } else if (week <= 20) {
            weight = Math.pow(week - 8, 2.5) * 2;
        } else {
            weight = Math.pow(week - 8, 2.8) * 2.2;
        }

        // Rumus estimasi panjang janin (dalam cm)
        if (week <= 12) {
            length = week * 0.8;
        } else if (week <= 28) {
            length = 5 + (week - 12) * 1.5;
        } else {
            length = 29 + (week - 28) * 1.0;
        }

        // Detak jantung janin (dalam bpm)
        if (week <= 6) {
            heartRate = 80 + week * 15;
        } else if (week <= 9) {
            heartRate = 170 + (week - 6) * 5;
        } else if (week <= 14) {
            heartRate = 185 - (week - 9) * 2;
        } else {
            heartRate = 170 - (week - 14) * 2;
        }

        return {
            week,
            weight: parseFloat(weight.toFixed(1)),
            length: parseFloat(length.toFixed(1)),
            heartRate: Math.round(heartRate),
        };
    });
};

const pregnancyData = {
    name: 'Senjani Nathania',
    birthDate: '10 Juni 1999',
    measurements: [
        { week: 4, weight: 0.5, length: 0.2, heartRate: 0 },
        { week: 8, weight: 1.0, length: 1.6, heartRate: 170 },
        { week: 11, weight: 7, length: 4.1, heartRate: 165 },
        { week: 12, weight: 14, length: 5.4, heartRate: 160 },
        { week: 16, weight: 100, length: 11.6, heartRate: 155 },
        { week: 20, weight: 300, length: 25.6, heartRate: 150 },
        { week: 24, weight: 600, length: 30.0, heartRate: 145 },
        { week: 28, weight: 1000, length: 37.6, heartRate: 140 },
        { week: 32, weight: 1700, length: 42.4, heartRate: 140 },
        { week: 36, weight: 2600, length: 47.4, heartRate: 140 },
    ],
};

const PregnancyGraphPage = () => {
    const [activeTrimester, setActiveTrimester] = useState(1);

    const fetalData = generateFetalData();
    const currentWeek = 11;
    const currentData = pregnancyData.measurements.find(
        (m) => m.week === currentWeek,
    );

    // Filter data berdasarkan trimester
    const getFilteredData = () => {
        if (activeTrimester === 1) {
            return fetalData.filter((d) => d.week <= 13);
        } else if (activeTrimester === 2) {
            return fetalData.filter((d) => d.week >= 14 && d.week <= 27);
        } else {
            return fetalData.filter((d) => d.week >= 28);
        }
    };

    const filteredData = getFilteredData();

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg">
                    <p className="mb-1 text-sm font-semibold text-gray-800">
                        Minggu Kehamilan: {data.week}
                    </p>
                    <p className="text-sm text-blue-600">
                        Berat: {currentData?.weight || data.weight} gram
                    </p>
                    <p className="text-sm text-teal-600">
                        Panjang: {currentData?.length || data.length} cm
                    </p>
                    <p className="text-sm text-pink-600">
                        Detak Jantung:{' '}
                        {currentData?.heartRate || data.heartRate} bpm
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-8">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
                    <h1 className="mb-6 text-2xl font-bold text-gray-800">
                        Grafik Perkembangan Janin
                    </h1>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {/* Info Ibu */}
                        <div className="rounded-xl border border-purple-100 bg-white p-4 shadow-sm">
                            <div className="flex h-full items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-200">
                                    <img
                                        src="/assets/images/profile-8.jpeg"
                                        alt="Profile"
                                        className="h-14 w-14 rounded-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-semibold text-gray-800">
                                        {pregnancyData.name}
                                    </h3>
                                    <p className="text-sm text-blue-500">
                                        {pregnancyData.birthDate}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trimester Cards */}
                        <div className="grid grid-cols-3 gap-3">
                            {[1, 2, 3].map((trimester) => (
                                <button
                                    key={trimester}
                                    className={`rounded-xl p-4 text-center transition-all duration-200 ${
                                        activeTrimester === trimester
                                            ? 'bg-sky-700'
                                            : 'border-2 border-sky-200 bg-sky-50 hover:bg-sky-100'
                                    }`}
                                    onClick={() =>
                                        setActiveTrimester(trimester)
                                    }
                                >
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${
                                                activeTrimester === trimester
                                                    ? 'bg-white'
                                                    : 'bg-sky-100'
                                            }`}
                                        >
                                            <span
                                                className={`text-2xl ${
                                                    activeTrimester ===
                                                    trimester
                                                        ? 'text-blue-500'
                                                        : 'text-blue-400'
                                                }`}
                                            >
                                                🤰
                                            </span>
                                        </div>
                                        <span
                                            className={`text-sm font-semibold ${
                                                activeTrimester === trimester
                                                    ? 'text-white'
                                                    : 'text-blue-600'
                                            }`}
                                        >
                                            Trimester {trimester}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="rounded-2xl bg-white p-8 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Grafik Perkembangan Janin - Trimester{' '}
                            {activeTrimester}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {activeTrimester === 1 && 'Minggu 1-13'}
                            {activeTrimester === 2 && 'Minggu 14-27'}
                            {activeTrimester === 3 && 'Minggu 28-40'}
                        </p>
                    </div>

                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={filteredData}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 20,
                                bottom: 30,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e5e7eb"
                            />

                            <XAxis
                                dataKey="week"
                                label={{
                                    value: 'Minggu Kehamilan',
                                    position: 'insideBottom',
                                    offset: -10,
                                }}
                                tick={{ fontSize: 12 }}
                            />

                            <YAxis
                                yAxisId="left"
                                label={{
                                    value: 'Nilai Perkembangan',
                                    angle: -90,
                                    position: 'insideLeft',
                                }}
                                tick={{ fontSize: 12 }}
                            />

                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                tick={{ fontSize: 12 }}
                            />

                            <Tooltip content={<CustomTooltip />} />

                            <Legend
                                wrapperStyle={{ paddingTop: '20px' }}
                                iconType="circle"
                            />

                            {/* Berat Janin */}
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="weight"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={false}
                                name="Berat Janin (skala ×10)"
                                isAnimationActive={true}
                            />

                            {/* Panjang Janin */}
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="length"
                                stroke="#14b8a6"
                                strokeWidth={2}
                                dot={false}
                                name="Panjang Janin"
                                isAnimationActive={true}
                            />

                            {/* Detak Jantung */}
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="heartRate"
                                stroke="#ec4899"
                                strokeWidth={2}
                                dot={false}
                                name="Detak Jantung (skala ×10)"
                                isAnimationActive={true}
                            />

                            {/* Data point saat ini */}
                            {currentData && (
                                <>
                                    <ReferenceDot
                                        yAxisId="left"
                                        x={currentWeek}
                                        y={currentData.weight}
                                        r={6}
                                        fill="#3b82f6"
                                        stroke="#fff"
                                        strokeWidth={2}
                                    />
                                    <ReferenceDot
                                        yAxisId="left"
                                        x={currentWeek}
                                        y={currentData.length}
                                        r={6}
                                        fill="#14b8a6"
                                        stroke="#fff"
                                        strokeWidth={2}
                                    />
                                    <ReferenceDot
                                        yAxisId="right"
                                        x={currentWeek}
                                        y={currentData.heartRate}
                                        r={6}
                                        fill="#ec4899"
                                        stroke="#fff"
                                        strokeWidth={2}
                                    />
                                </>
                            )}
                        </LineChart>
                    </ResponsiveContainer>

                    {/* Current Status Info */}
                    {currentData && (
                        <div className="mt-6 rounded-xl border-l-4 border-blue-500 bg-blue-50 p-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                    <span className="text-xs font-bold text-white">
                                        i
                                    </span>
                                </div>
                                <div>
                                    <h4 className="mb-1 font-semibold text-blue-800">
                                        Minggu Kehamilan: {currentWeek}
                                    </h4>
                                    <div className="space-y-1 text-sm text-blue-700">
                                        <p>
                                            <span className="font-medium">
                                                Berat:
                                            </span>{' '}
                                            {currentData.weight} gram
                                        </p>
                                        <p>
                                            <span className="font-medium">
                                                Panjang:
                                            </span>{' '}
                                            {currentData.length} cm
                                        </p>
                                        <p>
                                            <span className="font-medium">
                                                Detak Jantung:
                                            </span>{' '}
                                            {currentData.heartRate} bpm
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PregnancyGraphPage;
