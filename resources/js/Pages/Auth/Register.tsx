import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        provinsi_id: '',
        kota_id: '',
        kecamatan_id: '',
        faskes_id: '',
        name: '',
        nik: '',
        tanggal_lahir: '',
        kelamin: '',
        no_telp: '',
        alamat: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                {/* Provinsi */}
                <div>
                    <InputLabel htmlFor="provinsi_id" value="Provinsi ID" />
                    <TextInput
                        id="provinsi_id"
                        name="provinsi_id"
                        value={data.provinsi_id}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('provinsi_id', e.target.value)}
                        required
                    />
                    <InputError message={errors.provinsi_id} className="mt-2" />
                </div>

                {/* Kota */}
                <div className="mt-4">
                    <InputLabel htmlFor="kota_id" value="Kota ID" />
                    <TextInput
                        id="kota_id"
                        name="kota_id"
                        value={data.kota_id}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('kota_id', e.target.value)}
                        required
                    />
                    <InputError message={errors.kota_id} className="mt-2" />
                </div>

                {/* Kecamatan */}
                <div className="mt-4">
                    <InputLabel htmlFor="kecamatan_id" value="Kecamatan ID" />
                    <TextInput
                        id="kecamatan_id"
                        name="kecamatan_id"
                        value={data.kecamatan_id}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('kecamatan_id', e.target.value)}
                        required
                    />
                    <InputError message={errors.kecamatan_id} className="mt-2" />
                </div>

                {/* Faskes */}
                <div className="mt-4">
                    <InputLabel htmlFor="faskes_id" value="Faskes ID" />
                    <TextInput
                        id="faskes_id"
                        name="faskes_id"
                        value={data.faskes_id}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('faskes_id', e.target.value)}
                    />
                    <InputError message={errors.faskes_id} className="mt-2" />
                </div>

                {/* NIK */}
                <div className="mt-4">
                    <InputLabel htmlFor="nik" value="NIK" />
                    <TextInput
                        id="nik"
                        name="nik"
                        value={data.nik}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('nik', e.target.value)}
                        required
                    />
                    <InputError message={errors.nik} className="mt-2" />
                </div>

                {/* Nama */}
                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Nama Lengkap" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Tanggal Lahir */}
                <div className="mt-4">
                    <InputLabel htmlFor="tanggal_lahir" value="Tanggal Lahir" />
                    <TextInput
                        id="tanggal_lahir"
                        type="date"
                        name="tanggal_lahir"
                        value={data.tanggal_lahir}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('tanggal_lahir', e.target.value)}
                        required
                    />
                    <InputError message={errors.tanggal_lahir} className="mt-2" />
                </div>

                {/* Kelamin */}
                <div className="mt-4">
                    <InputLabel htmlFor="kelamin" value="Jenis Kelamin" />
                    <select
                        id="kelamin"
                        name="kelamin"
                        value={data.kelamin}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        onChange={(e) => setData('kelamin', e.target.value)}
                        required
                    >
                        <option value="">Pilih</option>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                    <InputError message={errors.kelamin} className="mt-2" />
                </div>

                {/* No Telp */}
                <div className="mt-4">
                    <InputLabel htmlFor="no_telp" value="Nomor Telepon" />
                    <TextInput
                        id="no_telp"
                        name="no_telp"
                        value={data.no_telp}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('no_telp', e.target.value)}
                        required
                    />
                    <InputError message={errors.no_telp} className="mt-2" />
                </div>

                {/* Alamat */}
                <div className="mt-4">
                    <InputLabel htmlFor="alamat" value="Alamat" />
                    <textarea
                        id="alamat"
                        name="alamat"
                        value={data.alamat}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        onChange={(e) => setData('alamat', e.target.value)}
                        required
                    />
                    <InputError message={errors.alamat} className="mt-2" />
                </div>

                {/* Email */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Konfirmasi Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* Tombol Submit */}
                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Already registered?
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
