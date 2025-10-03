import PregnancyCheckupPage from '@/Components/features/petugas/pemeriksaan/PregnancyCheckupPage';
import PetugasLayout from '@/Layouts/PetugasLayout';

export default function PregnancyCheckupPageRoute(user) {
    return (
        <PetugasLayout user={user}>
            <PregnancyCheckupPage />
        </PetugasLayout>
    );
}
