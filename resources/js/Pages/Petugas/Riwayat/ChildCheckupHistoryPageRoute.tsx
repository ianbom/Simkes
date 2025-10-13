import ChildCheckupHistoryPage from '@/Components/features/petugas/riwayat-pasien/ChildCheckupHistoryPage';
import PetugasLayout from '@/Layouts/PetugasLayout';
import { PageProps } from '@/types';
import { PemeriksaanAnak } from '@/types/interface';
interface Props extends PageProps {
    checkupHistory: PemeriksaanAnak[]; // Tambahkan ini
}
export default function ChildCheckupHistoryPageRoute({
    user,
    checkupHistory,
}: Props) {
    return (
        <PetugasLayout user={user}>
            <ChildCheckupHistoryPage checkupHistory={checkupHistory} />
        </PetugasLayout>
    );
}
