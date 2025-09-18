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
import { RefreshCcw, SlidersHorizontal } from 'lucide-react';

const doctors = [
    {
        id: 1,
        name: 'Dr. Sam Wakfolk',
        type: 'Dokter Anak',
        rating: 4.8,
        faskes: 'Klinik Abdul Kohar Medical',
        image: '/assets/images/profile-13.jpeg',
        price: 'Rp. 45.000',
    },
    {
        id: 2,
        name: 'Dr. Ben Affleck',
        type: 'Dokter Anak',
        rating: 4.7,
        faskes: 'RS Sehat Sentosa',
        image: '/assets/images/profile-30.png',
        price: 'Rp. 50.000',
    },
    {
        id: 3,
        name: 'Dr. Anggela Pamelsya',
        type: 'Dokter Kandungan (Obgyn)',
        rating: 4.9,
        faskes: 'RS Ibu & Anak Bahagia',
        image: '/assets/images/profile-33.jpeg',
        price: 'Rp. 65.000',
    },
    {
        id: 4,
        name: 'Dr. John Carter',
        type: 'Dokter Umum',
        rating: 4.6,
        faskes: 'Klinik Harapan Sehat',
        image: '/assets/images/profile-34.jpeg',
        price: 'Rp. 40.000',
    },
    {
        id: 5,
        name: 'Dr. Maya Estiani',
        type: 'Dokter Gigi',
        rating: 4.8,
        faskes: 'Klinik Senyum Ceria',
        image: '/assets/images/profile-25.jpeg',
        price: 'Rp. 55.000',
    },
    {
        id: 6,
        name: 'Dr. Kevin Hartono',
        type: 'Dokter Kulit',
        rating: 4.7,
        faskes: 'RS Derma Skin Care',
        image: '/assets/images/profile-5.jpeg',
        price: 'Rp. 60.000',
    },
];

const ConstultationPage = () => {
    return (
        <div>
            <div
                className="relative py-8 overflow-hidden"
                style={{
                    backgroundImage: "url('assets/images/story-bg2.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Daftar Dokter{' '}
                        </h1>
                        <p className="text-gray-600">
                            <span className="font-semibold text-sky-600">
                                SIMKESIA{' '}
                            </span>
                            membuat Bunda bisa tanya langsung seputar kehamilan
                            dan tumbuh kembang si Kecil lewat chat atau video
                            call dengan tenaga kesehatan terpercaya
                        </p>
                    </div>
                    <Card className="mb-6 bg-white rounded-xl">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-4 text-lg">
                                    <div className="flex items-center">
                                        <SlidersHorizontal
                                            size={20}
                                            className="mr-2 text-sky-600"
                                        />
                                        Filter Dokter Konsultasi
                                    </div>
                                </CardTitle>
                                <Button variant="outline" size="sm">
                                    <RefreshCcw className="w-4 h-4 mr-2" />
                                    Reset Filter
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 divide-y divide-gray-300 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
                                <div className="py-4 sm:py-0 sm:pr-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Jenis Faskes
                                    </label>
                                    <Select>
                                        <SelectTrigger className="w-full border-gray-400">
                                            <SelectValue placeholder="Semua Jenis" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border border-gray-200">
                                            <SelectItem value="all">
                                                Semua Jenis
                                            </SelectItem>
                                            <SelectItem value="Puskesmas">
                                                Puskesmas
                                            </SelectItem>
                                            <SelectItem value="klinik">
                                                Klinik
                                            </SelectItem>
                                            <SelectItem value="RSIA">
                                                RSIA
                                            </SelectItem>
                                            <SelectItem value="RSUD">
                                                RSUD
                                            </SelectItem>
                                            <SelectItem value="Posyandu">
                                                Posyandu
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="py-4 sm:px-6 sm:py-0">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Faskes{' '}
                                    </label>
                                    <Select>
                                        <SelectTrigger className="w-full border-gray-400">
                                            <SelectValue placeholder="Semua Faskes" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border border-gray-200">
                                            <SelectItem value="all">
                                                Semua Faskes
                                            </SelectItem>
                                            <SelectItem value="vitamin">
                                                Faskes A
                                            </SelectItem>
                                            <SelectItem value="mineral">
                                                Faskes B
                                            </SelectItem>
                                            <SelectItem value="analgesik">
                                                Faskes C
                                            </SelectItem>
                                            <SelectItem value="pencernaan">
                                                Faskes D
                                            </SelectItem>
                                            <SelectItem value="suplemen">
                                                Faskes E
                                            </SelectItem>
                                            <SelectItem value="anti-mual">
                                                Faskes F
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="py-4 sm:px-6 sm:py-0">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Kategori Tenaga Kesehatan{' '}
                                    </label>
                                    <Select>
                                        <SelectTrigger className="w-full border-gray-400">
                                            <SelectValue placeholder="Semua Kategori" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border border-gray-200">
                                            <SelectItem value="all">
                                                Semua Kategori
                                            </SelectItem>
                                            <SelectItem value="vitamin">
                                                Dokter Umum
                                            </SelectItem>
                                            <SelectItem value="mineral">
                                                Dokter Spesialis Mata
                                            </SelectItem>
                                            <SelectItem value="analgesik">
                                                Dokter Spesialis Gigi
                                            </SelectItem>
                                            <SelectItem value="pencernaan">
                                                Dokter Kandungan
                                            </SelectItem>
                                            <SelectItem value="suplemen">
                                                Dokter Spesialis Anak
                                            </SelectItem>
                                            <SelectItem value="anti-mual">
                                                Dokter Spesialis Bedah
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="py-4 sm:py-0 sm:pl-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Pencarian Dokter
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Cari berdasarkan nama dokter..."
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="relative px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {doctors.map((doctor) => (
                        <Card
                            key={doctor.id}
                            className="p-4 transition-all duration-300 bg-white border border-gray-200 shadow-md rounded-xl hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-16 h-16 overflow-hidden border rounded-full">
                                    <img
                                        src={doctor.image}
                                        alt={doctor.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">
                                        {doctor.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {doctor.type}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <span className="flex items-center gap-1 px-2 rounded-full bg-sky-50 text-sky-600">
                                    ⭐ {doctor.rating}
                                </span>
                                <span className="flex items-center gap-1">
                                    🏥 {doctor.faskes}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <p className="font-semibold text-gray-800">
                                    {doctor.price.toLocaleString()}{' '}
                                    <span className="text-sm text-gray-500">
                                        / Jam
                                    </span>
                                </p>
                                <Button className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-sky-600 hover:bg-sky-700">
                                    Atur Konsultasi
                                </Button>
                            </div>
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

export default ConstultationPage;
