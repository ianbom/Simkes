import ChildGraphPage from '@/Components/features/pasien/grafik-perkembangan/ChildGraphPage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function ChildGraphPageRoute({
    user,
    child,
    growth,
    allChilds,
}) {
    console.log(allChilds);

    return (
        <PasienLayout currentPage="dashbchildchildoard" user={user}>
            <ChildGraphPage
                child={child}
                growth={growth}
                allChilds={allChilds}
            />
        </PasienLayout>
    );
}
