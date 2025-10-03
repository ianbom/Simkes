import CheckupPage from '@/Components/features/petugas/pemeriksaan/PregnancyCheckupPage';
import PetugasLayout from '@/Layouts/PetugasLayout';

export default function CheckupPageRoute(user) {
    return (
        <PetugasLayout user={user}>
            <CheckupPage />
        </PetugasLayout>
    );
}
