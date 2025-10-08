import ConsultationHistoryPage from '@/Components/features/pasien/riwayat/ConsultationHistoryPage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function PregnancyGuidePageRoute({ user }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <ConsultationHistoryPage />
        </PasienLayout>
    );
}
