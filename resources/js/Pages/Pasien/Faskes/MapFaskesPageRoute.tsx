import MapFaskesPage from '@/Components/features/pasien/faskes/MapFaskesPage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function MapFaskesPageRoute({ user, faskes }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <MapFaskesPage faskes={faskes} />
        </PasienLayout>
    );
}
