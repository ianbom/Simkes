('use client');

import { Card, CardContent } from '@/Components/ui/card';

const MedicineDetailPage = () => {
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
                                        src="/assets/images/dummy-obat.png"
                                        alt="Obat Dummy"
                                        className="mx-auto h-36 w-full object-contain"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6 lg:col-span-3">
                                <div>
                                    <h2 className="mb-2 text-3xl font-bold text-gray-900">
                                        Neurobion Forte 10 Tablet{' '}
                                    </h2>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-base leading-relaxed text-gray-600">
                                        Neurobion Forte 10 Tablet membantu
                                        menjaga kesehatan saraf dan mengurangi
                                        gejala kesemutan atau pegal.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="group mb-8 overflow-hidden">
                    <p className="text-justify text-sm leading-relaxed text-gray-600">
                        NEUROBION FORTE merupakan sediaan vitamin neurotropik
                        yang mengandung kombinasi Vitamin B1 (Thiamine), Vitamin
                        B6 (Pyridoxine), dan Vitamin B12 (Cyanocobalamin) dalam
                        dosis terapeutik. Produk ini diformulasikan secara
                        khusus untuk mendukung fungsi sistem saraf yang sehat
                        dan digunakan untuk pengobatan kondisi klinis yang
                        disebabkan oleh defisiensi vitamin-vitamin tersebut.
                        Kombinasi Vitamin B1, B6, dan B12 dalam Neurobion Forte
                        bekerja secara sinergis, artinya mereka saling mendukung
                        untuk memberikan manfaat yang komprehensif bagi sistem
                        saraf. Vitamin B1 bekerja dengan memetabolisme
                        karbohidrat, Vitamin B6 membantu memetabolisme protein
                        dan asam amino, Vitamin B12 membantu memelihara keutuhan
                        jaringan saraf.
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
                            Obat ini digunakan untuk defisiensi Vitamin B1, B6,
                            dan B12 pada keadaan kekurangan asupan, gangguan
                            penyerapan, meningkatnya kehilangan di ginjal maupun
                            meningkatnya kebutuhan seperti pada penderita
                            diabetes dan usia lanjut.
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
                                Vitamin B1 100 mg, Vitamin B6 100, Vitamin B12
                                5000 mcg
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
                                Dewasa: 1 tablet, 1 kali per hari atau sesuai
                                dengan anjuran dokter.
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
                                Berikan pada saat makan atau sesudah makan.
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
                                Wanita hamil dan menyusui, gangguan ginjal dan
                                hati.
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
                                Diabetes melitus, Ulkus peptikum, Infark
                                miokard, Aritmia.
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
                                Ruam kulit, diare, penglihatan kabur, gatal,
                                sakit pada dada.
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
                                Obat Bebas (Hijau)
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
                                Dus, 5 Blister @ 10 tablet Salut Gula
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
                                Merck Indonesia
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
                                ΒΡΟΜ: DBL9615806416A1
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default MedicineDetailPage;
