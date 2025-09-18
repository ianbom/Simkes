('use client');

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Medicine } from '@/types/medicine/interface';
import {
    Clock,
    Heart,
    RefreshCcw,
    Shield,
    SlidersHorizontal,
} from 'lucide-react';

const medicines: Medicine[] = [
    {
        id: 1,
        name: 'Asam Folat',
        description:
            'Vitamin B9 yang penting untuk perkembangan saraf janin dan mencegah cacat tabung saraf. Direkomendasikan sejak trimester pertama.',
        image: '/assets/images/dummy-obat.png',
        category: 'Vitamin',
        type: 'Tablet',
        dosage: '400-800 mcg per hari',
        safety: 'safe',
    },
    {
        id: 2,
        name: 'Zat Besi (Fe)',
        description:
            'Suplemen untuk mencegah anemia defisiensi besi pada ibu hamil dan mendukung pertumbuhan janin yang sehat.',
        image: '/assets/images/dummy-obat.png',
        category: 'Mineral',
        type: 'Tablet',
        dosage: '30-60 mg per hari',
        safety: 'safe',
    },
    {
        id: 3,
        name: 'Kalsium',
        description:
            'Mineral penting untuk pembentukan tulang dan gigi janin, serta menjaga kesehatan tulang ibu selama kehamilan.',
        image: '/assets/images/dummy-obat.png',
        category: 'Mineral',
        type: 'Tablet',
        dosage: '1000-1200 mg per hari',
        safety: 'safe',
    },
    {
        id: 4,
        name: 'Paracetamol',
        description:
            'Obat pereda nyeri dan penurun demam yang aman digunakan selama kehamilan dengan dosis yang tepat.',
        image: '/assets/images/dummy-obat.png',
        category: 'Analgesik',
        type: 'Tablet',
        dosage: '500 mg, 3-4x sehari',
        safety: 'safe',
    },
    {
        id: 5,
        name: 'Antasida',
        description:
            'Obat untuk mengatasi heartburn dan gangguan pencernaan yang sering terjadi pada ibu hamil.',
        image: '/assets/images/dummy-obat.png',
        category: 'Pencernaan',
        type: 'Tablet Kunyah',
        dosage: 'Sesuai kebutuhan',
        safety: 'safe',
    },
    {
        id: 6,
        name: 'Vitamin D',
        description:
            'Vitamin untuk penyerapan kalsium dan perkembangan tulang janin yang optimal.',
        image: '/assets/images/dummy-obat.png',
        category: 'Vitamin',
        type: 'Kapsul',
        dosage: '600-800 IU per hari',
        safety: 'safe',
    },
    {
        id: 7,
        name: 'Omega-3',
        description:
            'Suplemen asam lemak esensial untuk perkembangan otak dan mata janin.',
        image: '/assets/images/dummy-obat.png',
        category: 'Suplemen',
        type: 'Kapsul',
        dosage: '200-300 mg DHA per hari',
        safety: 'safe',
    },
    {
        id: 8,
        name: 'Domperidone',
        description:
            'Obat untuk mengatasi mual dan muntah pada morning sickness. Konsultasikan dengan dokter sebelum penggunaan.',
        image: '/assets/images/dummy-obat.png',
        category: 'Anti-mual',
        type: 'Tablet',
        dosage: '10 mg, 3x sehari',
        safety: 'consult',
    },
];

const getSafetyBadge = (safety: string) => {
    switch (safety) {
        case 'safe':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    <Shield className="h-3 w-3" />
                    Aman
                </span>
            );
        case 'caution':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                    <Clock className="h-3 w-3" />
                    Hati-hati
                </span>
            );
        case 'consult':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    <Heart className="h-3 w-3" />
                    Konsultasi
                </span>
            );
        default:
            return null;
    }
};

const MedicinePage = () => {
    return (
        <div>
            <div
                className="relative overflow-hidden py-8"
                style={{
                    backgroundImage: "url('assets/images/story-bg2.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Bank Obat
                        </h1>
                        <p className="text-gray-600">
                            Temukan obat aman untuk Bunda & si kecil, lengkap
                            dengan aturan pemakaian nya.
                        </p>
                    </div>
                    <Card className="mb-6 rounded-xl bg-white">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-4 text-lg">
                                    <div className="flex items-center">
                                        <SlidersHorizontal
                                            size={20}
                                            className="mr-2 text-sky-600"
                                        />
                                        Filter Obat
                                    </div>
                                </CardTitle>
                                <Button variant="outline" size="sm">
                                    <RefreshCcw className="mr-2 h-4 w-4" />
                                    Reset Filter
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 divide-y divide-gray-300 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                                <div className="py-4 sm:py-0 sm:pr-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Kategori Obat
                                    </label>
                                    <Select>
                                        <SelectTrigger className="w-full border-gray-400">
                                            <SelectValue placeholder="Semua Kategori" />
                                        </SelectTrigger>
                                        <SelectContent className="border border-gray-200 bg-white">
                                            <SelectItem value="all">
                                                Semua Kategori
                                            </SelectItem>
                                            <SelectItem value="vitamin">
                                                Vitamin
                                            </SelectItem>
                                            <SelectItem value="mineral">
                                                Mineral
                                            </SelectItem>
                                            <SelectItem value="analgesik">
                                                Analgesik
                                            </SelectItem>
                                            <SelectItem value="pencernaan">
                                                Pencernaan
                                            </SelectItem>
                                            <SelectItem value="suplemen">
                                                Suplemen
                                            </SelectItem>
                                            <SelectItem value="anti-mual">
                                                Anti-mual
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="py-4 sm:px-6 sm:py-0">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Jenis Obat
                                    </label>
                                    <Select>
                                        <SelectTrigger className="w-full border-gray-400">
                                            <SelectValue placeholder="Semua Kategori" />
                                        </SelectTrigger>
                                        <SelectContent className="border border-gray-200 bg-white">
                                            <SelectItem value="all">
                                                Semua Kategori
                                            </SelectItem>
                                            <SelectItem value="vitamin">
                                                Vitamin
                                            </SelectItem>
                                            <SelectItem value="mineral">
                                                Mineral
                                            </SelectItem>
                                            <SelectItem value="analgesik">
                                                Analgesik
                                            </SelectItem>
                                            <SelectItem value="pencernaan">
                                                Pencernaan
                                            </SelectItem>
                                            <SelectItem value="suplemen">
                                                Suplemen
                                            </SelectItem>
                                            <SelectItem value="anti-mual">
                                                Anti-mual
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="py-4 sm:py-0 sm:pl-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Pencarian Obat
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Cari berdasarkan nama obat..."
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {medicines.map((medicine) => (
                        <Card
                            key={medicine.id}
                            className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={medicine.image}
                                    alt={medicine.name}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute right-3 top-3">
                                    {getSafetyBadge(medicine.safety)}
                                </div>
                                <div className="absolute bottom-3 left-3">
                                    <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
                                        {medicine.category}
                                    </span>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <div className="mb-3 flex items-start justify-between">
                                    <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                        {medicine.name}
                                    </h3>
                                    <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
                                        {medicine.type}
                                    </span>
                                </div>

                                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                    {medicine.description}
                                </p>
                                <Button className="w-full bg-secondary font-semibold text-white transition-all duration-300 hover:from-sky-600 hover:to-blue-700">
                                    Lihat Detail
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Button
                        variant="outline"
                        size="lg"
                        className="px-8 py-3 transition-all duration-300 hover:border-sky-300 hover:bg-sky-50"
                    >
                        Muat Lebih Banyak
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MedicinePage;
