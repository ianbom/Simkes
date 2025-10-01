import DashboardPetugasPage from '@/Components/features/petugas/dashboard/DashboardPage';
import PetugasLayout from '@/Layouts/PetugasLayout';

export default function DashboardPageRoute({
    user,
    lastestPregnantPatients,
    lastestChildPatients,
    consulQueue
}) {
    return (
        <PetugasLayout user={user}>
            <DashboardPetugasPage
                lastestPregnantPatients={lastestPregnantPatients}
                lastestChildPatients={lastestChildPatients}
                consulQueue={consulQueue}
            />
        </PetugasLayout>
    );
}
