const reviews = [
    {
        name: 'Siti, Ibu Balita',
        text: 'SIMKESIA membantu saya memantau kesehatan bayi dengan grafik tumbuh kembang yang mudah dipahami.',
        rating: 5,
        image: 'assets/images/profile-25.jpeg',
        bgStyle: 'white',
    },
    {
        name: 'Ayu, Ibu Hamil 7 Bulan',
        text: 'Konsul online dengan dokter kandungan lewat SIMKESIA sangat membantu, tidak perlu antre di rumah sakit.',
        rating: 5,
        image: 'assets/images/profile-15.jpeg',
        bgStyle: 'white',
    },
    {
        name: 'Dewi, Ibu Baru',
        text: 'Aplikasi ini lengkap sekali, dari panduan, bank obat, sampai info faskes terdekat. Sangat praktis!',
        rating: 4,
        image: 'assets/images/profile-22.jpeg',
        bgStyle: 'white',
    },
];

const StoryFeedSection = () => {
    return (
        <section
            className="relative overflow-hidden py-20"
            style={{
                backgroundImage: "url('assets/images/story-bg2.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-sky-200/30 blur-3xl"></div>
            <div className="absolute left-40 top-20 h-[300px] w-[300px] rounded-full bg-sky-100/40 blur-2xl"></div>
            <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-pink-200/20 blur-3xl"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-20 text-center">
                    <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">
                        Cerita Bunda Bersama{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                            SIMKESIA
                        </span>
                    </h2>
                    <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-sky-400 to-blue-500"></div>
                </div>
                {/* <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review, i) => (
                        <div
                            key={i}
                            className="relative transition-all duration-300 transform group hover:-translate-y-2"
                        >
                            <div
                                className={`relative flex flex-col rounded-3xl p-8 shadow-xl transition-all duration-300 ${
                                    review.bgStyle === 'white'
                                        ? 'bg-white/95 backdrop-blur-sm hover:bg-white'
                                        : 'border border-white/30 bg-white/20 text-gray-800 backdrop-blur-md'
                                } hover:shadow-2xl hover:shadow-sky-500/20`}
                            >
                                <div className="absolute flex items-center justify-center w-20 h-20 overflow-hidden transition-transform duration-300 transform -translate-x-1/2 border-4 border-white rounded-full shadow-lg -top-10 left-1/2 group-hover:scale-110">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        width={80}
                                        height={80}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="mt-8">
                                    <div className="flex justify-center mb-6">
                                        {Array.from({ length: 5 }).map(
                                            (_, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`text-2xl transition-all duration-200 hover:scale-110 ${
                                                        idx < review.rating
                                                            ? 'text-yellow-400 drop-shadow-sm'
                                                            : review.bgStyle ===
                                                                'transparent'
                                                              ? 'text-white/40'
                                                              : 'text-gray-300'
                                                    } `}
                                                    style={{
                                                        animationDelay: `${idx * 0.1}s`,
                                                    }}
                                                >
                                                    ★
                                                </span>
                                            ),
                                        )}
                                    </div>
                                    <div className="flex justify-center mb-4">
                                        <div
                                            className={`rounded-full p-2 ${
                                                review.bgStyle === 'transparent'
                                                    ? 'bg-white/20'
                                                    : 'bg-sky-50'
                                            } `}
                                        >
                                            <svg
                                                className={`h-6 w-6 ${review.bgStyle === 'transparent' ? 'text-white/80' : 'text-sky-500'}`}
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p
                                        className={`mb-6 text-center leading-relaxed ${
                                            review.bgStyle === 'transparent'
                                                ? 'font-medium text-gray-800'
                                                : 'text-gray-600'
                                        } `}
                                    >
                                        "{review.text}"
                                    </p>
                                    <div className="text-center">
                                        <h4
                                            className={`text-lg font-bold ${
                                                review.bgStyle === 'transparent'
                                                    ? 'text-gray-900'
                                                    : 'text-gray-900'
                                            } `}
                                        >
                                            {review.name}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review, i) => (
                        <div
                            key={i}
                            className="group relative transform transition-all duration-300 hover:-translate-y-2"
                        >
                            <div
                                className={`relative flex flex-col rounded-3xl p-8 shadow-xl transition-all duration-300 ${
                                    review.bgStyle === 'white'
                                        ? 'bg-white/95 backdrop-blur-sm hover:bg-white'
                                        : 'border border-white/30 bg-white/20 text-gray-800 backdrop-blur-md'
                                } hover:shadow-2xl hover:shadow-sky-500/20`}
                            >
                                <div className="absolute -top-14 left-8 flex h-28 w-28 transform items-center justify-center overflow-hidden rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        width={112}
                                        height={112}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="mt-12">
                                    <div className="mb-6 flex">
                                        {Array.from({ length: 5 }).map(
                                            (_, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`text-2xl transition-all duration-200 hover:scale-110 ${
                                                        idx < review.rating
                                                            ? 'text-yellow-400 drop-shadow-sm'
                                                            : review.bgStyle ===
                                                                'transparent'
                                                              ? 'text-white/40'
                                                              : 'text-gray-300'
                                                    } `}
                                                    style={{
                                                        animationDelay: `${idx * 0.1}s`,
                                                    }}
                                                >
                                                    ★
                                                </span>
                                            ),
                                        )}
                                    </div>
                                    <p
                                        className={`mb-6 text-left leading-relaxed ${
                                            review.bgStyle === 'transparent'
                                                ? 'font-medium text-gray-800'
                                                : 'text-gray-600'
                                        } `}
                                    >
                                        "{review.text}"
                                    </p>
                                    <div className="text-left">
                                        <h4
                                            className={`text-lg font-bold ${
                                                review.bgStyle === 'transparent'
                                                    ? 'text-gray-900'
                                                    : 'text-gray-900'
                                            } `}
                                        >
                                            {review.name}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StoryFeedSection;
