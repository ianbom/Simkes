import ConsultationPage from '@/Components/features/pasien/konsultasi-online/ConsultationPage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function ConsultationPageRoute({ user, schedule }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <ConsultationPage schedule={schedule}/>
        </PasienLayout>
    );
}
