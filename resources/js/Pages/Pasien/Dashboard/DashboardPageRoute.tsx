import DashboardPasienPage from '@/Components/features/pasien/dashboard/DashboardPage';
import PasienLayout from '@/Layouts/PasienLayout';

export default function DashboardPageRoute({ user }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <DashboardPasienPage />
        </PasienLayout>
    );
}
