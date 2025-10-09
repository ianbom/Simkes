import ChildCheckupPage from '@/Components/features/petugas/pemeriksaan/ChildCheckupPage';
import PetugasLayout from '@/Layouts/PetugasLayout';

export default function ChildCheckupPageRoute({ user, child }) {
    return (
        <PetugasLayout user={user}>
            <ChildCheckupPage child={child} />
        </PetugasLayout>
    );
}
