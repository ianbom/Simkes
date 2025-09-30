import PasienLayout from '@/Layouts/PasienLayout';
import CreateRiwayatMedisForm from '@/Components/Pasien/CreateRiwayatMedisForm';


export default function CreateRiwayatMedisPageRoute({ user }) {


    return (
        <PasienLayout currentPage="riwayat_medis" user={user}>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
                <h2 className="text-xl font-semibold mb-4">Tambah Riwayat Medis</h2>

                <CreateRiwayatMedisForm/>
            </div>
        </PasienLayout>
    );
}
