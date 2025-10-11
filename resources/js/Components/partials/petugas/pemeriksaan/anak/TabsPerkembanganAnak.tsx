import GrafikBalita from '@/Components/features/pasien/grafik-perkembangan/GrafikBalita';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { TabsContent } from '@/Components/ui/tabs';
import { Anak, PemeriksaanAnak } from '@/types/interface';
import { Brain, Ruler, TrendingUp, Weight } from 'lucide-react';
import { useState } from 'react';

interface Props {
    growth?: PemeriksaanAnak[];
    child: Anak;
}
export default function TabsPerkembanganAnak({ growth = [], child }: Props) {
    const [activeGraphTab, setActiveGraphTab] = useState<
        'weight' | 'height' | 'headCircumference'
    >('weight');

    if (!growth || growth.length === 0) {
        return (
            <TabsContent value="child-development" className="mt-6">
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Grafik Pertumbuhan
                        </CardTitle>
                        <CardDescription>
                            Visualisasi pertumbuhan anak berdasarkan standar WHO
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center py-12 text-center">
                        <TrendingUp className="mb-3 h-12 w-12 text-gray-400" />
                        <p className="text-lg font-medium text-gray-900">
                            Tidak ada data pertumbuhan
                        </p>
                        <p className="mt-1 text-gray-500">
                            Belum ada data pemeriksaan untuk menampilkan grafik
                            pertumbuhan
                        </p>
                    </CardContent>
                </Card>
            </TabsContent>
        );
    }

    const graphTypes = [
        {
            value: 'height',
            label: 'Tinggi Badan',
            shortLabel: 'TB',
            icon: Ruler,
            color: 'green',
        },
        {
            value: 'weight',
            label: 'Berat Badan',
            shortLabel: 'BB',
            icon: Weight,
            color: 'blue',
        },
        {
            value: 'headCircumference',
            label: 'Lingkar Kepala',
            shortLabel: 'LK',
            icon: Brain,
            color: 'purple',
        },
    ];

    return (
        <TabsContent value="child-development" className="mt-6">
            <Card className="bg-white">
                <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Grafik Pertumbuhan
                            </CardTitle>
                            <CardDescription>
                                Visualisasi pertumbuhan {child.nama} berdasarkan
                                standar WHO
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                            <h3 className="mb-2 flex items-center gap-2 font-medium text-blue-900">
                                <Brain className="h-4 w-4 text-blue-600" />
                                Tentang Grafik Pertumbuhan
                            </h3>
                            <p className="text-sm text-blue-700">
                                Grafik ini menampilkan perkembangan berat badan,
                                tinggi badan, dan lingkar kepala anak
                                dibandingkan dengan standar persentil WHO. Data
                                anak ditampilkan sebagai titik biru pada grafik.
                            </p>
                        </div>

                        <Card className="bg-white shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Pilih Jenis Grafik
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid w-full grid-cols-3 gap-2 rounded-lg bg-gray-100 p-1">
                                    {graphTypes.map((type) => {
                                        const Icon = type.icon;
                                        const isActive =
                                            activeGraphTab === type.value;

                                        return (
                                            <button
                                                key={type.value}
                                                onClick={() =>
                                                    setActiveGraphTab(
                                                        type.value as any,
                                                    )
                                                }
                                                className={`flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all ${
                                                    isActive
                                                        ? 'bg-white text-gray-900 shadow-sm'
                                                        : 'text-gray-600 hover:text-gray-900'
                                                } `}
                                            >
                                                <Icon className="h-4 w-4" />
                                                <span className="hidden sm:inline">
                                                    {type.label}
                                                </span>
                                                <span className="sm:hidden">
                                                    {type.shortLabel}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Graph Component */}
                        <GrafikBalita
                            growth={growth}
                            child={child}
                            activeTab={activeGraphTab}
                        />

                        {/* Statistics Summary */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Total Pemeriksaan
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
                                        Pemeriksaan Terakhir
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold text-green-600">
                                        {growth[growth.length - 1]
                                            ?.usia_saat_periksa_bulan || 0}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        bulan
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Rentang Usia
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold text-purple-600">
                                        {growth[0]?.usia_saat_periksa_bulan ||
                                            0}{' '}
                                        -{' '}
                                        {growth[growth.length - 1]
                                            ?.usia_saat_periksa_bulan || 0}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        bulan
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
