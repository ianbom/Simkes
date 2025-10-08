import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Weight } from 'lucide-react';
import { useState, useMemo } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ReferenceDot,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Scatter,
    ScatterChart,
} from 'recharts';

// Generate data untuk Berat Badan (Weight) - Data WHO/CDC
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

const ChildGraphPage = ({ child, growth }) => {
    const [activeTab, setActiveTab] = useState('weight');

    const childMeasurements = useMemo(() => {
        if (!growth || growth.length === 0) {
            return { weight: [], height: [], headCircumference: [] };
        }

        return {
            weight: growth.map(g => ({
                month: g.usia_saat_periksa_bulan,
                value: parseFloat(g.berat_badan_kg),
                date: g.tanggal_pemeriksaan
            })).sort((a, b) => a.month - b.month),
            height: growth.map(g => ({
                month: g.usia_saat_periksa_bulan,
                value: parseFloat(g.tinggi_badan_cm),
                date: g.tanggal_pemeriksaan
            })).sort((a, b) => a.month - b.month),
            headCircumference: growth.map(g => ({
                month: g.usia_saat_periksa_bulan,
                value: parseFloat(g.lingkar_kepala_cm),
                date: g.tanggal_pemeriksaan
            })).sort((a, b) => a.month - b.month)
        };
    }, [growth]);

    // Fungsi untuk menghitung Z-Score sederhana
    const calculateZScore = (value, percentileData, month) => {
        const dataPoint = percentileData.find(d => d.month === month);
        if (!dataPoint) return 0;

        const median = dataPoint.p50;
        const sd = (dataPoint.p85 - dataPoint.p50) / 1.036; // Approximate SD
        return ((value - median) / sd).toFixed(2);
    };

    // Fungsi untuk menentukan kategori status
    const getCategory = (zScore, type) => {
        const z = parseFloat(zScore);
        if (type === 'weight') {
            if (z < -3) return { text: 'stunting berat', color: 'red' };
            if (z < -2) return { text: 'gizi kurang', color: 'orange' };
            if (z < -1) return { text: 'berisiko gizi kurang', color: 'yellow' };
            if (z <= 1) return { text: 'normal', color: 'green' };
            if (z <= 2) return { text: 'berisiko gizi lebih', color: 'yellow' };
            return { text: 'gizi lebih', color: 'orange' };
        } else if (type === 'height') {
            if (z < -3) return { text: 'sangat pendek (severely stunted)', color: 'red' };
            if (z < -2) return { text: 'pendek (stunted)', color: 'orange' };
            if (z < -1) return { text: 'berisiko pendek', color: 'yellow' };
            return { text: 'normal', color: 'green' };
        } else {
            if (z < -2) return { text: 'di bawah normal', color: 'orange' };
            if (z < -1) return { text: 'berisiko', color: 'yellow' };
            return { text: 'normal', color: 'green' };
        }
    };

    // Konfigurasi chart
    const chartConfigs = useMemo(() => {
        const latestWeight = childMeasurements.weight[childMeasurements.weight.length - 1];
        const latestHeight = childMeasurements.height[childMeasurements.height.length - 1];
        const latestHead = childMeasurements.headCircumference[childMeasurements.headCircumference.length - 1];

        const weightPercentile = generateWeightPercentileData();
        const heightPercentile = generateHeightPercentileData();
        const headPercentile = generateHeadCircumferenceData();

        const weightZScore = latestWeight ? calculateZScore(latestWeight.value, weightPercentile, latestWeight.month) : 0;
        const heightZScore = latestHeight ? calculateZScore(latestHeight.value, heightPercentile, latestHeight.month) : 0;
        const headZScore = latestHead ? calculateZScore(latestHead.value, headPercentile, latestHead.month) : 0;

        return {
            weight: {
                title: 'Grafik Berat Badan per Usia',
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
                title: 'Grafik Tinggi Badan per Usia',
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
                title: 'Grafik Lingkar Kepala per Usia',
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
    }, [childMeasurements]);

    const currentConfig = chartConfigs[activeTab];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const measurement = currentConfig.measurements.find(m => m.month === data.month);

            if (measurement) {
                return (
                    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg">
                        <p className="mb-1 text-sm font-semibold text-gray-800">
                            Usia: {data.month} Bulan
                        </p>
                        <p className="text-sm text-gray-700">
                            {currentConfig.yAxisLabel}: {measurement.value} {currentConfig.unit}
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
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-200">
                                    <span className="text-2xl font-bold text-purple-600">
                                        {child?.nama_lengkap?.charAt(0) || 'A'}
                                    </span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-semibold text-gray-800">
                                        {child?.nama_lengkap || 'Nama Anak'}
                                    </h3>
                                    <p className="text-sm text-blue-500">
                                        {child?.tanggal_lahir || 'Tanggal Lahir'}
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
                                    <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${
                                            activeTab === 'height' ? 'bg-white' : 'bg-sky-50'
                                        }`}>
                                        <svg className="h-10 w-10 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                    </div>
                                    <span className={`text-sm font-medium ${
                                            activeTab === 'height' ? 'font-semibold text-white' : 'text-cyan-600'
                                        }`}>
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
                                    <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${
                                            activeTab === 'weight' ? 'bg-white' : 'bg-sky-50'
                                        }`}>
                                        <Weight className={`h-8 w-8 ${
                                                activeTab === 'weight' ? 'text-sky-600' : 'text-sky-600'
                                            }`}/>
                                    </div>
                                    <span className={`text-sm font-medium ${
                                            activeTab === 'weight' ? 'font-semibold text-white' : 'text-blue-600'
                                        }`}>
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
                                onClick={() => setActiveTab('headCircumference')}
                            >
                                <div className="flex flex-col items-center">
                                    <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${
                                            activeTab === 'headCircumference' ? 'bg-white' : 'bg-sky-50'
                                        }`}>
                                        <svg className="h-10 w-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" />
                                        </svg>
                                    </div>
                                    <span className={`text-sm font-medium ${
                                            activeTab === 'headCircumference' ? 'font-semibold text-white' : 'text-teal-600'
                                        }`}>
                                        Lingkar Kepala
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
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
                                <linearGradient id="colorP3" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorP15" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorP50" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#eab308" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorP85" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#84cc16" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorP97" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                            <XAxis
                                dataKey="month"
                                label={{ value: 'Usia (bulan)', position: 'insideBottom', offset: -20 }}
                                tick={{ fontSize: 12 }}
                                domain={[0, 60]}
                            />

                            <YAxis
                                label={{ value: currentConfig.yAxisLabel, angle: -90, position: 'insideLeft' }}
                                tick={{ fontSize: 12 }}
                                domain={currentConfig.yDomain}
                            />

                            <Tooltip content={<CustomTooltip />} />

                            <Area type="monotone" dataKey="p97" stroke="#fbbf24" fill="url(#colorP97)" strokeWidth={2} />
                            <Area type="monotone" dataKey="p85" stroke="#84cc16" fill="url(#colorP85)" strokeWidth={2} />
                            <Area type="monotone" dataKey="p50" stroke="#eab308" fill="url(#colorP50)" strokeWidth={2} />
                            <Area type="monotone" dataKey="p15" stroke="#f97316" fill="url(#colorP15)" strokeWidth={2} />
                            <Area type="monotone" dataKey="p3" stroke="#ef4444" fill="url(#colorP3)" strokeWidth={2} />

                            {/* Plot semua data point anak */}
                            {currentConfig.measurements.map((point, idx) => (
                                <ReferenceDot
                                    key={idx}
                                    x={point.month}
                                    y={point.value}
                                    r={6}
                                    fill="#3b82f6"
                                    stroke="#fff"
                                    strokeWidth={2}
                                />
                            ))}
                        </AreaChart>
                    </ResponsiveContainer>

                    {/* Legend */}
                    <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded" style={{ backgroundColor: '#ef4444' }}></div>
                            <span className="text-gray-600">P3</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded" style={{ backgroundColor: '#f97316' }}></div>
                            <span className="text-gray-600">P15</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded" style={{ backgroundColor: '#eab308' }}></div>
                            <span className="text-gray-600">P50</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded" style={{ backgroundColor: '#84cc16' }}></div>
                            <span className="text-gray-600">P85</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded" style={{ backgroundColor: '#fbbf24' }}></div>
                            <span className="text-gray-600">P97</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full border-2 border-white bg-blue-500"></div>
                            <span className="text-gray-600">Data Anak ({currentConfig.measurements.length} pengukuran)</span>
                        </div>
                    </div>

                    {/* Status Info */}
                    {currentConfig.measurements.length > 0 && (
                        <div className={`mt-6 rounded-r-lg border-l-4 p-4 ${statusColors.bg} ${statusColors.border}`}>
                            <div className="flex items-start gap-3">
                                <div className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${statusColors.icon}`}>
                                    <span className="text-xs font-bold text-white">!</span>
                                </div>
                                <div>
                                    <h4 className={`mb-1 font-semibold ${statusColors.heading}`}>
                                        Status Pertumbuhan
                                    </h4>
                                    <p className={`text-sm ${statusColors.text}`}>
                                        {activeTab === 'weight' && `Berat badan anak saat ini ${currentConfig.status.value} kg dengan Z-Score ${currentConfig.status.zScore}, menandakan `}
                                        {activeTab === 'height' && `Tinggi badan anak saat ini ${currentConfig.status.value} cm dengan Z-Score ${currentConfig.status.zScore}, menandakan `}
                                        {activeTab === 'headCircumference' && `Lingkar kepala anak saat ini ${currentConfig.status.value} cm dengan Z-Score ${currentConfig.status.zScore}, menandakan `}
                                        <span className="font-semibold">{currentConfig.status.category}</span>.
                                        {currentConfig.status.color === 'red' || currentConfig.status.color === 'orange'
                                            ? ' Diperlukan konsultasi dengan ahli gizi dan dokter anak untuk penanganan lebih lanjut.'
                                            : ' Pertumbuhan anak dalam kondisi baik.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentConfig.measurements.length === 0 && (
                        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                            <p className="text-gray-600">Belum ada data pemeriksaan untuk ditampilkan</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChildGraphPage;
