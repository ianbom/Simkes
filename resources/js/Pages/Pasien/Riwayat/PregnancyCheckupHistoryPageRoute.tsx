import PregnancyCheckupHistoryPage from '@/Components/features/pasien/riwayat/PregnancyCheckupHistoryPage';
import PasienLayout from '@/Layouts/PasienLayout';
import { PageProps } from '@/types';
import { PemeriksaanAnc } from '@/types/interface';

interface Props extends PageProps {
    checkupHistory?: PemeriksaanAnc[];
}

export default function PregnancyCheckupHistoryPageRoute({
    user,
    checkupHistory,
}: Props) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <PregnancyCheckupHistoryPage checkupHistory={checkupHistory} />
        </PasienLayout>
    );
}
