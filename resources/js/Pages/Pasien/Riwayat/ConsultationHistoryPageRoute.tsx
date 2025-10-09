import ConsultationHistoryPage from '@/Components/features/pasien/riwayat/ConsultationHistoryPage';
import PasienLayout from '@/Layouts/PasienLayout';

export default function ConsultationHistoryPageRoute({ user, consultations }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <ConsultationHistoryPage consultations={consultations} />
        </PasienLayout>
    );
}
