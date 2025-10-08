import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { RefreshCcw, SlidersHorizontal } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

interface Faskes {
    id: number;
    nama: string;
    tipe_faskes: string;
    alamat: string;
    provinsi_id: number;
    kota_id: number;
    kecamatan_id: number;
    profile_pic_url: string | null;
    deskripsi: string;
}

interface Petugas {
    id: number;
    faskes_id: number;
    name: string;
    email: string;
    role: string;
    profile_pic_url: string | null;
    faskes: Faskes;
}

interface Schedule {
    id: number;
    petugas_faskes_id: number;
    tanggal: string;
    jam_mulai: string;
    jam_selesai: string;
    status_ketersediaan: string;
    petugas: Petugas;
}

interface Props {
    schedule: Schedule[];
}

const ConsultationPage = ({ schedule }: Props) => {
    const [filterJenisFaskes, setFilterJenisFaskes] = useState('all');
    const [filterFaskes, setFilterFaskes] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const { post, processing } = useForm({});

    // 🔧 Perbaikan utama: route kirim ID jadwal di URL
    const handleBookConsultation = (item: Schedule) => {

        console.log('faskes', item.petugas_faskes_id)

        Swal.fire({
            title: 'Konfirmasi Booking',
            text: `Apakah Anda yakin ingin booking konsultasi dengan ${item.petugas.name}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Booking Sekarang',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                post(route('pasien.consultation.bookConsult', item.id), {
                    data: {
                        petugas_faskes_id: item.petugas_faskes_id,
                        jadwal_id: item.id,
                        waktu_mulai_dijadwalkan: `${item.tanggal} ${item.jam_mulai}`,
                        durasi_menit: 15,
                        status_sesi: 'Dipesan',
                    },
                    onSuccess: () => {
                        Swal.fire(
                            'Berhasil!',
                            'Konsultasi berhasil dipesan.',
                            'success'
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            'Gagal',
                            'Terjadi kesalahan saat melakukan booking.',
                            'error'
                        );
                    },
                });
            }
        });
    };

    // === Filter ===
    const uniqueFaskesTypes = Array.from(
        new Set(schedule.map((s) => s.petugas.faskes.tipe_faskes))
    );
    const uniqueFaskes = Array.from(
        new Map(
            schedule.map((s) => [s.petugas.faskes.id, s.petugas.faskes])
        ).values()
    );

    const filteredSchedules = schedule.filter((item) => {
        const matchesJenisFaskes =
            filterJenisFaskes === 'all' ||
            item.petugas.faskes.tipe_faskes === filterJenisFaskes;
        const matchesFaskes =
            filterFaskes === 'all' ||
            item.petugas.faskes.id.toString() === filterFaskes;
        const matchesSearch =
            searchQuery === '' ||
            item.petugas.name.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesJenisFaskes && matchesFaskes && matchesSearch;
    });

    const handleResetFilter = () => {
        setFilterJenisFaskes('all');
        setFilterFaskes('all');
        setSearchQuery('');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString: string) => timeString.substring(0, 5);

    return (
        <div>
            {/* Header dan filter */}
            <div
                className="relative py-8 overflow-hidden"
                style={{
                    backgroundImage: "url('assets/images/story-bg2.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Jadwal Konsultasi Online
                        </h1>
                        <p className="text-gray-600">
                            <span className="font-semibold text-sky-600">
                                SIMKESIA{' '}
                            </span>
                            memudahkan Bunda untuk konsultasi online dengan
                            tenaga kesehatan terpercaya.
                        </p>
                    </div>
                    <Card className="mb-6 bg-white rounded-xl">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-4 text-lg">
                                    <SlidersHorizontal
                                        size={20}
                                        className="mr-2 text-sky-600"
                                    />
                                    Filter Jadwal Konsultasi
                                </CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleResetFilter}
                                >
                                    <RefreshCcw className="w-4 h-4 mr-2" />
                                    Reset Filter
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Jenis Faskes
                                    </label>
                                    <Select
                                        value={filterJenisFaskes}
                                        onValueChange={setFilterJenisFaskes}
                                    >
                                        <SelectTrigger className="w-full border-gray-400">
                                            <SelectValue placeholder="Semua Jenis" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border border-gray-200">
                                            <SelectItem value="all">
                                                Semua Jenis
                                            </SelectItem>
                                            {uniqueFaskesTypes.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Faskes
                                    </label>
                                    <Select
                                        value={filterFaskes}
                                        onValueChange={setFilterFaskes}
                                    >
                                        <SelectTrigger className="w-full border-gray-400">
                                            <SelectValue placeholder="Semua Faskes" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border border-gray-200">
                                            <SelectItem value="all">
                                                Semua Faskes
                                            </SelectItem>
                                            {uniqueFaskes.map((faskes) => (
                                                <SelectItem
                                                    key={faskes.id}
                                                    value={faskes.id.toString()}
                                                >
                                                    {faskes.nama}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Pencarian Petugas
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Cari berdasarkan nama petugas..."
                                        className="w-full"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Card list */}
            <div className="relative px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {filteredSchedules.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-lg text-gray-500">
                            Tidak ada jadwal konsultasi yang tersedia.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredSchedules.map((item) => (
                            <Card
                                key={item.id}
                                className="p-4 transition-all duration-300 bg-white border border-gray-200 shadow-md rounded-xl hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex-shrink-0 w-16 h-16 overflow-hidden border rounded-full bg-sky-100">
                                        {item.petugas.profile_pic_url ? (
                                            <img
                                                src={`/storage/${item.petugas.profile_pic_url}`}
                                                alt={item.petugas.name}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center w-full h-full text-2xl font-bold text-sky-600">
                                                {item.petugas.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900">
                                            {item.petugas.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {item.petugas.role}
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-3 space-y-2">
                                    <div className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="font-medium">🏥</span>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {item.petugas.faskes.nama}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {item.petugas.faskes.tipe_faskes}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <span>📅</span>
                                        <span>{formatDate(item.tanggal)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <span>🕐</span>
                                        <span>
                                            {formatTime(item.jam_mulai)} -{' '}
                                            {formatTime(item.jam_selesai)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-4 pt-3 border-t">
                                    <span
                                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                                            item.status_ketersediaan === 'Tersedia'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {item.status_ketersediaan}
                                    </span>
                                    <Button
                                        onClick={() => handleBookConsultation(item)}
                                        disabled={processing}
                                        className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-sky-600 hover:bg-sky-700"
                                    >
                                        {processing ? 'Memproses...' : 'Atur Konsultasi'}
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultationPage;
