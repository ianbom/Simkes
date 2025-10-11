import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { HeartPulse, Shield, Zap } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 px-4 sm:px-6 lg:px-8">
                <div className="relative z-10 mx-auto w-full max-w-7xl">
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
                                    Selamat Datang Kembali
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Masuk ke akun Anda untuk melanjutkan akses
                                    ke layanan kesehatan digital
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary">
                                        <Shield className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Aman & Terpercaya
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Data Anda dilindungi dengan enkripsi
                                            tingkat tinggi
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary">
                                        <Zap className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Akses Cepat
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Layanan kesehatan dalam genggaman
                                            Anda
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary">
                                        <HeartPulse className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Monitoring 24/7
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Pantau kesehatan Anda kapan saja
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
                                    Masuk ke Akun
                                </h2>
                                <p className="text-gray-600">
                                    Masukkan email dan password Anda
                                </p>
                            </div>

                            {status && (
                                <div className="mb-4 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-600">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        placeholder="email@example.com"
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

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
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    'remember',
                                                    (e.target.checked ||
                                                        false) as false,
                                                )
                                            }
                                        />
                                        <span className="ms-2 text-sm text-gray-600">
                                            Ingat saya
                                        </span>
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm font-medium text-blue-600 hover:text-blue-500"
                                        >
                                            Lupa password?
                                        </Link>
                                    )}
                                </div>

                                <div className="pt-2">
                                    <PrimaryButton
                                        className="w-full justify-center py-3 text-base"
                                        disabled={processing}
                                    >
                                        {processing ? 'Masuk...' : 'Masuk'}
                                    </PrimaryButton>
                                </div>

                                <div className="text-center text-sm text-gray-600">
                                    Belum punya akun?{' '}
                                    <Link
                                        href={route('register')}
                                        className="font-medium text-blue-600 hover:text-blue-500"
                                    >
                                        Daftar sekarang
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
