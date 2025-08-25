import MedicinePage from '@/Components/features/pasien/bank-obat/MedicinePage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function MedicinePageRoute({ user }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <MedicinePage />
        </PasienLayout>
    );
}
