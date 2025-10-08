import ChildCheckupHistoryPage from '@/Components/features/pasien/riwayat/ChildCheckupHistoryPage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function PregnancyGuidePageRoute({ user }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <ChildCheckupHistoryPage />
        </PasienLayout>
    );
}
