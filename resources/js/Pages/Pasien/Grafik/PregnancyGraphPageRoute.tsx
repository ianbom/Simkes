import PregnancyGraphPage from '@/Components/features/pasien/grafik-perkembangan/PregnancyGraphPage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function ChildGraphPageRoute({ user, pregnant, growth, allPregnant }) {



    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <PregnancyGraphPage growth={growth} pregnant={pregnant} allPregnant={allPregnant} />
        </PasienLayout>
    );
}
