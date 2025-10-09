('use client');

import { Card, CardContent } from '@/Components/ui/card';
import { medicinesData } from '@/data/medicine';
import { usePage } from '@inertiajs/react';

const MedicineDetailPage = () => {
    const { props } = usePage();
    const medicineId = Number(props.id);
    const medicine = medicinesData.find((m) => m.id === medicineId);

    if (!medicine) {
        return <div>Obat tidak ditemukan</div>;
    }
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
                            <div className="lg:col-span-2">
                                <div className="relative rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 p-8 shadow-md">
                                    <img
                                        src={medicine.image}
                                        alt={medicine.name}
                                        className="mx-auto h-36 w-full object-contain"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6 lg:col-span-3">
                                <div>
                                    <h2 className="mb-2 text-3xl font-bold text-gray-900">
                                        {medicine.name}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="group mb-8 overflow-hidden">
                    <p className="text-justify text-sm leading-relaxed text-gray-600">
                        {medicine.description}
                    </p>
                </div>
                <Card className="group mb-8 overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <CardContent>
                        <div className="mb-3 flex items-start justify-between">
                            <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                Indikasi Umum
                            </h3>
                        </div>
                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                            {medicine.indication}
                        </p>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
                    <Card className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardContent>
                            <div className="mb-3 flex items-start justify-between">
                                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                    Komposisi
                                </h3>
                            </div>
                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                {medicine.composition}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardContent>
                            <div className="mb-3 flex items-start justify-between">
                                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                    Dosis{' '}
                                </h3>
                            </div>
                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                {medicine.dosage}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardContent>
                            <div className="mb-3 flex items-start justify-between">
                                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                    Aturan Pakai
                                </h3>
                            </div>
                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                {medicine.usage}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardContent>
                            <div className="mb-3 flex items-start justify-between">
                                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                    Perhatian
                                </h3>
                            </div>
                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                {medicine.warnings}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardContent>
                            <div className="mb-3 flex items-start justify-between">
                                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                    Kontra Indikasi{' '}
                                </h3>
                            </div>
                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                {medicine.contraindication}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardContent>
                            <div className="mb-3 flex items-start justify-between">
                                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                    Efek Samping
                                </h3>
                            </div>
                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                {medicine.sideEffects}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardContent>
                            <div className="mb-3 flex items-start justify-between">
                                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                    Golongan Produk
                                </h3>
                            </div>
                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                {medicine.productGroup}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardContent>
                            <div className="mb-3 flex items-start justify-between">
                                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                    Kemasan{' '}
                                </h3>
                            </div>
                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                {medicine.packaging}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="group overflow-hidden border border-sky-400 bg-sky-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardContent>
                            <div className="mb-3 flex items-start justify-between">
                                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                    Manufaktur
                                </h3>
                            </div>
                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                {medicine.manufacturer}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="duration-400 group overflow-hidden border border-sky-400 bg-sky-100 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                        <CardContent>
                            <div className="mb-3 flex items-start justify-between">
                                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                    No. Registrasi
                                </h3>
                            </div>
                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                ΒΡΟΜ: {medicine.bpomNumber}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default MedicineDetailPage;
