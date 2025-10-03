import ChildCheckupPage from '@/Components/features/petugas/pemeriksaan/ChildCheckupPage';
import PetugasLayout from '@/Layouts/PetugasLayout';

export default function ChildCheckupPageRoute(user) {
    return (
        <PetugasLayout user={user}>
            <ChildCheckupPage />
        </PetugasLayout>
    );
}
