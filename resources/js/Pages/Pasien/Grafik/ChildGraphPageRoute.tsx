import ChildGraphPage from '@/Components/features/pasien/grafik-perkembangan/ChildGraphPage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function ChildGraphPageRoute({ user }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <ChildGraphPage />
        </PasienLayout>
    );
}
