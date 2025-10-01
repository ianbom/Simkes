import { Navigation } from '@/components/partials/Navigation';
import { SessionSummaryForm } from '@/Components/session-summary-form';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { VideoCallInterface } from '@/Components/video-call-interface';
import { router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Phone, User, Video, FileText } from 'lucide-react';
import { useState } from 'react';

interface SesiKonsultasi {
    id: number;
    pasien_user_id: number;
    anak_id: number | null;
    kehamilan_id: number | null;
    petugas_faskes_id: number;
    jadwal_id: number;
    waktu_mulai_dijadwalkan: string;
    durasi_menit: number;
    link_video_conference: string;
    status_sesi: string;
    ringkasan_konsultasi: string | null;
    rekomendasi_petugas: string | null;
    room_name: string;
    petugas: {
        id: number;
        name: string;
        email: string;
        nik: string | null;
        tanggal_lahir: string | null;
        kelamin: string | null;
        no_telp: string | null;
        role: string;
    };
    pasien: {
        id: number;
        name: string;
        email: string;
        nik: string;
        tanggal_lahir: string;
        kelamin: string;
        no_telp: string;
        alamat: string;
    };
    anak: {
        id: number;
        nama: string;
        kelamin: string;
        status_hidup: string;
        tanggal_lahir: string;
        berat_lahir_gram: number;
        panjang_lahir_cm: string;
        urutan_kelahiran: number;
    } | null;
    jadwal: {
        id: number;
        tanggal: string;
        jam_mulai: string;
        jam_selesai: string;
        status_ketersediaan: string;
    };
}

interface Props {
    sesiKonsultasi: SesiKonsultasi;
    roomName: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}

export default function ConsultationPageRoute({ sesiKonsultasi, roomName, user }: Props) {
    const [showSummaryForm, setShowSummaryForm] = useState(false);
    const [notes, setNotes] = useState('');

    // Calculate age from date of birth
    const calculateAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    // Format date and time
    const formatDateTime = (dateTimeString: string) => {
        const date = new Date(dateTimeString);
        return {
            date: date.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }),
            time: date.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    };

    const handleCompleteSummary = (summaryData: any) => {
        router.post(`/consultations/${sesiKonsultasi.id}/complete`, summaryData);
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'selesai':
            case 'completed':
                return 'default';
            case 'berlangsung':
            case 'in-progress':
                return 'secondary';
            case 'dikonfirmasi':
            case 'scheduled':
                return 'outline';
            default:
                return 'outline';
        }
    };

    const getStatusLabel = (status: string) => {
        const statusMap: Record<string, string> = {
            'Dikonfirmasi': 'Terjadwal',
            'Berlangsung': 'Sedang Berlangsung',
            'Selesai': 'Selesai',
            'Dibatalkan': 'Dibatalkan'
        };
        return statusMap[status] || status;
    };

    const scheduledDateTime = formatDateTime(sesiKonsultasi.waktu_mulai_dijadwalkan);
    const patientAge = calculateAge(sesiKonsultasi.pasien.tanggal_lahir);
    const genderLabel = sesiKonsultasi.pasien.kelamin === 'L' ? 'Laki-laki' : 'Perempuan';

    // Get patient info - prioritize child info if exists
    const patientName = sesiKonsultasi.anak ? sesiKonsultasi.anak.nama : sesiKonsultasi.pasien.name;
    const patientGender = sesiKonsultasi.anak
        ? (sesiKonsultasi.anak.kelamin === 'L' ? 'Laki-laki' : 'Perempuan')
        : genderLabel;
    const patientAge2 = sesiKonsultasi.anak
        ? calculateAge(sesiKonsultasi.anak.tanggal_lahir)
        : patientAge;

    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
            <Navigation />

            <div className="pb-16 lg:pb-0 lg:pl-72">
                <div className="px-4 py-8 sm:px-6 lg:px-8">
                    {/* Enhanced Header */}
                    <div className="mb-8">
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => router.visit('/consultations')}
                                    className="mb-3 -ml-2"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Kembali ke Dashboard
                                </Button>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                                        <Video className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="font-heading text-foreground text-2xl font-bold sm:text-3xl">
                                            Ruang Konsultasi
                                        </h1>
                                        <p className="text-muted-foreground text-sm">
                                            Sesi ID: #{sesiKonsultasi.id}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge
                                    variant={getStatusColor(sesiKonsultasi.status_sesi)}
                                    className="px-4 py-2 text-sm"
                                >
                                    {getStatusLabel(sesiKonsultasi.status_sesi)}
                                </Badge>
                            </div>
                        </div>

                        {/* Schedule Info Bar */}
                        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
                            <CardContent className="p-4">
                                <div className="flex flex-wrap items-center gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-blue-600" />
                                        <span className="font-medium">{scheduledDateTime.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-blue-600" />
                                        <span className="font-medium">{scheduledDateTime.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-purple-600" />
                                        <span className="font-medium">{sesiKonsultasi.durasi_menit} menit</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Patient Information Card */}
                    <Card className="mb-6 border-t-4 border-t-blue-500 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                Informasi Pasien
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-2xl font-bold text-white shadow-lg">
                                        {patientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </div>
                                </div>

                                {/* Patient Details */}
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <h3 className="font-heading text-foreground text-xl font-bold">
                                            {patientName}
                                        </h3>
                                        {sesiKonsultasi.anak && (
                                            <p className="text-muted-foreground text-sm">
                                                Orang Tua: {sesiKonsultasi.pasien.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                <span className="text-muted-foreground">Usia:</span>{' '}
                                                <span className="font-medium">{patientAge2} tahun</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                <span className="text-muted-foreground">Jenis Kelamin:</span>{' '}
                                                <span className="font-medium">{patientGender}</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                <span className="text-muted-foreground">NIK:</span>{' '}
                                                <span className="font-medium">{sesiKonsultasi.pasien.nik}</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                <span className="text-muted-foreground">Telepon:</span>{' '}
                                                <span className="font-medium">{sesiKonsultasi.pasien.no_telp}</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                                        <h4 className="text-foreground mb-2 flex items-center gap-2 font-semibold text-sm">
                                            <FileText className="h-4 w-4 text-amber-600" />
                                            Alamat
                                        </h4>
                                        <p className="text-muted-foreground text-sm">
                                            {sesiKonsultasi.pasien.alamat}
                                        </p>
                                    </div>

                                    {sesiKonsultasi.anak && (
                                        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                                            <h4 className="text-foreground mb-2 flex items-center gap-2 font-semibold text-sm">
                                                <FileText className="h-4 w-4 text-blue-600" />
                                                Informasi Kelahiran
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <span className="text-muted-foreground">Berat Lahir:</span>{' '}
                                                    <span className="font-medium">{sesiKonsultasi.anak.berat_lahir_gram}g</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">Panjang Lahir:</span>{' '}
                                                    <span className="font-medium">{sesiKonsultasi.anak.panjang_lahir_cm} cm</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">Anak ke:</span>{' '}
                                                    <span className="font-medium">{sesiKonsultasi.anak.urutan_kelahiran}</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">Status:</span>{' '}
                                                    <span className="font-medium">{sesiKonsultasi.anak.status_hidup}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main Content Area */}
                    {!showSummaryForm ? (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* Video Call Interface */}
                            <div className="lg:col-span-2">
                                    <VideoCallInterface
                                        consultation={sesiKonsultasi}
                                        roomName={roomName}
                                        user={user}
                                    />
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Session Status */}
                                <Card className="shadow-lg">
                                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Clock className="h-5 w-5 text-green-600" />
                                            Status Sesi
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground text-sm">Status</span>
                                                <Badge variant={getStatusColor(sesiKonsultasi.status_sesi)}>
                                                    {getStatusLabel(sesiKonsultasi.status_sesi)}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground text-sm">Dijadwalkan</span>
                                                <span className="text-sm font-medium">{scheduledDateTime.time}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground text-sm">Durasi</span>
                                                <span className="text-sm font-medium">{sesiKonsultasi.durasi_menit} menit</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground text-sm">Petugas</span>
                                                <span className="text-sm font-medium">{sesiKonsultasi.petugas.name}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Notes */}
                                <Card className="shadow-lg">
                                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <FileText className="h-5 w-5 text-purple-600" />
                                            Catatan Cepat
                                        </CardTitle>
                                        <CardDescription>
                                            Catat hal penting selama konsultasi
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            className="border-border focus:ring-ring h-36 w-full resize-none rounded-lg border p-3 text-sm focus:outline-none focus:ring-2"
                                            placeholder="Tulis catatan di sini..."
                                        />
                                    </CardContent>
                                </Card>

                                {/* Previous Summary */}
                                {(sesiKonsultasi.ringkasan_konsultasi || sesiKonsultasi.rekomendasi_petugas) && (
                                    <Card className="shadow-lg">
                                        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                                            <CardTitle className="text-lg">Ringkasan Sebelumnya</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-6">
                                            {sesiKonsultasi.ringkasan_konsultasi && (
                                                <div className="mb-4">
                                                    <h4 className="mb-2 font-semibold text-sm">Ringkasan:</h4>
                                                    <p className="text-muted-foreground text-sm">
                                                        {sesiKonsultasi.ringkasan_konsultasi}
                                                    </p>
                                                </div>
                                            )}
                                            {sesiKonsultasi.rekomendasi_petugas && (
                                                <div>
                                                    <h4 className="mb-2 font-semibold text-sm">Rekomendasi:</h4>
                                                    <p className="text-muted-foreground text-sm">
                                                        {sesiKonsultasi.rekomendasi_petugas}
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Action Button */}
                                {sesiKonsultasi.status_sesi === 'Berlangsung' && (
                                    <Button
                                        onClick={() => setShowSummaryForm(true)}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    >
                                        Akhiri & Buat Ringkasan
                                    </Button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <SessionSummaryForm
                            consultation={sesiKonsultasi}
                            onComplete={handleCompleteSummary}
                            onCancel={() => setShowSummaryForm(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
