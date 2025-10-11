import ChildCheckupPage from '@/Components/features/petugas/pemeriksaan/ChildCheckupPage';
import PetugasLayout from '@/Layouts/PetugasLayout';
interface Props {
    user: any;
    child: any;
    checkupHistory: any[];
    sickHistory: any[];
    growth: any[];
}
export default function ChildCheckupPageRoute({
    user,
    child,
    checkupHistory,
    sickHistory,
    growth,
}: Props) {
    return (
        <PetugasLayout user={user}>
            <ChildCheckupPage
                child={child}
                checkupHistory={checkupHistory}
                sickHistory={sickHistory}
                growth={growth}
            />
        </PetugasLayout>
    );
}
