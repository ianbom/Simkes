import PregnancyCheckupPage from '@/Components/features/petugas/pemeriksaan/PregnancyCheckupPage';
import PetugasLayout from '@/Layouts/PetugasLayout';
interface Props {
    user: any;
    pregnant: any;
    checkupHistory: any[];
    sickHistory: any[];
    growth: any[];
}
export default function PregnancyCheckupPageRoute({
    user,
    pregnant,
    checkupHistory,
    sickHistory,
    growth,
}: Props) {
    return (
        <PetugasLayout user={user}>
            <PregnancyCheckupPage
                pregnant={pregnant}
                checkupHistory={checkupHistory}
                sickHistory={sickHistory}
                growth={growth}
            />
        </PetugasLayout>
    );
}
