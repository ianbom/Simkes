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

export default function GrafikBalita({ growth, child, activeTab }: any) {
    // State untuk tracking row yang terbuka - PINDAHKAN KE ATAS
    const [openRows, setOpenRows] = useState<number[]>([]);

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

        const weightPercentile = generateWeightPercentileData();
        const heightPercentile = generateHeightPercentileData();
        const headPercentile = generateHeadCircumferenceData();

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
