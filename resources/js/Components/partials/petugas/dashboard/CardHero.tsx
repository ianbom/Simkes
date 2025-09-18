import { Card, CardContent } from '@/Components/ui/card';
import { Stethoscope, Video } from 'lucide-react';
const CardHero = () => {
    return (
        <Card className="border-blue-200 bg-blue-900/70 bg-[url('/assets/images/hero-bg.jpg')] bg-cover bg-center bg-blend-multiply transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                    <div className="">
                        <p className="text-3xl font-bold text-white">
                            Selamat datang, Petugas Faskes Argya Dwi
                        </p>
                        <p className="text-md mt-1 font-extralight text-gray-200">
                            Anda punya 8 appointments hari ini dan 3 pesan
                            penting untuk segera ditindaklanjuti.{' '}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 font-medium text-white opacity-90 transition-colors duration-200 hover:bg-blue-900">
                        <Stethoscope className="mr-2 h-4 w-4" />
                        Mulai Pemeriksaan
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-medium text-primary opacity-90 transition-colors duration-200 hover:bg-slate-700 hover:text-white">
                        <Video className="mr-2 h-4 w-4" />
                        Konsultasi
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};
export default CardHero;
