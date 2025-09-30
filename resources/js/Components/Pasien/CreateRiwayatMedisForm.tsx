import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function CreateRiwayatMedisForm() {

       const { data, setData, post, processing, errors } = useForm({
            golongan_darah: '',
            rhesus: '',
            jumlah_keguguran: 0,
            riwayat_alergi: '',
        });

        const submit = (e: React.FormEvent) => {
            e.preventDefault();
            post(route('pasien.riwayatMedis.store'));
        };

    return (
        <form onSubmit={submit} className="space-y-4">
            {/* Golongan Darah */}
            <div>
                <InputLabel htmlFor="golongan_darah" value="Golongan Darah" />
                <select
                    id="golongan_darah"
                    value={data.golongan_darah}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    onChange={(e) => setData('golongan_darah', e.target.value)}
                >
                    <option value="">Pilih</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                </select>
                <InputError message={errors.golongan_darah} className="mt-2" />
            </div>

            {/* Rhesus */}
            <div>
                <InputLabel htmlFor="rhesus" value="Rhesus" />
                <select
                    id="rhesus"
                    value={data.rhesus}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    onChange={(e) => setData('rhesus', e.target.value)}
                >
                    <option value="">Pilih</option>
                    <option value="+">+</option>
                    <option value="-">-</option>
                </select>
                <InputError message={errors.rhesus} className="mt-2" />
            </div>

            {/* Jumlah Keguguran */}
            <div>
                <InputLabel htmlFor="jumlah_keguguran" value="Jumlah Keguguran" />
                <TextInput
                    id="jumlah_keguguran"
                    type="number"
                    value={data.jumlah_keguguran}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('jumlah_keguguran', e.target.value)}
                />
                <InputError message={errors.jumlah_keguguran} className="mt-2" />
            </div>

            {/* Riwayat Alergi */}
            <div>
                <InputLabel htmlFor="riwayat_alergi" value="Riwayat Alergi" />
                <textarea
                    id="riwayat_alergi"
                    value={data.riwayat_alergi}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    onChange={(e) => setData('riwayat_alergi', e.target.value)}
                />
                <InputError message={errors.riwayat_alergi} className="mt-2" />
            </div>

            {/* Tombol Submit */}
            <div className="flex justify-end">
                <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
            </div>
        </form>
    );
}
