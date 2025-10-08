import { VideoCallInterface } from "@/Components/video-call-interface";
import { Head } from "@inertiajs/react";
import { Video, Clock, User, MapPin, Calendar, Phone } from "lucide-react";
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
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Head title="Video Konsultasi" />

      <div className="min-h-screen bg-gray-50">
        {/* Header Info */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Video className="w-6 h-6 text-blue-600" />
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
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(consultation.waktu_mulai_dijadwalkan)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>
                    {formatTime(consultation.waktu_mulai_dijadwalkan)} (
                    {consultation.durasi_menit} menit)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Informasi Petugas
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Nama Petugas</p>
                    <p className="font-medium text-gray-900">
                      {consultation.petugas.name}
                    </p>
                  </div>
                  {consultation.petugas.no_telp && (
                    <div>
                      <p className="text-sm text-gray-500">No. Telepon</p>
                      <p className="font-medium text-gray-900 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {consultation.petugas.no_telp}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Faskes Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Fasilitas Kesehatan
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Nama Faskes</p>
                    <p className="font-medium text-gray-900">
                      {consultation.petugas.faskes.nama}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tipe</p>
                    <p className="font-medium text-gray-900">
                      {consultation.petugas.faskes.tipe_faskes}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Alamat</p>
                    <p className="text-gray-900">
                      {consultation.petugas.faskes.alamat}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-900">
                    Status Sesi
                  </span>
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
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
