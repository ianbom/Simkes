interface FoodRecommendation {
    image: string;
    title: string;
    description: string;
}

const foods: FoodRecommendation[] = [
    {
        title: 'Sayuran Hijau',
        description:
            'Bayam, brokoli, dan kangkung kaya asam folat, zat besi, serta serat.',
        image: '/assets/images/sayur-food.png',
    },
    {
        title: 'Buah-buahan Segar',
        description:
            'Jeruk, alpukat, pisang, dan mangga mengandung vitamin C, serat, serta kalium.',
        image: '/assets/images/buah-food.png',
    },
    {
        title: 'Susu dan Olahannya',
        description: 'Susu, yoghurt, dan keju kaya kalsium serta protein.',
        image: '/assets/images/susu-food.png',
    },
    {
        title: 'Ikan Berlemak',
        description:
            'Salmon, sarden, atau tuna untuk perkembangan otak dan mata bayi.',
        image: '/assets/images/ikan-food.png',
    },
    {
        title: 'Sumber Karbohidrat',
        description:
            'Nasi merah, kentang, ubi, dan gandum utuh memberi energi stabil.',
        image: '/assets/images/karbo-food.png',
    },
];

const FoodRecomendationSection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 py-24">
            <div className="absolute -left-20 -top-20 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-sky-200/40 to-blue-200/40 blur-3xl"></div>
            <div
                className="absolute -bottom-32 -right-20 h-80 w-80 animate-pulse rounded-full bg-gradient-to-l from-sky-200/40 to-blue-200/40 blur-3xl"
                style={{ animationDelay: '2s' }}
            ></div>
            <div
                className="absolute left-1/3 top-1/2 h-64 w-64 animate-pulse rounded-full bg-gradient-to-r from-blue-100/30 to-sky-100/30 blur-2xl"
                style={{ animationDelay: '4s' }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-sky-50/20"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h1 className="mb-6 bg-gradient-to-r from-sky-700 via-blue-600 to-sky-600 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
                        Makanan Bergizi untuk Ibu Hamil
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
                        Temukan rekomendasi makanan bergizi terbaik yang
                        diformulasikan khusus untuk mendukung kesehatan ibu dan
                        perkembangan optimal si kecil
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {foods.map((food, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/95 hover:shadow-2xl hover:shadow-sky-500/20"
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                animation: 'fadeInUp 0.6s ease-out forwards',
                            }}
                        >
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-400/10 to-blue-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                            <div className="relative mx-auto mb-6 h-36 w-full overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105">
                                <img
                                    src={food.image}
                                    alt={food.title}
                                    className="h-full w-full object-cover filter transition-all duration-300 group-hover:brightness-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                <div className="absolute inset-0 rounded-2xl border-2 border-sky-200/30 transition-colors duration-300 group-hover:border-sky-300/50"></div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="mb-4 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-sky-700">
                                    {food.title}
                                </h3>

                                <p className="text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                                    {food.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FoodRecomendationSection;
