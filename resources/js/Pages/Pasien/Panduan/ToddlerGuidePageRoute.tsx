import ToddlerGuidePage from '@/Components/features/pasien/panduan/ToddlerGuidePage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function PregnancyGuidePageRoute({ user }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <ToddlerGuidePage />
        </PasienLayout>
    );
}
