import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

interface CreateKehamilanFormProps {
    patient: any;
    onClose: () => void; // ✅ Tambahkan prop ini untuk menutup modal
}

export default function CreateKehamilanForm({ patient, onClose }: CreateKehamilanFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: patient?.id || '',
        kehamilan_ke: '',
        hpht: '',
        hpl: '',
        tinggi_badan_awal: '',
        jumlah_janin: 1,
        status: 'Aktif',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('petugas.createKehamilan'), {
            preserveScroll: true,
            onSuccess: () => {
                reset(); // ✅ Kosongkan form
                onClose(); // ✅ Tutup modal otomatis
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kolom Kiri */}
                <div className="space-y-4">
                    {/* Kehamilan Ke */}
                    <div>
                        <InputLabel htmlFor="kehamilan_ke" value="Kehamilan Ke-" />
                        <TextInput
                            id="kehamilan_ke"
                            type="number"
                            value={data.kehamilan_ke}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('kehamilan_ke', e.target.value)}
                        />
                        <InputError message={errors.kehamilan_ke} className="mt-2" />
                    </div>

                    {/* HPHT */}
                    <div>
                        <InputLabel htmlFor="hpht" value="Tanggal HPHT" />
                        <TextInput
                            id="hpht"
                            type="date"
                            value={data.hpht}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('hpht', e.target.value)}
                        />
                        <InputError message={errors.hpht} className="mt-2" />
                    </div>

                    {/* HPL */}
                    <div>
                        <InputLabel htmlFor="hpl" value="Tanggal HPL" />
                        <TextInput
                            id="hpl"
                            type="date"
                            value={data.hpl}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('hpl', e.target.value)}
                        />
                        <InputError message={errors.hpl} className="mt-2" />
                    </div>
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-4">
                    {/* Tinggi Badan */}
                    <div>
                        <InputLabel htmlFor="tinggi_badan_awal" value="Tinggi Badan Awal (cm)" />
                        <TextInput
                            id="tinggi_badan_awal"
                            type="number"
                            step="0.1"
                            value={data.tinggi_badan_awal}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('tinggi_badan_awal', e.target.value)}
                        />
                        <InputError message={errors.tinggi_badan_awal} className="mt-2" />
                    </div>

                    {/* Jumlah Janin */}
                    <div>
                        <InputLabel htmlFor="jumlah_janin" value="Jumlah Janin" />
                        <TextInput
                            id="jumlah_janin"
                            type="number"
                            value={data.jumlah_janin}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('jumlah_janin', e.target.value)}
                        />
                        <InputError message={errors.jumlah_janin} className="mt-2" />
                    </div>

                    {/* Status Kehamilan */}
                    <div>
                        <InputLabel htmlFor="status" value="Status Kehamilan" />
                        <select
                            id="status"
                            value={data.status}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="Aktif">Aktif</option>
                            <option value="Selesai">Selesai</option>
                            <option value="Keguguran">Keguguran</option>
                        </select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>
                </div>
            </div>

            {/* Tombol Submit */}
            <div className="flex justify-end">
                <PrimaryButton disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </PrimaryButton>
            </div>
        </form>
    );
}
