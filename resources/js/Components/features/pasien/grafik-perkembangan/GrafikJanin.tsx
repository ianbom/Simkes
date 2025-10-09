import { useMemo } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

// TypeScript interfaces
interface Kehamilan {
    id: number;
    user_id: number;
    hpht: string;
    hpl: string;
    tinggi_badan_awal: string;
    user?: {
        name: string;
        tanggal_lahir: string;
    };
    janin?: Janin[];
}

interface Janin {
    id: number;
    pemeriksaan_anc_id: number;
    kehamilan_id: number;
    urutan_janin: number;
    denyut_jantung_janin: number;
    taksiran_berat_janin: number;
    panjang_janin_cm: string;
    posisi_janin: string;
    pergerakan_janin: string;
    created_at: string;
}

interface PemeriksaanAnc {
    id: number;
    kehamilan_id: number;
    tanggal_checkup: string;
    berat_badan: string;
    tinggi_fundus: string;
    frekuensi_jantung_per_menit: number;
    tekanan_darah_sistolik: number;
    tekanan_darah_diastolik: number;
    lila: string;
}

interface Props {
    pregnant: Kehamilan;
    growth: PemeriksaanAnc[];
    activeTrimester: number;
}

const calculatePregnancyWeek = (hpht: string, checkupDate: string): number => {
    const hphtDate = new Date(hpht);
    const checkDate = new Date(checkupDate);
    const diffTime = checkDate.getTime() - hphtDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 7);
};

const generateFetalReferenceData = () => {
    const weeks = Array.from({ length: 40 }, (_, i) => i + 1);
    return weeks.map((week) => {
        let weight = 0;
        let length = 0;
        let heartRate = 0;

        if (week <= 8) {
            weight = week * 0.15;
        } else if (week <= 20) {
            weight = Math.pow(week - 8, 2.5) * 2;
        } else {
            weight = Math.pow(week - 8, 2.8) * 2.2;
        }

        if (week <= 12) {
            length = week * 0.8;
        } else if (week <= 28) {
            length = 5 + (week - 12) * 1.5;
        } else {
            length = 29 + (week - 28) * 1.0;
        }

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
            refWeight: parseFloat(weight.toFixed(1)),
            refLength: parseFloat(length.toFixed(1)),
            refHeartRate: Math.round(heartRate),
        };
    });
};

export default function GrafikJanin({ growth, pregnant, activeTrimester }: Props) {
    const fetalMeasurements = useMemo(() => {
        if (!pregnant.janin) return [];

        return pregnant.janin.map((janin) => {
            const ancData = growth.find(g => g.id === janin.pemeriksaan_anc_id);
            if (!ancData) return null;

            const week = calculatePregnancyWeek(pregnant.hpht, ancData.tanggal_checkup);
            return {
                week,
                beratJanin: janin.taksiran_berat_janin,
                panjangJanin: parseFloat(janin.panjang_janin_cm),
                detak_jantung: janin.denyut_jantung_janin,
                posisi: janin.posisi_janin,
                pergerakan: janin.pergerakan_janin,
                date: ancData.tanggal_checkup,
            };
        }).filter(Boolean).sort((a, b) => a.week - b.week);
    }, [pregnant.janin, pregnant.hpht, growth]);

    const fetalReferenceData = generateFetalReferenceData();

    const getFilteredFetalData = () => {
        const referenceData = fetalReferenceData.filter((d) => {
            if (activeTrimester === 1) return d.week <= 13;
            if (activeTrimester === 2) return d.week >= 14 && d.week <= 27;
            return d.week >= 28;
        });

        const actualData = fetalMeasurements.filter((d) => {
            if (activeTrimester === 1) return d.week <= 13;
            if (activeTrimester === 2) return d.week >= 14 && d.week <= 27;
            return d.week >= 28;
        });

        const combinedData = [...referenceData];

        actualData.forEach((actual) => {
            const index = combinedData.findIndex(d => d.week === actual.week);
            if (index !== -1) {
                combinedData[index] = {
                    ...combinedData[index],
                    actualWeight: actual.beratJanin,
                    actualLength: actual.panjangJanin,
                    actualHeartRate: actual.detak_jantung,
                };
            }
        });

        return combinedData;
    };

    const filteredFetalData = getFilteredFetalData();

    const FetalTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const actualData = fetalMeasurements.find(m => m.week === data.week);

            return (
                <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg">
                    <p className="mb-1 text-sm font-semibold text-gray-800">
                        Minggu Kehamilan: {data.week}
                    </p>
                    {actualData && (
                        <>
                            <p className="text-xs text-gray-500 mb-2">
                                Tanggal: {new Date(actualData.date).toLocaleDateString('id-ID')}
                            </p>
                            <p className="text-sm text-blue-600 font-medium">
                                Berat Janin: {actualData.beratJanin} gram
                            </p>
                            <p className="text-sm text-green-600 font-medium">
                                Panjang Janin: {actualData.panjangJanin} cm
                            </p>
                            <p className="text-sm text-red-600 font-medium">
                                Detak Jantung: {actualData.detak_jantung} bpm
                            </p>
                            <p className="text-sm text-purple-600 mt-1">
                                Posisi: {actualData.posisi}
                            </p>
                        </>
                    )}
                    {!actualData && (
                        <p className="text-xs text-gray-400 italic">
                            Data referensi (belum ada pemeriksaan)
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    📊 Grafik Perkembangan Janin - Trimester {activeTrimester}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    {activeTrimester === 1 && 'Minggu 1-13'}
                    {activeTrimester === 2 && 'Minggu 14-27'}
                    {activeTrimester === 3 && 'Minggu 28-40'}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                    Garis putus-putus menunjukkan referensi normal, garis solid menunjukkan data pemeriksaan aktual
                </p>
            </div>

        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={filteredFetalData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 30,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

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
                        value: 'Berat & Panjang Janin',
                        angle: -90,
                        position: 'insideLeft',
                    }}
                    tick={{ fontSize: 12 }}
                />

                <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                        value: 'Detak Jantung (bpm)',
                        angle: 90,
                        position: 'insideRight',
                    }}
                    tick={{ fontSize: 12 }}
                />

                <Tooltip content={<FetalTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />

                {/* ============================== */}
                {/* 🔵 Berat Janin */}
                {/* ============================== */}
                <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="actualWeight"
                    stroke="#3b82f6" // biru
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#3b82f6' }}
                    name="Berat Janin (gram)"
                    isAnimationActive={true}
                    connectNulls={true}
                />

                {/* ============================== */}
                {/* 💚 Panjang Janin */}
                {/* ============================== */}
                <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="actualLength"
                    stroke="#10b981" // hijau
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#10b981' }}
                    name="Panjang Janin (cm)"
                    isAnimationActive={true}
                    connectNulls={true}
                />

                {/* ============================== */}
                {/* ❤️ Detak Jantung */}
                {/* ============================== */}
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="actualHeartRate"
                    stroke="#ef4444" // merah
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#ef4444' }}
                    name="Detak Jantung (bpm)"
                    isAnimationActive={true}
                    connectNulls={true}
                />
            </LineChart>
        </ResponsiveContainer>


            {/* Tabel Data Janin */}
            {fetalMeasurements.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Riwayat Data Janin
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Minggu
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Tanggal
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Berat Janin
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Panjang Janin
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Detak Jantung
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Posisi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {fetalMeasurements.map((m, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-900">
                                            Minggu {m.week}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {formatDate(m.date)}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-blue-600">
                                            {m.beratJanin} gram
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-green-600">
                                            {m.panjangJanin} cm
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-red-600">
                                            {m.detak_jantung} bpm
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-900">
                                            {m.posisi}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
