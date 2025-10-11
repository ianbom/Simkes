import GrafikIbuHamil from '@/Components/features/pasien/grafik-perkembangan/GrafikIbuHamil';
import GrafikJanin from '@/Components/features/pasien/grafik-perkembangan/GrafikJanin';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { TabsContent } from '@/Components/ui/tabs';
import { Kehamilan, PemeriksaanAnc } from '@/types/interface';
import { Activity, Baby, Heart, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Props {
    growth?: PemeriksaanAnc[];
    pregnant: Kehamilan;
}

export default function TabsPerkembanganKehamilan({
    growth = [],
    pregnant,
}: Props) {
    const [activeTrimester, setActiveTrimester] = useState<number>(1);
    const [activeGraphType, setActiveGraphType] = useState<'mother' | 'fetus'>(
        'mother',
    );

    const calculateCurrentWeek = () => {
        const hphtDate = new Date(pregnant.hpht);
        const today = new Date();
        const diffTime = today.getTime() - hphtDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.floor(diffDays / 7);
    };

    const currentWeek = calculateCurrentWeek();

    if (!growth || growth.length === 0) {
        return (
            <TabsContent value="pregnancy-development" className="mt-6">
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Grafik Perkembangan Kehamilan
                        </CardTitle>
                        <CardDescription>
                            Visualisasi perkembangan ibu hamil dan janin
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center py-12 text-center">
                        <TrendingUp className="mb-3 h-12 w-12 text-gray-400" />
                        <p className="text-lg font-medium text-gray-900">
                            Tidak ada data perkembangan
                        </p>
                        <p className="mt-1 text-gray-500">
                            Belum ada data pemeriksaan ANC untuk menampilkan
                            grafik
                        </p>
                    </CardContent>
                </Card>
            </TabsContent>
        );
    }

    const graphTypes = [
        {
            value: 'mother',
            label: 'Ibu Hamil',
            icon: Activity,
            description: 'Berat badan, tinggi fundus, tekanan darah',
        },
        {
            value: 'fetus',
            label: 'Janin',
            icon: Baby,
            description: 'Berat, panjang, detak jantung janin',
        },
    ];

    const trimesters = [
        { value: 1, label: 'Trimester 1', range: 'Minggu 1-13' },
        { value: 2, label: 'Trimester 2', range: 'Minggu 14-27' },
        { value: 3, label: 'Trimester 3', range: 'Minggu 28-40' },
    ];

    return (
        <TabsContent value="pregnancy-development" className="mt-6">
            <Card className="bg-white">
                <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Grafik Perkembangan Kehamilan
                            </CardTitle>
                            <CardDescription>
                                Visualisasi perkembangan{' '}
                                {pregnant.user?.name || 'Ibu Hamil'}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {/* Info Box - Status Kehamilan */}
                        <div className="rounded-lg border border-pink-200 bg-pink-50 p-4">
                            <div className="flex items-start gap-3">
                                <Heart className="mt-0.5 h-5 w-5 text-pink-600" />
                                <div>
                                    <h3 className="mb-1 font-medium text-pink-900">
                                        Status Kehamilan Saat Ini
                                    </h3>
                                    <div className="space-y-1 text-sm text-pink-700">
                                        <p>
                                            📅 HPHT:{' '}
                                            {new Date(
                                                pregnant.hpht,
                                            ).toLocaleDateString('id-ID')}
                                        </p>
                                        <p>
                                            🎯 HPL:{' '}
                                            {new Date(
                                                pregnant.hpl,
                                            ).toLocaleDateString('id-ID')}
                                        </p>
                                        {/* <p>
                                            ⏰ Usia Kehamilan:{' '}
                                            <span className="font-semibold">
                                                {currentWeek} Minggu
                                            </span>
                                        </p> */}
                                        <p>
                                            📏 Tinggi Badan Awal:{' '}
                                            {pregnant.tinggi_badan_awal} cm
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Graph Type Selector */}
                        <Card className="bg-white shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Pilih Jenis Grafik
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid w-full grid-cols-2 gap-3">
                                    {graphTypes.map((type) => {
                                        const Icon = type.icon;
                                        const isActive =
                                            activeGraphType === type.value;

                                        return (
                                            <button
                                                key={type.value}
                                                onClick={() =>
                                                    setActiveGraphType(
                                                        type.value as any,
                                                    )
                                                }
                                                className={`flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all ${
                                                    isActive
                                                        ? 'border-blue-500 bg-blue-50 shadow-md'
                                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                } `}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Icon
                                                        className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}
                                                    />
                                                    <span
                                                        className={`font-semibold ${isActive ? 'text-blue-900' : 'text-gray-900'}`}
                                                    >
                                                        {type.label}
                                                    </span>
                                                </div>
                                                <p
                                                    className={`text-xs ${isActive ? 'text-blue-700' : 'text-gray-600'}`}
                                                >
                                                    {type.description}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Trimester Selector */}
                        <Card className="bg-white shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Pilih Trimester
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid w-full grid-cols-3 gap-2 rounded-lg bg-gray-100 p-1">
                                    {trimesters.map((trimester) => {
                                        const isActive =
                                            activeTrimester === trimester.value;

                                        return (
                                            <button
                                                key={trimester.value}
                                                onClick={() =>
                                                    setActiveTrimester(
                                                        trimester.value,
                                                    )
                                                }
                                                className={`flex flex-col items-center justify-center rounded-md px-3 py-3 text-sm font-medium transition-all ${
                                                    isActive
                                                        ? 'bg-white text-gray-900 shadow-sm'
                                                        : 'text-gray-600 hover:text-gray-900'
                                                } `}
                                            >
                                                <span className="font-semibold">
                                                    {trimester.label}
                                                </span>
                                                <span className="mt-0.5 text-xs text-gray-500">
                                                    {trimester.range}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Graph Components */}
                        {activeGraphType === 'mother' && (
                            <GrafikIbuHamil
                                growth={growth}
                                pregnant={pregnant}
                                activeTrimester={activeTrimester}
                            />
                        )}

                        {activeGraphType === 'fetus' && (
                            <GrafikJanin
                                growth={growth}
                                pregnant={pregnant}
                                activeTrimester={activeTrimester}
                            />
                        )}

                        {/* Statistics Summary */}
                        {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Total Pemeriksaan ANC
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {growth.length}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        kunjungan tercatat
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Usia Kehamilan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold text-pink-600">
                                        {currentWeek}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        minggu
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Trimester Saat Ini
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold text-purple-600">
                                        {currentWeek <= 13
                                            ? '1'
                                            : currentWeek <= 27
                                              ? '2'
                                              : '3'}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {currentWeek <= 13
                                            ? 'Trimester 1'
                                            : currentWeek <= 27
                                              ? 'Trimester 2'
                                              : 'Trimester 3'}
                                    </p>
                                </CardContent>
                            </Card>
                        </div> */}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
