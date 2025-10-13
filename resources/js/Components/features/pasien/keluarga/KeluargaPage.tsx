import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Head, router, useForm } from '@inertiajs/react';
import { Baby, HeartPulse } from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Anak {
    id: number;
    nama: string;
    tanggal_lahir: string;
    kondisi: string;
}

interface Kehamilan {
    id: number;
    kehamilan_ke: number;
    hpht: string;
    hpl: string;
    status: string;
}

interface Keluarga {
    id: number;
    family_code: string;
    family_name: string;
    created_by: number;
    created_at: string;
    updated_at: string;
}

interface KeluargaAnggota {
    id: number;
    keluarga_id: number;
    user_id: number;
    user?: User;
    created_at: string;
}

interface PageProps {
    keluarga: Keluarga | null;
    allAnggota: KeluargaAnggota[] | null;
}

export default function KeluargaPage({ keluarga, allAnggota }: PageProps) {
    const [showModal, setShowModal] = useState(!keluarga);
    const [modalType, setModalType] = useState<'create' | 'join'>('create');

    const createForm = useForm({
        family_name: '',
    });

    const joinForm = useForm({
        family_code: '',
    });

    const handleCreateKeluarga = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(route('pasien.createKeluarga'), {
            onSuccess: () => {
                createForm.reset();
                setShowModal(false);
            },
        });
    };

    const handleJoinKeluarga = (e: React.FormEvent) => {
        e.preventDefault();
        joinForm.post(route('pasien.joinKeluarga'), {
            onSuccess: () => {
                joinForm.reset();
                setShowModal(false);
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const handleLeaveKeluarga = () => {
        if (confirm('Apakah Anda yakin ingin keluar dari keluarga ini?')) {
            router.post(route('keluarga.leave'));
        }
    };
    const goToGrafikKehamilan = (id: number) => {
        router.visit(route('pasien.view.perkembanganKehamilan', { id }));
    };

    const goToGrafikAnak = (id: number) => {
        router.visit(route('pasien.view.perkembanganAnak', { id }));
    };

    return (
        <>
            <Head title="Keluarga" />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Keluarga Saya
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Kelola informasi keluarga Anda
                        </p>
                    </div>

                    {/* Content */}
                    {keluarga ? (
                        <div className="space-y-6">
                            {/* Keluarga Info Card */}
                            <div className="rounded-lg bg-white p-6 shadow-md">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        {keluarga.family_name}
                                    </h2>
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                        {keluarga.family_code}
                                    </span>
                                </div>
                                <p className="mb-4 text-gray-600">
                                    Kode keluarga:{' '}
                                    <span className="font-mono font-semibold">
                                        {keluarga.family_code}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Dibuat pada:{' '}
                                    {new Date(
                                        keluarga.created_at,
                                    ).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>

                            {/* Anggota Keluarga */}
                            <div className="rounded-lg bg-white p-6 shadow-md">
                                <h3 className="mb-4 text-xl font-semibold text-gray-800">
                                    Anggota Keluarga ({allAnggota?.length || 0})
                                </h3>
                                <div className="space-y-3">
                                    {allAnggota && allAnggota.length > 0 ? (
                                        allAnggota.map((anggota) => (
                                            <Card
                                                key={anggota.id}
                                                className="border border-gray-100 p-5 transition hover:border-blue-200 hover:shadow-md"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-lg font-semibold text-white">
                                                            {anggota.user?.name
                                                                ?.charAt(0)
                                                                .toUpperCase() ||
                                                                'U'}
                                                        </div>
                                                        <div>
                                                            <p className="text-lg font-semibold text-gray-900">
                                                                {
                                                                    anggota.user
                                                                        ?.name
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                {
                                                                    anggota.user
                                                                        ?.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {anggota.user_id ===
                                                        keluarga.created_by && (
                                                        <span className="rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                            Pembuat
                                                        </span>
                                                    )}
                                                </div>

                                                {/* --- Data Kehamilan --- */}
                                                {anggota.user?.kehamilan &&
                                                    anggota.user.kehamilan
                                                        .length > 0 && (
                                                        <div className="mt-4 rounded-lg border border-pink-100 bg-pink-50 p-4">
                                                            <div className="mb-2 flex items-center gap-2">
                                                                <HeartPulse className="h-4 w-4 text-pink-700" />
                                                                <h4 className="text-sm font-semibold text-pink-800">
                                                                    Data
                                                                    Kehamilan (
                                                                    {
                                                                        anggota
                                                                            .user
                                                                            .kehamilan
                                                                            .length
                                                                    }
                                                                    )
                                                                </h4>
                                                            </div>
                                                            {anggota.user.kehamilan.map(
                                                                (k) => (
                                                                    <div
                                                                        key={
                                                                            k.id
                                                                        }
                                                                        className="flex items-center justify-between py-1"
                                                                    >
                                                                        <p className="text-sm text-gray-700">
                                                                            Kehamilan
                                                                            ke-
                                                                            {
                                                                                k.kehamilan_ke
                                                                            }{' '}
                                                                            •
                                                                            Status:{' '}
                                                                            <span className="font-medium">
                                                                                {
                                                                                    k.status
                                                                                }
                                                                            </span>
                                                                        </p>
                                                                        <Button
                                                                            size="sm"
                                                                            onClick={() =>
                                                                                goToGrafikKehamilan(
                                                                                    k.id,
                                                                                )
                                                                            }
                                                                            className="bg-blue-600 bg-pink-600 text-xs text-white hover:bg-blue-700 hover:bg-pink-700"
                                                                        >
                                                                            Lihat
                                                                            Grafik
                                                                            Kehamilan
                                                                        </Button>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}

                                                {/* --- Data Anak --- */}
                                                {anggota.user?.anak &&
                                                    anggota.user.anak.length >
                                                        0 && (
                                                        <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4">
                                                            <div className="mb-2 flex items-center gap-2">
                                                                <Baby className="h-4 w-4 text-blue-700" />
                                                                <h4 className="text-sm font-semibold text-blue-800">
                                                                    Data Anak (
                                                                    {
                                                                        anggota
                                                                            .user
                                                                            .anak
                                                                            .length
                                                                    }
                                                                    )
                                                                </h4>
                                                            </div>
                                                            {anggota.user.anak.map(
                                                                (anak) => (
                                                                    <div
                                                                        key={
                                                                            anak.id
                                                                        }
                                                                        className="flex items-center justify-between py-1"
                                                                    >
                                                                        <p className="text-sm text-gray-700">
                                                                            {
                                                                                anak.nama
                                                                            }{' '}
                                                                            •
                                                                            Lahir:{' '}
                                                                            {
                                                                                anak.tanggal_lahir
                                                                            }{' '}
                                                                            (
                                                                            <span className="text-gray-500">
                                                                                {
                                                                                    anak.kondisi
                                                                                }
                                                                            </span>
                                                                            )
                                                                        </p>
                                                                        <Button
                                                                            size="sm"
                                                                            onClick={() =>
                                                                                goToGrafikAnak(
                                                                                    anak.id,
                                                                                )
                                                                            }
                                                                            className="bg-blue-600 text-xs text-white hover:bg-blue-700"
                                                                        >
                                                                            Lihat
                                                                            Grafik
                                                                            Anak
                                                                        </Button>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}
                                            </Card>
                                        ))
                                    ) : (
                                        <p className="py-4 text-center text-gray-500">
                                            Belum ada anggota keluarga yang
                                            terdaftar.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleLeaveKeluarga}
                                    className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                                >
                                    Keluar dari Keluarga
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-lg bg-white p-8 text-center shadow-md">
                            <p className="mb-6 text-gray-600">
                                Anda belum tergabung dalam keluarga manapun
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={() => {
                                        setModalType('create');
                                        setShowModal(true);
                                    }}
                                    className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                                >
                                    Buat Keluarga
                                </button>
                                <button
                                    onClick={() => {
                                        setModalType('join');
                                        setShowModal(true);
                                    }}
                                    className="rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700"
                                >
                                    Gabung Keluarga
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {modalType === 'create'
                                    ? 'Buat Keluarga'
                                    : 'Gabung Keluarga'}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {modalType === 'create' ? (
                            <form onSubmit={handleCreateKeluarga}>
                                <div className="mb-4">
                                    <label className="mb-2 block font-medium text-gray-700">
                                        Nama Keluarga
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.data.family_name}
                                        onChange={(e) =>
                                            createForm.setData(
                                                'family_name',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="Contoh: Keluarga Budi"
                                        required
                                    />
                                    {createForm.errors.family_name && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {createForm.errors.family_name}
                                        </p>
                                    )}
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createForm.processing}
                                        className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {createForm.processing
                                            ? 'Memproses...'
                                            : 'Buat'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleJoinKeluarga}>
                                <div className="mb-4">
                                    <label className="mb-2 block font-medium text-gray-700">
                                        Kode Keluarga
                                    </label>
                                    <input
                                        type="text"
                                        value={joinForm.data.family_code}
                                        onChange={(e) =>
                                            joinForm.setData(
                                                'family_code',
                                                e.target.value.toUpperCase(),
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono focus:border-transparent focus:ring-2 focus:ring-green-500"
                                        placeholder="FAM-XXXXXX"
                                        required
                                    />
                                    {joinForm.errors.family_code && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {joinForm.errors.family_code}
                                        </p>
                                    )}
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={joinForm.processing}
                                        className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {joinForm.processing
                                            ? 'Memproses...'
                                            : 'Gabung'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {!keluarga && (
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() =>
                                        setModalType(
                                            modalType === 'create'
                                                ? 'join'
                                                : 'create',
                                        )
                                    }
                                    className="text-sm text-blue-600 hover:text-blue-700"
                                >
                                    {modalType === 'create'
                                        ? 'Sudah punya kode? Gabung keluarga'
                                        : 'Belum punya keluarga? Buat keluarga baru'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
