import PregnancyGuidePage from '@/Components/features/pasien/panduan/PregnancyGuidePage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function PregnancyGuidePageRoute({ user }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <PregnancyGuidePage />
        </PasienLayout>
    );
}
