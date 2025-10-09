import DetailFaskesPage from '@/Components/features/pasien/faskes/DetailFaskesPage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function DetailFaskesPageRoute({ user, faskesDetail }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <DetailFaskesPage faskesDetail={faskesDetail} />
        </PasienLayout>
    );
}
