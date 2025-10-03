import PregnancyGraphPage from '@/Components/features/pasien/grafik-perkembangan/PregnancyGraphPage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function ChildGraphPageRoute({ user }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <PregnancyGraphPage />
        </PasienLayout>
    );
}
