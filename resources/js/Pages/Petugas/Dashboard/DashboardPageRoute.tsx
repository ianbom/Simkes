import DashboardPetugasPage from '@/Components/features/petugas/dashboard/DashboardPage';
import PetugasLayout from '@/Layouts/PetugasLayout';
export default function DashboardPageRoute({ user }) {
    return (
        <PetugasLayout user={user}>
            <DashboardPetugasPage />
        </PetugasLayout>
    );
}
