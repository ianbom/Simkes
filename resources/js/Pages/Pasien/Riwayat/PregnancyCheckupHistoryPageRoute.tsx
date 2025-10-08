import PregnancyCheckupHistoryPage from '@/Components/features/pasien/riwayat/PregnancyCheckupHistoryPage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function PregnancyGuidePageRoute({ user }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <PregnancyCheckupHistoryPage />
        </PasienLayout>
    );
}
