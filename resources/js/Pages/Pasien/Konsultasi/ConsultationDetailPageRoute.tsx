import ConsultPage from '@/Components/features/pasien/konsultasi-online/ConsultationDetailPage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function ConsultationPageRoute({ user, consultation }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <ConsultPage  consultation={consultation} user={user} />
        </PasienLayout>
    );
}
