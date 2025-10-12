import { User } from '@/types/user/interface';
import { useForm } from '@inertiajs/react';
import { Camera, CheckCircle, Heart, Save, X } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

interface Provinsi {
    id: number;
    nama: string;
}

interface RiwayatMedis {
    golongan_darah?: string | null;
    rhesus?: string | null;
    jumlah_keguguran?: number | null;
    riwayat_alergi?: string | null;
}

interface Kota {
    id: number;
    nama: string;
    provinsi_id: number;
}

interface Kecamatan {
    id: number;
    nama: string;
    kota_id: number;
}

interface ProfilePageProps {
    user: User;
    provinsi: Provinsi[];
    kota: Kota[];
    kecamatan: Kecamatan[];
    flash?: {
        success?: string;
        error?: string;
    };
    riwayatMedis?: RiwayatMedis | null;
}

export default function ProfilePage({
    user,
    provinsi,
    kota,
    kecamatan,
    flash,
    riwayatMedis,
}: ProfilePageProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [filteredKota, setFilteredKota] = useState<Kota[]>([]);
    const [filteredKecamatan, setFilteredKecamatan] = useState<Kecamatan[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, post, processing, errors, isDirty, reset } = useForm(
        {
            name: user?.name || '',
            email: user?.email || '',
            nik: user?.nik || '',
            tanggal_lahir: user?.tanggal_lahir || '',
            kelamin: user?.kelamin || 'L',
            no_telp: user?.no_telp || '',
            alamat: user?.alamat || '',
            provinsi_id: user?.provinsi_id?.toString() || '',
            kota_id: user?.kota_id?.toString() || '',
            kecamatan_id: user?.kecamatan_id?.toString() || '',
            faskes_id: user?.faskes_id?.toString() || '',
            profile_pic_url: null as File | null,
        },
    );

    const {
        data: medisData,
        setData: setMedisData,
        post: postMedis,
        processing: processingMedis,
        errors: errorsMedis,
        isDirty: isDirtyMedis,
        reset: resetMedis,
    } = useForm({
        golongan_darah: riwayatMedis?.golongan_darah || '',
        rhesus: riwayatMedis?.rhesus || '',
        jumlah_keguguran: riwayatMedis?.jumlah_keguguran?.toString() || '0',
        riwayat_alergi: riwayatMedis?.riwayat_alergi || '',
    });

    // Filter kota berdasarkan provinsi
    useEffect(() => {
        if (data.provinsi_id) {
            const filtered = kota.filter(
                (k) => k.provinsi_id.toString() === data.provinsi_id,
            );
            setFilteredKota(filtered);

            // Reset kota dan kecamatan jika provinsi berubah
            if (!filtered.find((k) => k.id.toString() === data.kota_id)) {
                setData((prev) => ({
                    ...prev,
                    kota_id: '',
                    kecamatan_id: '',
                }));
            }
        } else {
            setFilteredKota([]);
        }
    }, [data.provinsi_id]);

    // Filter kecamatan berdasarkan kota
    useEffect(() => {
        if (data.kota_id) {
            const filtered = kecamatan.filter(
                (kec) => kec.kota_id.toString() === data.kota_id,
            );
            setFilteredKecamatan(filtered);

            // Reset kecamatan jika kota berubah
            if (!filtered.find((k) => k.id.toString() === data.kecamatan_id)) {
                setData('kecamatan_id', '');
            }
        } else {
            setFilteredKecamatan([]);
        }
    }, [data.kota_id]);

    // Show success message
    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('Ukuran file maksimal 2MB');
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('File harus berupa gambar');
                return;
            }

            setData('profile_pic_url', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('pasien.updateProfile'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPreviewImage(null);
                reset('profile_pic_url');
            },
            onError: (errors) => {
                console.error('Update profile errors:', errors);
            },
        });
    };

    const handleSubmitRiwayatMedis: FormEventHandler = (e) => {
        e.preventDefault();
        postMedis(route('pasien.updateRiwayatMedis'), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Riwayat medis berhasil diperbarui');
            },
            onError: (errors) => {
                console.error('Update riwayat medis errors:', errors);
            },
        });
    };

    const handleCancel = () => {
        setPreviewImage(null);
        // Reset form data to original user data
        setData({
            name: user?.name || '',
            email: user?.email || '',
            nik: user?.nik || '',
            tanggal_lahir: user?.tanggal_lahir || '',
            kelamin: user?.kelamin || 'L',
            no_telp: user?.no_telp || '',
            alamat: user?.alamat || '',
            provinsi_id: user?.provinsi_id?.toString() || '',
            kota_id: user?.kota_id?.toString() || '',
            kecamatan_id: user?.kecamatan_id?.toString() || '',
            faskes_id: user?.faskes_id?.toString() || '',
            profile_pic_url: null,
        });
    };

    const handleCancelRiwayatMedis = () => {
        resetMedis();
    };

    return (
        <div className="min-h-screen py-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
            <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Success Message */}
                {showSuccess && flash?.success && (
                    <div className="flex items-center gap-3 p-4 mb-6 border border-green-200 rounded-lg bg-green-50">
                        <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-600" />
                        <p className="text-sm text-green-800">
                            {flash.success}
                        </p>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="ml-auto text-green-600 hover:text-green-800"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Error Message */}
                {flash?.error && (
                    <div className="flex items-center gap-3 p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
                        <X className="flex-shrink-0 w-5 h-5 text-red-600" />
                        <p className="text-sm text-red-800">{flash.error}</p>
                    </div>
                )}

                <div className="overflow-hidden bg-white shadow-sm rounded-2xl">
                    {/* Header */}
                    <div className="px-6 py-8 text-white bg-gradient-to-r from-blue-500 to-blue-600">
                        <h1 className="text-3xl font-bold">Profil Saya</h1>
                        <p className="mt-2 text-blue-100">
                            Kelola informasi profil Anda
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="p-6">
                            {/* Profile Picture Section */}
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative">
                                    <div className="w-32 h-32 overflow-hidden bg-gray-200 border-4 border-white rounded-full shadow-lg">
                                        {previewImage ||
                                        user?.profile_pic_url ? (
                                            <img
                                                src={
                                                    previewImage ||
                                                    `/storage/${user?.profile_pic_url}`
                                                }
                                                alt="Profile"
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center w-full h-full text-4xl font-bold text-blue-600 bg-blue-100">
                                                {data.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <label
                                        htmlFor="profile-upload"
                                        className="absolute bottom-0 right-0 p-2 text-white transition-colors bg-blue-500 rounded-full shadow-lg cursor-pointer hover:bg-blue-600"
                                    >
                                        <Camera className="w-5 h-5" />
                                        <input
                                            id="profile-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                                <p className="mt-3 text-sm text-gray-500">
                                    Klik ikon kamera untuk mengubah foto profil
                                    (Max 2MB)
                                </p>
                                {errors.profile_pic_url && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.profile_pic_url}
                                    </p>
                                )}
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Nama Lengkap */}
                                <div className="md:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Nama Lengkap{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* NIK */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        NIK{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nik"
                                        value={data.nik}
                                        onChange={(e) =>
                                            setData('nik', e.target.value)
                                        }
                                        maxLength={16}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.nik && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.nik}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Email{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Tanggal Lahir */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Tanggal Lahir{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggal_lahir"
                                        value={data.tanggal_lahir}
                                        onChange={(e) =>
                                            setData(
                                                'tanggal_lahir',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.tanggal_lahir && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.tanggal_lahir}
                                        </p>
                                    )}
                                </div>

                                {/* Jenis Kelamin */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Jenis Kelamin{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="kelamin"
                                        value={data.kelamin}
                                        onChange={(e) =>
                                            setData('kelamin', e.target.value)
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                    {errors.kelamin && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.kelamin}
                                        </p>
                                    )}
                                </div>

                                {/* No Telp */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        No. Telepon{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="no_telp"
                                        value={data.no_telp}
                                        onChange={(e) =>
                                            setData('no_telp', e.target.value)
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.no_telp && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.no_telp}
                                        </p>
                                    )}
                                </div>

                                {/* Faskes */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Faskes Terdaftar
                                    </label>
                                    <input
                                        type="text"
                                        value={user?.faskes?.nama_faskes || '-'}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        disabled
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Hubungi admin untuk mengubah faskes
                                    </p>
                                </div>

                                {/* Provinsi */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Provinsi{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="provinsi_id"
                                        value={data.provinsi_id}
                                        onChange={(e) =>
                                            setData(
                                                'provinsi_id',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Pilih Provinsi</option>
                                        {provinsi.map((prov) => (
                                            <option
                                                key={prov.id}
                                                value={prov.id}
                                            >
                                                {prov.nama}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.provinsi_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.provinsi_id}
                                        </p>
                                    )}
                                </div>

                                {/* Kota */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Kota/Kabupaten{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="kota_id"
                                        value={data.kota_id}
                                        onChange={(e) =>
                                            setData('kota_id', e.target.value)
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        disabled={!data.provinsi_id}
                                        required
                                    >
                                        <option value="">Pilih Kota</option>
                                        {filteredKota.map((k) => (
                                            <option key={k.id} value={k.id}>
                                                {k.nama}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kota_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.kota_id}
                                        </p>
                                    )}
                                </div>

                                {/* Kecamatan */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Kecamatan{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="kecamatan_id"
                                        value={data.kecamatan_id}
                                        onChange={(e) =>
                                            setData(
                                                'kecamatan_id',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        disabled={!data.kota_id}
                                        required
                                    >
                                        <option value="">
                                            Pilih Kecamatan
                                        </option>
                                        {filteredKecamatan.map((kec) => (
                                            <option key={kec.id} value={kec.id}>
                                                {kec.nama}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kecamatan_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.kecamatan_id}
                                        </p>
                                    )}
                                </div>

                                {/* Alamat */}
                                <div className="md:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Alamat Lengkap
                                    </label>
                                    <textarea
                                        name="alamat"
                                        value={data.alamat}
                                        onChange={(e) =>
                                            setData('alamat', e.target.value)
                                        }
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="Masukkan alamat lengkap Anda"
                                    />
                                    {errors.alamat && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.alamat}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {isDirty && (
                                <div className="flex justify-end gap-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={processing}
                                        className="flex items-center gap-2 px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <X className="w-4 h-4" />
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex items-center gap-2 px-6 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        {processing
                                            ? 'Menyimpan...'
                                            : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
                    <div className="px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500">
                        <div className="flex items-center gap-3">
                            <Heart className="w-6 h-6 text-white" />
                            <h2 className="text-xl font-bold text-white">
                                Riwayat Medis
                            </h2>
                        </div>
                    </div>

                    <form onSubmit={handleSubmitRiwayatMedis} className="p-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Golongan Darah */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Golongan Darah
                                </label>
                                <select
                                    value={medisData.golongan_darah}
                                    onChange={(e) =>
                                        setMedisData(
                                            'golongan_darah',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="">
                                        Pilih Golongan Darah
                                    </option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="AB">AB</option>
                                    <option value="O">O</option>
                                </select>
                                {errorsMedis.golongan_darah && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errorsMedis.golongan_darah}
                                    </p>
                                )}
                            </div>

                            {/* Rhesus */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Rhesus
                                </label>
                                <select
                                    value={medisData.rhesus}
                                    onChange={(e) =>
                                        setMedisData('rhesus', e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="">Pilih Rhesus</option>
                                    <option value="+">Positif (+)</option>
                                    <option value="-">Negatif (-)</option>
                                </select>
                                {errorsMedis.rhesus && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errorsMedis.rhesus}
                                    </p>
                                )}
                            </div>

                            {/* Jumlah Keguguran */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Jumlah Keguguran
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={medisData.jumlah_keguguran}
                                    onChange={(e) =>
                                        setMedisData(
                                            'jumlah_keguguran',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-red-500"
                                    placeholder="0"
                                />
                                {errorsMedis.jumlah_keguguran && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errorsMedis.jumlah_keguguran}
                                    </p>
                                )}
                            </div>

                            {/* Riwayat Alergi */}
                            <div className="md:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Riwayat Alergi
                                </label>
                                <textarea
                                    value={medisData.riwayat_alergi}
                                    onChange={(e) =>
                                        setMedisData(
                                            'riwayat_alergi',
                                            e.target.value,
                                        )
                                    }
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-red-500"
                                    placeholder="Tuliskan riwayat alergi jika ada..."
                                />
                                {errorsMedis.riwayat_alergi && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errorsMedis.riwayat_alergi}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={handleCancelRiwayatMedis}
                                disabled={processingMedis || !isDirtyMedis}
                                className="px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <div className="flex items-center gap-2">
                                    <X className="w-4 h-4" />
                                    <span>Batal</span>
                                </div>
                            </button>
                            <button
                                type="submit"
                                disabled={processingMedis || !isDirtyMedis}
                                className="px-6 py-2 text-white transition-all rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <div className="flex items-center gap-2">
                                    <Save className="w-4 h-4" />
                                    <span>
                                        {processingMedis
                                            ? 'Menyimpan...'
                                            : 'Simpan Riwayat Medis'}
                                    </span>
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
