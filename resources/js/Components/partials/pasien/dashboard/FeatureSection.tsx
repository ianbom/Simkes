interface FeatureItem {
    image: string;

    title: string;
    description: string;
}

const features: FeatureItem[] = [
    {
        image: '/assets/images/kehamilan-icon.png',
        title: 'Panduan Kehamilan',
        description: 'Info dari trimester awal hingga persiapan melahirkan.',
    },
    {
        image: '/assets/images/bayi-icon.png',
        title: 'Tips Perawatan Bayi',
        description: 'Cara mudah merawat bayi sejak lahir hingga balita.',
    },
    {
        image: '/assets/images/faskes-icon.png',
        title: 'Akses Faskes',
        description: 'Cari rumah sakit & klinik terdekat lebih cepat.',
    },
    {
        image: '/assets/images/consul-icon.png',
        title: 'Konsultasi Online',
        description: 'Chat dokter & bidan kapan saja, di mana saja.',
    },
    {
        image: '/assets/images/tumbuh-icon.png',
        title: 'Tumbuh Kembang',
        description: 'Pantau pertumbuhan bayi sesuai standar WHO.',
    },
];

const FeatureSection = () => {
    return (
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-white via-sky-50 to-sky-100">
            {/* Background effect */}
            <div className="absolute rounded-full -bottom-40 right-1/4 h-96 w-96 bg-sky-200/30 blur-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-indigo-50/30"></div>

            <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 text-center transition bg-white shadow-md rounded-2xl hover:shadow-lg"
                        >
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="object-contain w-16 h-16 mb-4"
                            />

                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
