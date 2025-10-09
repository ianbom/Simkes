('use client');
import FaskesMap from '@/Components/partials/pasien/faskes/FaskesMap';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Faskes } from '@/types/faskes/interface';
import { RefreshCcw, SlidersHorizontal } from 'lucide-react';

interface Props {
    faskes: Faskes[];
}

const MapFaskesPage = ({ faskes }: Props) => {
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
                            Peta Faskes
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
                                        Filter Peta Faskes
                                    </div>
                                </CardTitle>
                                <Button variant="outline" size="sm">
                                    <RefreshCcw className="mr-2 h-4 w-4" />
                                    Reset Filter
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 divide-y divide-gray-300 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
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
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {' '}
                <FaskesMap faskes={faskes} />
            </div>
        </div>
    );
};

export default MapFaskesPage;
