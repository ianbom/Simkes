import { User } from '@/types/user/interface';
import {
    Activity,
    Calendar,
    Camera,
    FileText,
    Save,
    User as UserIcon,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface ProfilePageProps {
    user: User;
}

export default function ProfilePage({ user }: ProfilePageProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Form state dengan dummy data
    const [formData, setFormData] = useState({
        name: user?.name || 'Ahmad Wijaya',
        email: user?.email || 'ahmad.wijaya@email.com',
        nik: user?.nik || '3578012345670001',
        tanggal_lahir: user?.tanggal_lahir || '1990-05-15',
        kelamin: user?.kelamin || 'L',
        no_telp: user?.no_telp || '081234567890',
        alamat: user?.alamat || 'Jl. Raya Darmo No. 123, Surabaya',
        provinsi: 'Jawa Timur',
        kota: 'Surabaya',
        kecamatan: 'Wonokromo',
        faskes: 'Puskesmas Wonokromo',
    });

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        setIsEditing(true);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
                setIsEditing(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission with Inertia.js
        // Inertia.post(route('profile.update'), formData);
        console.log('Form submitted:', formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setPreviewImage(null);
        // Reset form data to original user data
    };

    // Dummy medical history data
    const medicalHistory = [
        {
            id: 1,
            date: '2024-10-05',
            type: 'Konsultasi',
            doctor: 'dr. Sarah Wijaya, Sp.A',
            diagnosis: 'Pemeriksaan Rutin Kehamilan',
            notes: 'Kondisi ibu dan janin sehat, tidak ada keluhan berarti',
            faskes: 'Puskesmas Wonokromo',
        },
        {
            id: 2,
            date: '2024-09-15',
            type: 'Imunisasi',
            doctor: 'dr. Ahmad Ridwan',
            diagnosis: 'Imunisasi Tetanus',
            notes: 'Imunisasi berjalan lancar, tidak ada efek samping',
            faskes: 'Puskesmas Wonokromo',
        },
        {
            id: 3,
            date: '2024-08-20',
            type: 'Pemeriksaan Lab',
            doctor: 'dr. Lisa Kartika',
            diagnosis: 'Cek Darah Lengkap',
            notes: 'Hasil lab normal, hemoglobin 12.5 g/dL',
            faskes: 'Puskesmas Gubeng',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-8">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 text-white">
                        <h1 className="text-3xl font-bold">Profil Saya</h1>
                        <p className="mt-2 text-blue-100">
                            Kelola informasi profil Anda
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="p-6">
                            {/* Profile Picture Section */}
                            <div className="mb-8 flex flex-col items-center">
                                <div className="relative">
                                    <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-lg">
                                        {previewImage ||
                                        user?.profile_pic_url ? (
                                            <img
                                                src={
                                                    previewImage ||
                                                    user?.profile_pic_url
                                                }
                                                alt="Profile"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-blue-100 text-4xl font-bold text-blue-600">
                                                {formData.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <label
                                        htmlFor="profile-upload"
                                        className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-500 p-2 text-white shadow-lg transition-colors hover:bg-blue-600"
                                    >
                                        <Camera className="h-5 w-5" />
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
                                </p>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Nama Lengkap */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Nama Lengkap{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* NIK */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        NIK{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nik"
                                        value={formData.nik}
                                        onChange={handleInputChange}
                                        maxLength={16}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Email{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Tanggal Lahir */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Tanggal Lahir{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggal_lahir"
                                        value={formData.tanggal_lahir}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Jenis Kelamin */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Jenis Kelamin{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="kelamin"
                                        value={formData.kelamin}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                </div>

                                {/* No Telp */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        No. Telepon{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="no_telp"
                                        value={formData.no_telp}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Faskes */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Faskes Terdaftar
                                    </label>
                                    <input
                                        type="text"
                                        name="faskes"
                                        value={formData.faskes}
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2"
                                        disabled
                                    />
                                </div>

                                {/* Provinsi */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Provinsi
                                    </label>
                                    <select
                                        name="provinsi"
                                        value={formData.provinsi}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Jawa Timur">
                                            Jawa Timur
                                        </option>
                                        <option value="Jawa Tengah">
                                            Jawa Tengah
                                        </option>
                                        <option value="Jawa Barat">
                                            Jawa Barat
                                        </option>
                                    </select>
                                </div>

                                {/* Kota */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Kota/Kabupaten
                                    </label>
                                    <select
                                        name="kota"
                                        value={formData.kota}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Surabaya">
                                            Surabaya
                                        </option>
                                        <option value="Sidoarjo">
                                            Sidoarjo
                                        </option>
                                        <option value="Gresik">Gresik</option>
                                    </select>
                                </div>

                                {/* Kecamatan */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Kecamatan
                                    </label>
                                    <select
                                        name="kecamatan"
                                        value={formData.kecamatan}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Wonokromo">
                                            Wonokromo
                                        </option>
                                        <option value="Gubeng">Gubeng</option>
                                        <option value="Tegalsari">
                                            Tegalsari
                                        </option>
                                    </select>
                                </div>

                                {/* Alamat */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Alamat Lengkap
                                    </label>
                                    <textarea
                                        name="alamat"
                                        value={formData.alamat}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="Masukkan alamat lengkap Anda"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {isEditing && (
                                <div className="mt-8 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                                    >
                                        <X className="h-4 w-4" />
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
                                    >
                                        <Save className="h-4 w-4" />
                                        Simpan Perubahan
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* Medical History Card */}
                <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-6 text-white">
                        <div className="flex items-center gap-3">
                            <Activity className="h-8 w-8" />
                            <div>
                                <h2 className="text-2xl font-bold">
                                    Riwayat Medis
                                </h2>
                                <p className="mt-1 text-green-100">
                                    Catatan kunjungan dan pemeriksaan kesehatan
                                    Anda
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {medicalHistory.length > 0 ? (
                            <div className="space-y-4">
                                {medicalHistory.map((record) => (
                                    <div
                                        key={record.id}
                                        className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
                                    >
                                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                            {/* Left Side - Main Info */}
                                            <div className="flex-1 space-y-3">
                                                {/* Type Badge & Date */}
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                                        {record.type}
                                                    </span>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Calendar className="h-4 w-4" />
                                                        {new Date(
                                                            record.date,
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                            {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric',
                                                            },
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Doctor */}
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <UserIcon className="h-4 w-4 text-gray-400" />
                                                    <span className="font-medium">
                                                        {record.doctor}
                                                    </span>
                                                </div>

                                                {/* Diagnosis */}
                                                <div>
                                                    <h4 className="mb-1 font-semibold text-gray-900">
                                                        {record.diagnosis}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        {record.notes}
                                                    </p>
                                                </div>

                                                {/* Faskes */}
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <FileText className="h-4 w-4" />
                                                    <span>{record.faskes}</span>
                                                </div>
                                            </div>

                                            {/* Right Side - Action Button */}
                                            <div className="flex items-start">
                                                <button className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100">
                                                    Lihat Detail
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                    <FileText className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    Belum Ada Riwayat Medis
                                </h3>
                                <p className="text-gray-600">
                                    Riwayat kunjungan dan pemeriksaan Anda akan
                                    muncul di sini
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
