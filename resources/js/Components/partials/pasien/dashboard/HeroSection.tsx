import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight, Heart } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="bg-background relative mb-8 overflow-hidden py-12 text-white">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute left-10 top-10 h-32 w-32 animate-pulse rounded-full bg-white/10 blur-xl"></div>
                <div
                    className="absolute bottom-20 left-1/4 h-48 w-48 animate-bounce rounded-full bg-sky-300/10 blur-2xl"
                    style={{ animationDuration: '3s' }}
                ></div>
                <div
                    className="absolute right-20 top-1/3 h-40 w-40 animate-pulse rounded-full bg-white/5 blur-xl"
                    style={{ animationDelay: '1s' }}
                ></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="text-center lg:text-left">
                        <div className="animate-fade-in mb-6 inline-flex items-center rounded-full bg-sky-700 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                            <Heart className="mr-2 h-4 w-4 text-blue-200" />
                            Platform Kesehatan Ibu dan Anak
                        </div>
                        <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-black md:text-6xl">
                            Sahabat Sehat Ibu & Anak, Sejak Kehamilan Hingga
                            Tumbuh Kembang{' '}
                        </h1>
                        <p
                            className="animate-fade-in mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-700 md:text-2xl lg:mx-0"
                            style={{ animationDelay: '0.3s' }}
                        >
                            <span className="text-secondary">Simkesia </span>
                            hadir untuk membantu Bunda menjaga kesehatan selama
                            kehamilan dan mendukung tumbuh kembang si kecil,
                            termasuk deteksi dini risiko stunting.
                        </p>
                        <div
                            className="animate-fade-in-up flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
                            style={{ animationDelay: '0.6s' }}
                        >
                            <Link href="/reports/create">
                                <Button
                                    size="lg"
                                    className="group rounded-full bg-gradient-to-r from-[#1176C5] to-[#2FB6E9] p-6 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                                >
                                    Konsultasi Sekarang
                                    <span className="ml-5 flex items-center justify-center rounded-full bg-white p-2">
                                        <ArrowRight className="h-4 w-4 text-black transition-transform group-hover:rotate-90" />
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        <div
                            className="animate-fade-in-scale relative z-10"
                            style={{ animationDelay: '0.9s' }}
                        >
                            <div className="group relative rounded-2xl p-6 transition-all duration-500 hover:scale-105">
                                <img
                                    src="/assets/images/hero-img.png"
                                    alt="Lingkungan Indonesia"
                                    className="w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default HeroSection;
