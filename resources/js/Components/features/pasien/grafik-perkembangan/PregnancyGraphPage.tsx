import { useState } from 'react';
import GrafikJanin from './GrafikJanin';
import GrafikIbuHamil from './GrafikIbuHamil';

// TypeScript interfaces
interface Kehamilan {
    id: number;
    user_id: number;
    hpht: string;
    hpl: string;
    tinggi_badan_awal: string;
    user?: {
        name: string;
        tanggal_lahir: string;
    };
    janin?: Janin[];
}

interface Janin {
    id: number;
    pemeriksaan_anc_id: number;
    kehamilan_id: number;
    urutan_janin: number;
    denyut_jantung_janin: number;
    taksiran_berat_janin: number;
    panjang_janin_cm: string;
    posisi_janin: string;
    pergerakan_janin: string;
    created_at: string;
}

interface PemeriksaanAnc {
    id: number;
    kehamilan_id: number;
    tanggal_checkup: string;
    berat_badan: string;
    tinggi_fundus: string;
    frekuensi_jantung_per_menit: number;
    tekanan_darah_sistolik: number;
    tekanan_darah_diastolik: number;
    lila: string;
}

interface Props {
    pregnant: Kehamilan;
    growth: PemeriksaanAnc[];
}


const PregnancyGraphPage = ({ pregnant, growth }: Props) => {
    const [activeTrimester, setActiveTrimester] = useState(1);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-8">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
                    <h1 className="mb-6 text-2xl font-bold text-gray-800">
                        Grafik Perkembangan Kehamilan
                    </h1>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {/* Info Ibu */}
                        <div className="rounded-xl border border-purple-100 bg-white p-4 shadow-sm">
                            <div className="flex h-full items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-200">
                                    <span className="text-2xl">👤</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-semibold text-gray-800">
                                        {pregnant.user?.name || 'Nama Pasien'}
                                    </h3>
                                    <p className="text-sm text-blue-500">
                                        {pregnant.user?.tanggal_lahir
                                            ? formatDate(pregnant.user.tanggal_lahir)
                                            : '-'
                                        }
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        HPHT: {formatDate(pregnant.hpht)}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        HPL: {formatDate(pregnant.hpl)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trimester Cards */}
                        <div className="grid grid-cols-3 gap-3">
                            {[1, 2, 3].map((trimester) => (
                                <button
                                    key={trimester}
                                    className={`rounded-xl p-4 text-center transition-all duration-200 ${
                                        activeTrimester === trimester
                                            ? 'bg-sky-700'
                                            : 'border-2 border-sky-200 bg-sky-50 hover:bg-sky-100'
                                    }`}
                                    onClick={() => setActiveTrimester(trimester)}
                                >
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${
                                                activeTrimester === trimester
                                                    ? 'bg-white'
                                                    : 'bg-sky-100'
                                            }`}
                                        >
                                            <span
                                                className={`text-2xl ${
                                                    activeTrimester === trimester
                                                        ? 'text-blue-500'
                                                        : 'text-blue-400'
                                                }`}
                                            >
                                                🤰
                                            </span>
                                        </div>
                                        <span
                                            className={`text-sm font-semibold ${
                                                activeTrimester === trimester
                                                    ? 'text-white'
                                                    : 'text-blue-600'
                                            }`}
                                        >
                                            Trimester {trimester}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grafik Janin */}
                <GrafikJanin growth={growth} pregnant={pregnant} activeTrimester={activeTrimester}/>


                {/* Grafik Pemeriksaan ANC (Ibu) */}
                <GrafikIbuHamil growth={growth} pregnant={pregnant} activeTrimester={activeTrimester}/>

            </div>
        </div>
    );
};

export default PregnancyGraphPage;
