('use client');
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Faskes } from '@/types/faskes/interface';
import { Link } from '@inertiajs/react';
import { MapPin, RefreshCcw, SlidersHorizontal } from 'lucide-react';

interface Props {
    faskes: Faskes[];
}

const FaskesPage = ({ faskes }: Props) => {
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
                            Daftar Faskes
                        </h1>
                        <p className="text-gray-600">
                            <span className="font-semibold text-sky-600">
                                SIMKESIA{' '}
                            </span>{' '}
                            bekerja sama dengan faskes terpercaya supaya Bunda
                            dan si Kecil selalu mendapat layanan yang aman dan
                            ramah
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
                                        Filter Faskes
                                    </div>
                                </CardTitle>
                                <Button variant="outline" size="sm">
                                    <RefreshCcw className="mr-2 h-4 w-4" />
                                    Reset Filter
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 divide-y divide-gray-300 sm:grid-cols-5 sm:divide-x sm:divide-y-0">
                                <div className="py-4 sm:py-0 sm:pr-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Jenis Faskes
                                    </label>
                                    <Select>
                                        <SelectTrigger className="w-full border-gray-400">
                                            <SelectValue placeholder="Semua Jenis" />
                                        </SelectTrigger>
                                        <SelectContent className="border border-gray-200 bg-white">
                                            <SelectItem value="all">
                                                Semua Jenis
                                            </SelectItem>
                                            <SelectItem value="Puskesmas">
                                                Puskesmas
                                            </SelectItem>
                                            <SelectItem value="Klinik">
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
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Provinsi
                                    </label>
                                    <Select>
                                        <SelectTrigger className="w-full border-gray-400">
                                            <SelectValue placeholder="Semua Provinsi" />
                                        </SelectTrigger>
                                        <SelectContent className="border border-gray-200 bg-white">
                                            <SelectItem value="all">
                                                Semua Provinsi
                                            </SelectItem>
                                            <SelectItem value="jawa-barat">
                                                Jawa Barat
                                            </SelectItem>
                                            <SelectItem value="jawa-timur">
                                                Jawa Timur
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="py-4 sm:px-6 sm:py-0">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Kabupaten / Kota
                                    </label>
                                    <Select>
                                        <SelectTrigger className="w-full border-gray-400">
                                            <SelectValue placeholder="Semua Kota" />
                                        </SelectTrigger>
                                        <SelectContent className="border border-gray-200 bg-white">
                                            <SelectItem value="all">
                                                Semua Kota
                                            </SelectItem>
                                            <SelectItem value="jawa-barat">
                                                Jawa Barat
                                            </SelectItem>
                                            <SelectItem value="jawa-timur">
                                                Jawa Timur
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="py-4 sm:px-6 sm:py-0">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Kecamatan
                                    </label>
                                    <Select>
                                        <SelectTrigger className="w-full border-gray-400">
                                            <SelectValue placeholder="Semua Kecamatan" />
                                        </SelectTrigger>
                                        <SelectContent className="border border-gray-200 bg-white">
                                            <SelectItem value="all">
                                                Semua Kecamatan
                                            </SelectItem>
                                            <SelectItem value="jawa-barat">
                                                Jawa Barat
                                            </SelectItem>
                                            <SelectItem value="jawa-timur">
                                                Jawa Timur
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="py-4 sm:py-0 sm:pl-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Pencarian Faskes
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Cari berdasarkan nama faskes..."
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
                    {faskes.map((faskes) => (
                        <Card
                            key={faskes.id}
                            className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={
                                        faskes.profile_pic_url ||
                                        '/images/no-image.png'
                                    }
                                    alt={faskes.nama}
                                    className="line-clamp-1 h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-6">
                                <div className="mb-3 flex items-start justify-between">
                                    <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                        {faskes.nama}
                                    </h3>
                                    <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
                                        {faskes.tipe_faskes}
                                    </span>
                                </div>

                                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
                                    {faskes.deskripsi}
                                </p>
                                <p className="mb-4 flex items-center text-sm text-gray-600">
                                    <MapPin className="mr-2 h-4 w-4 text-secondary" />
                                    <span className="truncate">
                                        {faskes.provinsi?.nama} /{' '}
                                        {faskes.kota?.nama} /{' '}
                                        {faskes.kecamatan?.nama}
                                    </span>
                                </p>

                                <Link
                                    href={`/pasien/faskes/${faskes.id}`}
                                    className="block w-full rounded-md bg-secondary py-2 text-center font-semibold text-white hover:bg-secondary/90"
                                >
                                    Lihat Detail
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaskesPage;
