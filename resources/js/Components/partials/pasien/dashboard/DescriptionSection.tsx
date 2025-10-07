import { Link } from '@inertiajs/react';

const features = [
    {
        title: 'Faskes Terdekat',
        description:
            'Bunda nggak perlu bingung lagi, cukup klik dan temukan rumah sakit, puskesmas, atau klinik terdekat.',
        image: '/assets/images/feature-faskes.png',
        link: '/mulai',
    },
    {
        title: 'Bank Obat',
        description:
            'Info obat aman untuk Bunda & si kecil, lengkap dengan aturan pemakaian nya.',
        image: '/assets/images/feature-obat.png',
        link: '/mulai',
    },
    {
        title: 'Panduan Sehat',
        description:
            'Tips kehamilan & perawatan bayi disajikan ringan, supaya Bunda tetap tenang.',
        image: '/assets/images/feature-panduan.png',
        link: '/mulai',
    },
    {
        title: 'Konsultasi Online',
        description:
            'Butuh saran dokter atau bidan? Konsul langsung tanpa harus antre dan praktis.',
        image: '/assets/images/feature-consul.png',
        link: '/mulai',
    },
    {
        title: 'Deteksi Stunting',
        description:
            'Pantau tumbuh kembang si kecil lewat grafik WHO, biar Bunda lebih cepat tahu.',
        image: '/assets/images/feature-stunting.png',
        link: '/mulai',
    },
    {
        title: 'Profil Ibu & Anak',
        description:
            'Catatan kandungan, imunisasi, dan perkembangan bayi tersimpan rapi.',
        image: '/assets/images/feature-ibu.png',
        link: '/mulai',
    },
];

const DescriptionSection = () => {
    return (
        <section className="relative py-12 mb-8 overflow-hidden text-white bg-background">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute w-32 h-32 rounded-full left-10 top-10 animate-pulse bg-white/10 blur-xl"></div>
                <div
                    className="absolute w-48 h-48 rounded-full bottom-20 left-1/4 animate-bounce bg-sky-300/10 blur-2xl"
                    style={{ animationDuration: '3s' }}
                ></div>
                <div
                    className="absolute w-40 h-40 rounded-full right-20 top-1/3 animate-pulse bg-white/5 blur-xl"
                    style={{ animationDelay: '1s' }}
                ></div>
            </div>

            <div className="relative px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* Image section */}
                    <div className="relative hidden lg:block">
                        <div
                            className="relative z-10 animate-fade-in-scale"
                            style={{ animationDelay: '0.9s' }}
                        >
                            <div className="relative p-6 transition-all duration-500 group rounded-2xl hover:scale-105">
                                <img
                                    src="/assets/images/descsection-img.png"
                                    alt="Lingkungan Indonesia"
                                    className="object-cover w-full transition-transform duration-500 rounded-xl group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center lg:text-left">
                        <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
                            Andalan Bunda di{' '}
                            <span className="text-transparent bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text">
                                SIMKESIA
                            </span>
                        </h1>
                        <p className="mb-8 text-lg leading-relaxed text-gray-600">
                            Temani setiap langkah Bunda, dari kehamilan hingga
                            tumbuh kembang si kecil.
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="relative p-5 overflow-hidden transition-all duration-300 group rounded-2xl hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-blue-500/20"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                    }}
                                >
                                    <div className="relative flex items-center gap-4">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-16 h-16 p-2 overflow-hidden bg-white rounded-full shadow-md">
                                                <img
                                                    src={feature.image}
                                                    alt={feature.title}
                                                    width={64}
                                                    height={64}
                                                    className="object-cover w-full h-full transition-transform duration-300 rounded-full group-hover:scale-110"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 text-left">
                                            <h3 className="text-base font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
                                                {feature.title}
                                            </h3>
                                            <p className="mt-1 text-sm leading-relaxed text-gray-600">
                                                {feature.description}
                                            </p>
                                            <Link
                                                href={feature.link}
                                                className="inline-flex items-center mt-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:gap-2 hover:text-blue-700 group-hover:underline"
                                            >
                                                Mulai Sekarang
                                                <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                                                    →
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DescriptionSection;
