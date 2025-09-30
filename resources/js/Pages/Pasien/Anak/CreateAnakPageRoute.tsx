import PasienLayout from '@/Layouts/PasienLayout';
import CreateAnakForm from '@/Components/Pasien/CreateAnakForm';

export default function CreateAnakPage({ user }) {


    return (
        <PasienLayout currentPage="anak" user={user}>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
                <h2 className="text-xl font-semibold mb-4">Tambah Data Anak</h2>

                {/* Lempar props ke form */}
                <CreateAnakForm/>
            </div>
        </PasienLayout>
    );
}
