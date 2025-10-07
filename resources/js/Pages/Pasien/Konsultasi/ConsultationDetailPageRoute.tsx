import ConsultPage from '@/Components/features/pasien/konsultasi-online/ConsultationDetailPage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function ConsultationPageRoute({ user }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <ConsultPage />
        </PasienLayout>
    );
}
