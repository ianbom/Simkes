('use client');

import { Card, CardContent } from '@/Components/ui/card';
import { Faskes } from '@/types/faskes/interface';
import { MapPin } from 'lucide-react';
interface Props {
    faskesDetail: Faskes;
}

const DetailFaskesPage = ({ faskesDetail }: Props) => {
    return (
        <div>
            <div className="relative overflow-hidden bg-[url('/assets/images/story-bg2.png')] bg-cover bg-center bg-no-repeat py-8">
                <div className="relative z-10 mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Detail Obat
                        </h1>
                        <p className="text-gray-600">
                            Lihat informasi detail obat dan cara penggunaannya.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-5">
                            {/* Gambar / thumbnail */}
                            <div className="lg:col-span-2">
                                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-100 to-blue-50 p-6 shadow-md">
                                    <img
                                        src={faskesDetail.profile_pic_url || ''}
                                        alt={faskesDetail.nama}
                                        className="mx-auto h-40 w-full object-contain transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            </div>

                            <div className="space-y-5 lg:col-span-3">
                                <div>
                                    <h2 className="mb-2 text-3xl font-bold text-gray-900">
                                        {faskesDetail.nama}
                                    </h2>
                                    <span
                                        className={`inline-block rounded-full px-3 py-1 text-sm font-medium text-white ${
                                            faskesDetail.tipe_faskes ===
                                            'Puskesmas'
                                                ? 'bg-green-500'
                                                : faskesDetail.tipe_faskes ===
                                                    'Klinik'
                                                  ? 'bg-blue-500'
                                                  : faskesDetail.tipe_faskes ===
                                                      'RSIA'
                                                    ? 'bg-pink-500'
                                                    : faskesDetail.tipe_faskes ===
                                                        'RSUD'
                                                      ? 'bg-purple-500'
                                                      : 'bg-orange-500'
                                        } `}
                                    >
                                        {faskesDetail.tipe_faskes}
                                    </span>
                                </div>

                                <div className="space-y-3 text-gray-700">
                                    <p className="flex items-start text-base leading-relaxed">
                                        <MapPin className="mr-2 mt-1 h-4 w-4 text-secondary" />
                                        <span>{faskesDetail.alamat}</span>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Koordinat: {faskesDetail.latitude},{' '}
                                        {faskesDetail.longitude}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <Card className="group mb-8 overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <CardContent>
                        <div className="mb-3 flex items-start justify-between">
                            <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                Deskripsi
                            </h3>
                        </div>
                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                            {faskesDetail.deskripsi}
                        </p>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    <Card className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardContent>
                            <div className="mb-3 flex items-start justify-between">
                                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                    Provinsi
                                </h3>
                            </div>
                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                {faskesDetail.provinsi.nama}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardContent>
                            <div className="mb-3 flex items-start justify-between">
                                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                    Kabupaten / Kota
                                </h3>
                            </div>
                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                {faskesDetail.kota.nama}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardContent>
                            <div className="mb-3 flex items-start justify-between">
                                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                    Kecamatan
                                </h3>
                            </div>
                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                {faskesDetail.kecamatan.nama}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DetailFaskesPage;
