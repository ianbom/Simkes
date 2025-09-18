import MedicineDetailPage from '@/Components/features/pasien/bank-obat/MedicineDetailPage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function MedicineDetailPageRoute({ user }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <MedicineDetailPage />
        </PasienLayout>
    );
}
