import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Card } from '@/Components/ui/card';
import { Baby, HeartPulse } from 'lucide-react';
import { Button } from '@/Components/ui/button';

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
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Keluarga Saya</h1>
                        <p className="mt-2 text-gray-600">
                            Kelola informasi keluarga Anda
                        </p>
                    </div>

                    {/* Content */}
                    {keluarga ? (
                        <div className="space-y-6">
                            {/* Keluarga Info Card */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        {keluarga.family_name}
                                    </h2>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        {keluarga.family_code}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    Kode keluarga: <span className="font-mono font-semibold">{keluarga.family_code}</span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Dibuat pada: {new Date(keluarga.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>

                            {/* Anggota Keluarga */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                    Anggota Keluarga ({allAnggota?.length || 0})
                                </h3>
                                <div className="space-y-3">
                                  {allAnggota && allAnggota.length > 0 ? (
                allAnggota.map((anggota) => (
                  <Card
                    key={anggota.id}
                    className="p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                          {anggota.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">
                            {anggota.user?.name}
                          </p>
                          <p className="text-sm text-gray-600">{anggota.user?.email}</p>
                        </div>
                      </div>

                      {anggota.user_id === keluarga.created_by && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                          Pembuat
                        </span>
                      )}
                    </div>

                    {/* --- Data Kehamilan --- */}
                    {anggota.user?.kehamilan && anggota.user.kehamilan.length > 0 && (
                      <div className="mt-4 p-4 bg-pink-50 border border-pink-100 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <HeartPulse className="w-4 h-4 text-pink-700" />
                          <h4 className="text-sm font-semibold text-pink-800">
                            Data Kehamilan ({anggota.user.kehamilan.length})
                          </h4>
                        </div>
                        {anggota.user.kehamilan.map((k) => (
                          <div key={k.id} className="flex justify-between items-center py-1">
                            <p className="text-sm text-gray-700">
                              Kehamilan ke-{k.kehamilan_ke} • Status:{' '}
                              <span className="font-medium">{k.status}</span>
                            </p>
                            <Button
                              size="sm"
                              onClick={() => goToGrafikKehamilan(k.id)}
                              className="bg-pink-600 hover:bg-pink-700 text-white text-xs bg-blue-600 hover:bg-blue-700 text-white text-xs"
                            >
                              Lihat Grafik Kehamilan
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* --- Data Anak --- */}
                    {anggota.user?.anak && anggota.user.anak.length > 0 && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Baby className="w-4 h-4 text-blue-700" />
                          <h4 className="text-sm font-semibold text-blue-800">
                            Data Anak ({anggota.user.anak.length})
                          </h4>
                        </div>
                        {anggota.user.anak.map((anak) => (
                          <div key={anak.id} className="flex justify-between items-center py-1">
                            <p className="text-sm text-gray-700">
                              {anak.nama} • Lahir: {anak.tanggal_lahir} (
                              <span className="text-gray-500">{anak.kondisi}</span>)
                            </p>
                            <Button
                              size="sm"
                              onClick={() => goToGrafikAnak(anak.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                            >
                              Lihat Grafik Anak
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Belum ada anggota keluarga yang terdaftar.
                </p>
              )}
                                </div>
                            </div>


                            {/* Action Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleLeaveKeluarga}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Keluar dari Keluarga
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <p className="text-gray-600 mb-6">
                                Anda belum tergabung dalam keluarga manapun
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={() => {
                                        setModalType('create');
                                        setShowModal(true);
                                    }}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Buat Keluarga
                                </button>
                                <button
                                    onClick={() => {
                                        setModalType('join');
                                        setShowModal(true);
                                    }}
                                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {modalType === 'create' ? 'Buat Keluarga' : 'Gabung Keluarga'}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {modalType === 'create' ? (
                            <form onSubmit={handleCreateKeluarga}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Nama Keluarga
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.data.family_name}
                                        onChange={(e) => createForm.setData('family_name', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Contoh: Keluarga Budi"
                                        required
                                    />
                                    {createForm.errors.family_name && (
                                        <p className="text-red-500 text-sm mt-1">{createForm.errors.family_name}</p>
                                    )}
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createForm.processing}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    >
                                        {createForm.processing ? 'Memproses...' : 'Buat'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleJoinKeluarga}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Kode Keluarga
                                    </label>
                                    <input
                                        type="text"
                                        value={joinForm.data.family_code}
                                        onChange={(e) => joinForm.setData('family_code', e.target.value.toUpperCase())}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="FAM-XXXXXX"
                                        required
                                    />
                                    {joinForm.errors.family_code && (
                                        <p className="text-red-500 text-sm mt-1">{joinForm.errors.family_code}</p>
                                    )}
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={joinForm.processing}
                                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                    >
                                        {joinForm.processing ? 'Memproses...' : 'Gabung'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {!keluarga && (
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => setModalType(modalType === 'create' ? 'join' : 'create')}
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
