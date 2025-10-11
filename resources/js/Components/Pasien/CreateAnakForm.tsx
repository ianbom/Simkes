import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

interface CreateAnakFormProps {
    patient: any;
    onClose: () => void; // ✅ untuk menutup modal setelah sukses
}

export default function CreateAnakForm({ patient, onClose }: CreateAnakFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        orang_tua_id: patient?.id || '',
        kelahiran_id: '',
        nama: '',
        nik: '',
        kelamin: '',
        status_hidup: 'Hidup',
        tanggal_lahir: '',
        tanggal_meninggal: '',
        berat_lahir_gram: '',
        panjang_lahir_cm: '',
        lingkar_kepala_cm: '',
        urutan_kelahiran: '',
        kondisi: '',

    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('pasien.anak.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset(); // ✅ Kosongkan form
                onClose(); // ✅ Tutup modal otomatis
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            {/* === Grid Dua Kolom === */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kolom Kiri */}
                <div className="space-y-4">
                    {/* Nama */}
                    <div>
                        <InputLabel htmlFor="nama" value="Nama Anak" />
                        <TextInput
                            id="nama"
                            value={data.nama}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('nama', e.target.value)}
                        />
                        <InputError message={errors.nama} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="nik" value="NIK" />
                        <TextInput
                            id="nik"
                            value={data.nik}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('nik', e.target.value)}
                        />
                        <InputError message={errors.nik} className="mt-2" />
                    </div>

                    {/* Kelamin */}
                    <div>
                        <InputLabel htmlFor="kelamin" value="Jenis Kelamin" />
                        <select
                            id="kelamin"
                            value={data.kelamin}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                            onChange={(e) => setData('kelamin', e.target.value)}
                        >
                            <option value="">Pilih</option>
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        <InputError message={errors.kelamin} className="mt-2" />
                    </div>



                    {/* Tanggal Lahir */}
                    <div>
                        <InputLabel htmlFor="tanggal_lahir" value="Tanggal Lahir" />
                        <TextInput
                            id="tanggal_lahir"
                            type="date"
                            value={data.tanggal_lahir}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('tanggal_lahir', e.target.value)}
                        />
                        <InputError message={errors.tanggal_lahir} className="mt-2" />
                    </div>

                    {/* Tanggal Meninggal */}

                </div>

                {/* Kolom Kanan */}
                <div className="space-y-4">
                    {/* Berat Lahir */}
                    <div>
                        <InputLabel htmlFor="berat_lahir_gram" value="Berat Lahir (gram)" />
                        <TextInput
                            id="berat_lahir_gram"
                            type="number"
                            value={data.berat_lahir_gram}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('berat_lahir_gram', e.target.value)}
                        />
                        <InputError message={errors.berat_lahir_gram} className="mt-2" />
                    </div>

                    {/* Panjang Lahir */}
                    <div>
                        <InputLabel htmlFor="panjang_lahir_cm" value="Panjang Lahir (cm)" />
                        <TextInput
                            id="panjang_lahir_cm"
                            type="number"
                            step="0.1"
                            value={data.panjang_lahir_cm}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('panjang_lahir_cm', e.target.value)}
                        />
                        <InputError message={errors.panjang_lahir_cm} className="mt-2" />
                    </div>

                    {/* Lingkar Kepala */}
                    <div>
                        <InputLabel htmlFor="lingkar_kepala_cm" value="Lingkar Kepala (cm)" />
                        <TextInput
                            id="lingkar_kepala_cm"
                            type="number"
                            step="0.1"
                            value={data.lingkar_kepala_cm}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('lingkar_kepala_cm', e.target.value)}
                        />
                        <InputError message={errors.lingkar_kepala_cm} className="mt-2" />
                    </div>

                    {/* Urutan Kelahiran */}
                    <div>
                        <InputLabel htmlFor="urutan_kelahiran" value="Urutan Kelahiran" />
                        <TextInput
                            id="urutan_kelahiran"
                            type="number"
                            value={data.urutan_kelahiran}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('urutan_kelahiran', e.target.value)}
                        />
                        <InputError message={errors.urutan_kelahiran} className="mt-2" />
                    </div>

                    {/* Kondisi */}
                    <div>
                        <InputLabel htmlFor="kondisi" value="Kondisi" />
                        <TextInput
                            id="kondisi"
                            value={data.kondisi}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('kondisi', e.target.value)}
                        />
                        <InputError message={errors.kondisi} className="mt-2" />
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
