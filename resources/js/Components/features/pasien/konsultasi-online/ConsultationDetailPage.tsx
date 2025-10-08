import { VideoCallInterface } from '@/Components/video-call-interface';
import { Head } from '@inertiajs/react';
import { Calendar, Clock, MapPin, Phone, User, Video } from 'lucide-react';
// pastikan path sesuai struktur kamu

interface Faskes {
    id: number;
    nama: string;
    tipe_faskes: string;
    alamat: string;
    profile_pic_url: string | null;
}

interface Petugas {
    id: number;
    name: string;
    email: string;
    no_telp: string | null;
    faskes: Faskes;
}

interface Pasien {
    id: number;
    name: string;
    email: string;
}

interface Consultation {
    id: number;
    waktu_mulai_dijadwalkan: string;
    durasi_menit: number;
    link_video_conference: string;
    status_sesi: string;
    room_name: string;
    petugas: Petugas;
    pasien: Pasien;
}

interface Props {
    consultation: Consultation;
}

export default function ConsultationDetailPageRoute({ consultation }: Props) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <>
            <Head title="Video Konsultasi" />

            <div className="min-h-screen bg-gray-50">
                {/* Header Info */}
                <div className="border-b bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-blue-100 p-3">
                                    <Video className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-gray-900">
                                        Video Konsultasi
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        dengan {consultation.petugas.name}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {formatDate(
                                            consultation.waktu_mulai_dijadwalkan,
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        {formatTime(
                                            consultation.waktu_mulai_dijadwalkan,
                                        )}{' '}
                                        ({consultation.durasi_menit} menit)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* 🔹 Ganti bagian video dengan VideoCallInterface */}
                        <div className="lg:col-span-2">
                            <VideoCallInterface
                                consultation={{
                                    id: consultation.id.toString(),
                                    patient: {
                                        name: consultation.pasien.name,
                                        photo: undefined,
                                    },
                                    status: consultation.status_sesi,
                                }}
                                roomName={consultation.room_name}
                                user={{
                                    id: consultation.pasien.id,
                                    name: consultation.pasien.name,
                                    email: consultation.pasien.email,
                                }}
                            />
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-6">
                            {/* Petugas Info */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                                    <User className="h-5 w-5 text-blue-600" />
                                    Informasi Petugas
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Nama Petugas
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {consultation.petugas.name}
                                        </p>
                                    </div>
                                    {consultation.petugas.no_telp && (
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                No. Telepon
                                            </p>
                                            <p className="flex items-center gap-2 font-medium text-gray-900">
                                                <Phone className="h-4 w-4" />
                                                {consultation.petugas.no_telp}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Faskes Info */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                                    <MapPin className="h-5 w-5 text-blue-600" />
                                    Fasilitas Kesehatan
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Nama Faskes
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {consultation.petugas.faskes.nama}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Tipe
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {
                                                consultation.petugas.faskes
                                                    .tipe_faskes
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Alamat
                                        </p>
                                        <p className="text-gray-900">
                                            {consultation.petugas.faskes.alamat}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-blue-900">
                                        Status Sesi
                                    </span>
                                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                                        {consultation.status_sesi}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
