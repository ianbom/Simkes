import PregnancyCheckupPage from '@/Components/features/petugas/pemeriksaan/PregnancyCheckupPage';
import PetugasLayout from '@/Layouts/PetugasLayout';

export default function PregnancyCheckupPageRoute({user, pregnant}) {
    return (
        <PetugasLayout user={user}>
            <PregnancyCheckupPage pregnant={pregnant}/>
        </PetugasLayout>
    );
}
