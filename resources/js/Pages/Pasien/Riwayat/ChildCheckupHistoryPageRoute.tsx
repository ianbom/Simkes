import ChildCheckupHistoryPage from '@/Components/features/pasien/riwayat/ChildCheckupHistoryPage';
import PasienLayout from '@/Layouts/PasienLayout';
import { PageProps } from '@/types';

interface Props extends PageProps {
    checkupHistory: any; // Tambahkan ini
}
export default function PregnancyGuidePageRoute({
    user,
    checkupHistory,
}: Props) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <ChildCheckupHistoryPage checkupHistory={checkupHistory} />
        </PasienLayout>
    );
}
