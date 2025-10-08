import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Weight } from 'lucide-react';
import { useState } from 'react';
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

// Generate data untuk Berat Badan (Weight)
const generateWeightPercentileData = () => {
    const months = Array.from({ length: 61 }, (_, i) => i);
    return months.map((month) => ({
        month,
        p3: 2 + month * 0.15 + Math.log(month + 1) * 0.3,
        p15: 2.5 + month * 0.17 + Math.log(month + 1) * 0.35,
        p50: 3.2 + month * 0.19 + Math.log(month + 1) * 0.4,
        p85: 3.8 + month * 0.21 + Math.log(month + 1) * 0.45,
        p97: 4.5 + month * 0.23 + Math.log(month + 1) * 0.5,
    }));
};

// Generate data untuk Tinggi Badan (Height)
const generateHeightPercentileData = () => {
    const months = Array.from({ length: 61 }, (_, i) => i);
    return months.map((month) => ({
        month,
        p3: 45 + month * 0.8 + Math.log(month + 1) * 1.2,
        p15: 47 + month * 0.85 + Math.log(month + 1) * 1.3,
        p50: 50 + month * 0.9 + Math.log(month + 1) * 1.4,
        p85: 52 + month * 0.95 + Math.log(month + 1) * 1.5,
        p97: 54 + month * 1.0 + Math.log(month + 1) * 1.6,
    }));
};

// Generate data untuk Lingkar Kepala (Head Circumference)
const generateHeadCircumferenceData = () => {
    const months = Array.from({ length: 61 }, (_, i) => i);
    return months.map((month) => ({
        month,
        p3: 32 + month * 0.12 + Math.log(month + 1) * 0.4,
        p15: 33 + month * 0.13 + Math.log(month + 1) * 0.45,
        p50: 34.5 + month * 0.14 + Math.log(month + 1) * 0.5,
        p85: 35.5 + month * 0.15 + Math.log(month + 1) * 0.55,
        p97: 36.5 + month * 0.16 + Math.log(month + 1) * 0.6,
    }));
};

const childData = {
    name: 'Senjani Thalita',
    birthDate: '18 Juni 2023',
    gender: 'female',
    weight: [
        { month: 0, value: 3.2 },
        { month: 2, value: 5.1 },
        { month: 4, value: 6.3 },
        { month: 6, value: 7.2 },
        { month: 9, value: 8.1 },
        { month: 12, value: 8.9 },
        { month: 15, value: 9.5 },
        { month: 18, value: 10.2 },
        { month: 22, value: 8.5 },
    ],
    height: [
        { month: 0, value: 49 },
        { month: 2, value: 57 },
        { month: 4, value: 62 },
        { month: 6, value: 66 },
        { month: 9, value: 70 },
        { month: 12, value: 74 },
        { month: 15, value: 77 },
        { month: 18, value: 80 },
        { month: 22, value: 75 },
    ],
    headCircumference: [
        { month: 0, value: 34 },
        { month: 2, value: 38 },
        { month: 4, value: 40.5 },
        { month: 6, value: 42 },
        { month: 9, value: 43.5 },
        { month: 12, value: 45 },
        { month: 15, value: 46 },
        { month: 18, value: 47 },
        { month: 22, value: 45.5 },
    ],
};

const chartConfigs = {
    weight: {
        title: 'Grafik Berat Badan per Usia',
        yAxisLabel: 'Berat Badan (Kg)',
        unit: 'Kg',
        yDomain: [2, 28],
        data: generateWeightPercentileData(),
        measurements: childData.weight,
        status: {
            value: 8.5,
            zScore: -5,
            category: 'stunting berat',
            color: 'red',
        },
    },
    height: {
        title: 'Grafik Tinggi Badan per Usia',
        yAxisLabel: 'Tinggi Badan (cm)',
        unit: 'cm',
        yDomain: [40, 120],
        data: generateHeightPercentileData(),
        measurements: childData.height,
        status: {
            value: 75,
            zScore: -3,
            category: 'pendek (stunted)',
            color: 'orange',
        },
    },
    headCircumference: {
        title: 'Grafik Lingkar Kepala per Usia',
        yAxisLabel: 'Lingkar Kepala (cm)',
        unit: 'cm',
        yDomain: [30, 55],
        data: generateHeadCircumferenceData(),
        measurements: childData.headCircumference,
        status: {
            value: 45.5,
            zScore: -2,
            category: 'di bawah normal',
            color: 'yellow',
        },
    },
};

const ChildGraphPage = () => {
    const [activeTab, setActiveTab] = useState('weight');

    const currentConfig = chartConfigs[activeTab];
    const currentData =
        currentConfig.measurements[currentConfig.measurements.length - 1];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg">
                    <p className="mb-1 text-sm font-semibold text-gray-800">
                        Usia : {data.month} Bulan
                    </p>
                    <p className="text-sm text-gray-700">
                        {currentConfig.yAxisLabel} : {currentData.value}{' '}
                        {currentConfig.unit}
                    </p>
                    <p className="text-sm text-gray-600">
                        Z-Score : {currentConfig.status.zScore}
                    </p>
                    <p className="text-sm font-semibold text-blue-600">
                        Kategori : {currentConfig.status.category}
                    </p>
                </div>
            );
        }
        return null;
    };

    const getStatusColor = (color) => {
        const colors = {
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
        };
        return colors[color] || colors.red;
    };

    const statusColors = getStatusColor(currentConfig.status.color);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-8">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
                    <h1 className="mb-6 text-2xl font-bold text-gray-800">
                        Grafik Pertumbuhan Anak
                    </h1>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                        {/* Info Anak */}
                        <div className="rounded-xl border border-purple-100 bg-white p-4 shadow-sm lg:col-span-2">
                            <div className="flex h-full items-center gap-4">
                                {/* Avatar */}
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-200">
                                    <img
                                        src="/assets/images/profile-8.jpeg"
                                        alt="Profile Anak"
                                        className="h-14 w-14 rounded-full object-contain"
                                    />
                                </div>

                                {/* Info Anak */}
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-semibold text-gray-800">
                                        {childData.name}
                                    </h3>
                                    <p className="text-sm text-blue-500">
                                        {childData.birthDate}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Metric Cards */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:col-span-2">
                            {/* Tinggi Badan */}
                            <button
                                className={`rounded-xl p-4 text-left transition-all duration-200 ${
                                    activeTab === 'height'
                                        ? 'bg-sky-700'
                                        : 'border-2 border-sky-200 bg-sky-50 hover:bg-sky-100'
                                }`}
                                onClick={() => setActiveTab('height')}
                            >
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${
                                            activeTab === 'height'
                                                ? 'bg-white'
                                                : 'bg-sky-50'
                                        }`}
                                    >
                                        <img
                                            src="/assets/images/tinggibayi.png"
                                            alt="Tinggi Badan Icon"
                                            className="h-10 w-10 object-contain"
                                        />
                                    </div>
                                    <span
                                        className={`text-sm font-medium ${
                                            activeTab === 'height'
                                                ? 'font-semibold text-white'
                                                : 'text-cyan-600'
                                        }`}
                                    >
                                        Tinggi Badan
                                    </span>
                                </div>
                            </button>

                            {/* Berat Badan */}
                            <button
                                className={`rounded-xl p-4 text-left transition-all duration-200 ${
                                    activeTab === 'weight'
                                        ? 'bg-sky-700'
                                        : 'border-2 border-sky-200 bg-sky-50 hover:bg-sky-100'
                                }`}
                                onClick={() => setActiveTab('weight')}
                            >
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${
                                            activeTab === 'weight'
                                                ? 'bg-white'
                                                : 'bg-sky-50'
                                        }`}
                                    >
                                        <Weight
                                            className={`h-8 w-8 ${
                                                activeTab === 'weight'
                                                    ? 'text-sky-400'
                                                    : 'text-sky-400'
                                            }`}
                                        />
                                    </div>
                                    <span
                                        className={`text-sm font-medium ${
                                            activeTab === 'weight'
                                                ? 'font-semibold text-white'
                                                : 'text-blue-600'
                                        }`}
                                    >
                                        Berat Badan
                                    </span>
                                </div>
                            </button>

                            {/* Lingkar Kepala */}
                            <button
                                className={`rounded-xl p-4 text-left transition-all duration-200 ${
                                    activeTab === 'headCircumference'
                                        ? 'bg-sky-700'
                                        : 'border-2 border-sky-200 bg-sky-50 hover:bg-sky-100'
                                }`}
                                onClick={() =>
                                    setActiveTab('headCircumference')
                                }
                            >
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${
                                            activeTab === 'height'
                                                ? 'bg-white'
                                                : 'bg-sky-50'
                                        }`}
                                    >
                                        <img
                                            src="/assets/images/lingkarbayi.png"
                                            alt="Tinggi Badan Icon"
                                            className="h-10 w-10 object-contain"
                                        />
                                    </div>
                                    <span
                                        className={`text-sm font-medium ${
                                            activeTab === 'headCircumference'
                                                ? 'font-semibold text-white'
                                                : 'text-teal-600'
                                        }`}
                                    >
                                        Lingkar Kepala
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="rounded-2xl bg-white p-8 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {currentConfig.title}
                        </h2>
                        <Select>
                            <SelectTrigger id="rentang_usia">
                                <SelectValue placeholder="Pilih Rentang Usia" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="awal">0-6 Bulan</SelectItem>
                                <SelectItem value="tengah">
                                    6-12 Bulan
                                </SelectItem>
                                <SelectItem value="akhir">
                                    12-18 Bulan
                                </SelectItem>
                            </SelectContent>
                        </Select>
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
                                        stopColor="#eab308"
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#eab308"
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
                                    id="colorP97"
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
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e5e7eb"
                            />

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

                            {/* Percentile Areas */}
                            <Area
                                type="monotone"
                                dataKey="p97"
                                stroke="#fbbf24"
                                fill="url(#colorP97)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="p85"
                                stroke="#84cc16"
                                fill="url(#colorP85)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="p50"
                                stroke="#eab308"
                                fill="url(#colorP50)"
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
                                dataKey="p3"
                                stroke="#ef4444"
                                fill="url(#colorP3)"
                                strokeWidth={2}
                            />

                            {/* Child's data point */}
                            <ReferenceDot
                                x={currentData.month}
                                y={currentData.value}
                                r={8}
                                fill="#3b82f6"
                                stroke="#fff"
                                strokeWidth={3}
                            />
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
                                style={{ backgroundColor: '#eab308' }}
                            ></div>
                            <span className="text-gray-600">P50</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className="h-4 w-4 rounded"
                                style={{ backgroundColor: '#84cc16' }}
                            ></div>
                            <span className="text-gray-600">P85</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className="h-4 w-4 rounded"
                                style={{ backgroundColor: '#fbbf24' }}
                            ></div>
                            <span className="text-gray-600">P97</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full border-2 border-white bg-blue-500"></div>
                            <span className="text-gray-600">Data Anak</span>
                        </div>
                    </div>

                    {/* Status Info */}
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
                                        `Berat badan anak berada di bawah kurva P3 dengan Z-Score ${currentConfig.status.zScore}, menandakan `}
                                    {activeTab === 'height' &&
                                        `Tinggi badan anak berada di bawah kurva P3 dengan Z-Score ${currentConfig.status.zScore}, menandakan `}
                                    {activeTab === 'headCircumference' &&
                                        `Lingkar kepala anak berada di bawah kurva P15 dengan Z-Score ${currentConfig.status.zScore}, menandakan `}
                                    <span className="font-semibold">
                                        {' '}
                                        {currentConfig.status.category}
                                    </span>
                                    . Diperlukan konsultasi dengan ahli gizi dan
                                    dokter anak untuk penanganan lebih lanjut.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChildGraphPage;
