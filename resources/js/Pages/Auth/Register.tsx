import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Calendar, MapPin, UserPlus } from 'lucide-react';
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

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="relative z-10 mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                        <div className="hidden flex-col justify-center space-y-6 px-8 lg:flex">
                            <div className="mb-4">
                                <div className="mb-6 flex items-center gap-4">
                                    <img
                                        src="/assets/images/simkesia-logo.png"
                                        alt="SIMKESIA Logo"
                                        className="h-16 w-16 object-contain"
                                    />
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900">
                                            SIMKESIA
                                        </h1>
                                        <p className="text-sm text-gray-600">
                                            Sistem Informasi Kesehatan Ibu dan
                                            Anak
                                        </p>
                                    </div>
                                </div>

                                <h2 className="mb-4 text-4xl font-bold text-gray-900">
                                    Bergabung Bersama Kami
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Daftarkan diri Anda untuk mendapatkan akses
                                    ke layanan kesehatan digital
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary">
                                        <UserPlus className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Konsultasi Online
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Konsultasi dengan dokter kapan saja
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary">
                                        <MapPin className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Faskes Terdekat
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Temukan fasilitas kesehatan di
                                            sekitar Anda
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary">
                                        <Calendar className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Pantau Kesehatan
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Kelola riwayat kesehatan Anda
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white p-8 shadow-xl lg:p-10">
                            <div className="mb-6 flex items-center justify-center gap-3 lg:hidden">
                                <img
                                    src="/assets/images/simkesia-logo.png"
                                    alt="SIMKESIA Logo"
                                    className="h-12 w-12 object-contain"
                                />
                                <div className="text-center">
                                    <h1 className="text-xl font-bold text-gray-900">
                                        SIMKESIA
                                    </h1>
                                    <p className="text-xs text-gray-600">
                                        Sistem Informasi Kesehatan Ibu dan Anak
                                    </p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className="mb-2 text-3xl font-bold text-gray-900">
                                    Daftar Akun
                                </h2>
                                <p className="text-gray-600">
                                    Lengkapi data diri Anda untuk mendaftar
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-5">
                                <div className="space-y-4">
                                    <h3 className="border-b pb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                                        Data Lokasi
                                    </h3>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <InputLabel
                                                htmlFor="provinsi_id"
                                                value="Provinsi"
                                            />
                                            <select
                                                id="provinsi_id"
                                                name="provinsi_id"
                                                value={data.provinsi_id}
                                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                onChange={(e) =>
                                                    setData(
                                                        'provinsi_id',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            >
                                                <option value="">
                                                    Pilih Provinsi
                                                </option>
                                                <option value="1">
                                                    Jawa Timur
                                                </option>
                                                <option value="2">
                                                    Jawa Tengah
                                                </option>
                                                <option value="3">
                                                    Jawa Barat
                                                </option>
                                            </select>
                                            <InputError
                                                message={errors.provinsi_id}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="kota_id"
                                                value="Kota/Kabupaten"
                                            />
                                            <select
                                                id="kota_id"
                                                name="kota_id"
                                                value={data.kota_id}
                                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                onChange={(e) =>
                                                    setData(
                                                        'kota_id',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            >
                                                <option value="">
                                                    Pilih Kota
                                                </option>
                                                <option value="1">
                                                    Surabaya
                                                </option>
                                                <option value="2">
                                                    Sidoarjo
                                                </option>
                                                <option value="3">
                                                    Gresik
                                                </option>
                                            </select>
                                            <InputError
                                                message={errors.kota_id}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="kecamatan_id"
                                                value="Kecamatan"
                                            />
                                            <select
                                                id="kecamatan_id"
                                                name="kecamatan_id"
                                                value={data.kecamatan_id}
                                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                onChange={(e) =>
                                                    setData(
                                                        'kecamatan_id',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            >
                                                <option value="">
                                                    Pilih Kecamatan
                                                </option>
                                                <option value="1">
                                                    Wonokromo
                                                </option>
                                                <option value="2">
                                                    Gubeng
                                                </option>
                                                <option value="3">
                                                    Tegalsari
                                                </option>
                                            </select>
                                            <InputError
                                                message={errors.kecamatan_id}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="faskes_id"
                                                value="Faskes (Opsional)"
                                            />
                                            <select
                                                id="faskes_id"
                                                name="faskes_id"
                                                value={data.faskes_id}
                                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                onChange={(e) =>
                                                    setData(
                                                        'faskes_id',
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Pilih Faskes
                                                </option>
                                                <option value="1">
                                                    Puskesmas Wonokromo
                                                </option>
                                                <option value="2">
                                                    Puskesmas Gubeng
                                                </option>
                                                <option value="3">
                                                    Puskesmas Tegalsari
                                                </option>
                                            </select>
                                            <InputError
                                                message={errors.faskes_id}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="border-b pb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                                        Data Pribadi
                                    </h3>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <InputLabel
                                                htmlFor="nik"
                                                value="NIK"
                                            />
                                            <TextInput
                                                id="nik"
                                                name="nik"
                                                value={data.nik}
                                                placeholder="Masukkan NIK"
                                                className="mt-1 block w-full"
                                                maxLength={16}
                                                onChange={(e) =>
                                                    setData(
                                                        'nik',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.nik}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="name"
                                                value="Nama Lengkap"
                                            />
                                            <TextInput
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                placeholder="Masukkan nama lengkap"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        'name',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="tanggal_lahir"
                                                value="Tanggal Lahir"
                                            />
                                            <TextInput
                                                id="tanggal_lahir"
                                                type="date"
                                                name="tanggal_lahir"
                                                value={data.tanggal_lahir}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        'tanggal_lahir',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.tanggal_lahir}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="kelamin"
                                                value="Jenis Kelamin"
                                            />
                                            <select
                                                id="kelamin"
                                                name="kelamin"
                                                value={data.kelamin}
                                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                onChange={(e) =>
                                                    setData(
                                                        'kelamin',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            >
                                                <option value="">Pilih</option>
                                                <option value="L">
                                                    Laki-laki
                                                </option>
                                                <option value="P">
                                                    Perempuan
                                                </option>
                                            </select>
                                            <InputError
                                                message={errors.kelamin}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <InputLabel
                                                htmlFor="no_telp"
                                                value="Nomor Telepon"
                                            />
                                            <TextInput
                                                id="no_telp"
                                                name="no_telp"
                                                value={data.no_telp}
                                                placeholder="08xxxxxxxxxx"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        'no_telp',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.no_telp}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <InputLabel
                                                htmlFor="alamat"
                                                value="Alamat Lengkap"
                                            />
                                            <textarea
                                                id="alamat"
                                                name="alamat"
                                                value={data.alamat}
                                                placeholder="Masukkan alamat lengkap"
                                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                rows={3}
                                                onChange={(e) =>
                                                    setData(
                                                        'alamat',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.alamat}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="border-b pb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                                        Data Akun
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel
                                                htmlFor="email"
                                                value="Email"
                                            />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                placeholder="email@example.com"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.email}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <InputLabel
                                                    htmlFor="password"
                                                    value="Password"
                                                />
                                                <TextInput
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    value={data.password}
                                                    placeholder="••••••••"
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'password',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={errors.password}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="password_confirmation"
                                                    value="Konfirmasi Password"
                                                />
                                                <TextInput
                                                    id="password_confirmation"
                                                    type="password"
                                                    name="password_confirmation"
                                                    value={
                                                        data.password_confirmation
                                                    }
                                                    placeholder="••••••••"
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            'password_confirmation',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        errors.password_confirmation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <PrimaryButton
                                        className="w-full justify-center py-3 text-base"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? 'Mendaftar...'
                                            : 'Daftar Sekarang'}
                                    </PrimaryButton>
                                </div>

                                <div className="text-center text-sm text-gray-600">
                                    Sudah punya akun?{' '}
                                    <Link
                                        href={route('login')}
                                        className="font-medium text-blue-600 hover:text-blue-500"
                                    >
                                        Masuk di sini
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
