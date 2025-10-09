import FaskesPage from '@/Components/features/pasien/faskes/FaskesPage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function FaskesPageRoute({ user, faskes }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <FaskesPage faskes={faskes} />
        </PasienLayout>
    );
}
