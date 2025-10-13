import PregnancyCheckupHistoryPage from '@/Components/features/petugas/riwayat-pasien/PregnancyCheckupHistoryPage';
import PetugasLayout from '@/Layouts/PetugasLayout';
import { PageProps } from '@/types';
import { PemeriksaanAnc } from '@/types/interface';
// interface PemeriksaanAnc {
//     id: number;
//     kehamilan_id: number;
//     petugas_faskes_id: number;
//     jenis_pemeriksaan: 'Rutin' | 'Sakit';
//     tanggal_checkup: string;
//     berat_badan: number;
//     tekanan_darah_sistolik: number;
//     tekanan_darah_diastolik: number;
//     lila?: number;
//     tinggi_fundus?: number;
//     status_bengkak_kaki?: 'Tidak Ada' | 'Ringan' | 'Berat';
//     keluhan?: string;
//     suhu_tubuh_celsius?: number;
//     frekuensi_napas_per_menit?: number;
//     frekuensi_jantung_per_menit?: number;
//     catatan_petugas?: string;
//     deteksi_resiko?: string;
//     saran_kunjungan_berikutnya?: string;
//     kehamilan?: any;
//     petugas?: any;
//     dataJanin?: any[];
//     media?: any[];
//     hasilLab?: any[];
//     imunisasi?: any[];
//     resep?: any[];
//     created_at: string;
//     updated_at: string;
// }

interface Props extends PageProps {
    checkupHistory?: PemeriksaanAnc[];
}

export default function PregnancyCheckupHistoryPageRoute({
    user,
    checkupHistory,
}: Props) {
    return (
        <PetugasLayout user={user}>
            <PregnancyCheckupHistoryPage checkupHistory={checkupHistory} />
        </PetugasLayout>
    );
}
