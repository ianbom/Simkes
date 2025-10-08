import { Badge } from '@/Components/ui/badge';
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
import {
    Activity,
    Calendar,
    ChevronDown,
    ChevronUp,
    Clock,
    DollarSign,
    RefreshCcw,
    SlidersHorizontal,
    Video,
} from 'lucide-react';
import { useState } from 'react';

interface ConsultationRecord {
    id: number;
    date: string;
    time: string;
    duration: number; // dalam menit
    doctor: string;
    specialty: string;
    consultation_type: 'video' | 'chat';
    status: 'completed' | 'cancelled' | 'no-show';
    complaint: string;
    diagnosis: string;
    prescription?: string;
    notes: string;
    fee: number;
    payment_status: 'paid' | 'pending' | 'refunded';
    rating?: number;
    updated_at: string;
}

const ConsultationHistoryPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [expandedItems, setExpandedItems] = useState(new Set());

    const consultationRecords: ConsultationRecord[] = [
        {
            id: 1,
            date: '2024-10-05',
            time: '14:30',
            duration: 25,
            doctor: 'dr. Sarah Wijaya, Sp.OG',
            specialty: 'Spesialis Kandungan',
            consultation_type: 'video',
            status: 'completed',
            complaint: 'Konsultasi rutin kehamilan trimester 2',
            diagnosis: 'Kehamilan Normal',
            prescription: 'Vitamin Ibu Hamil (Folavit), Kalsium Lactate 3x1',
            notes: 'Kondisi ibu dan janin baik. Disarankan untuk tetap menjaga pola makan sehat dan istirahat cukup. Konsultasi kembali jika ada keluhan.',
            fee: 150000,
            payment_status: 'paid',
            rating: 5,
            updated_at: '2024-10-05 15:00:00',
        },
        {
            id: 2,
            date: '2024-09-28',
            time: '10:15',
            duration: 20,
            doctor: 'dr. Budi Santoso, Sp.A',
            specialty: 'Spesialis Anak',
            consultation_type: 'video',
            status: 'completed',
            complaint: 'Anak demam tinggi 3 hari, batuk dan pilek',
            diagnosis: 'ISPA (Infeksi Saluran Pernapasan Atas)',
            prescription:
                'Paracetamol sirup 3x5ml (bila demam), Ambroxol sirup 3x5ml, Vitamin C 1x1',
            notes: 'Diberikan resep obat penurun panas dan obat batuk. Banyak minum air putih, kompres hangat jika demam. Kontrol kembali jika tidak membaik dalam 3 hari.',
            fee: 120000,
            payment_status: 'paid',
            rating: 5,
            updated_at: '2024-09-28 10:40:00',
        },
        {
            id: 3,
            date: '2024-09-20',
            time: '16:00',
            duration: 15,
            doctor: 'dr. Ahmad Ridwan, Sp.PD',
            specialty: 'Spesialis Penyakit Dalam',
            consultation_type: 'chat',
            status: 'completed',
            complaint: 'Sakit kepala, pusing, tekanan darah tinggi',
            diagnosis: 'Hipertensi Grade 1',
            prescription:
                'Amlodipine 5mg 1x1 (pagi), Paracetamol 500mg (bila sakit kepala)',
            notes: 'Disarankan untuk mengurangi konsumsi garam, olahraga ringan teratur, dan cek tekanan darah rutin. Kontrol 2 minggu lagi.',
            fee: 100000,
            payment_status: 'paid',
            rating: 4,
            updated_at: '2024-09-20 16:20:00',
        },
        {
            id: 4,
            date: '2024-09-15',
            time: '09:00',
            duration: 0,
            doctor: 'dr. Lisa Kartika, Sp.KK',
            specialty: 'Spesialis Kulit & Kelamin',
            consultation_type: 'video',
            status: 'cancelled',
            complaint: 'Gatal-gatal dan ruam di kulit',
            diagnosis: '-',
            notes: 'Konsultasi dibatalkan oleh pasien 2 jam sebelum jadwal.',
            fee: 125000,
            payment_status: 'refunded',
            updated_at: '2024-09-15 07:00:00',
        },
        {
            id: 5,
            date: '2024-09-10',
            time: '11:30',
            duration: 30,
            doctor: 'dr. Maya Sari, Sp.A',
            specialty: 'Spesialis Anak',
            consultation_type: 'video',
            status: 'completed',
            complaint: 'Konsultasi tumbuh kembang anak 18 bulan',
            diagnosis: 'Tumbuh Kembang Normal',
            prescription: '-',
            notes: 'Perkembangan anak sesuai milestone. Disarankan untuk stimulasi bicara lebih sering, ajak bermain interaktif. Berikan makanan bergizi seimbang.',
            fee: 120000,
            payment_status: 'paid',
            rating: 5,
            updated_at: '2024-09-10 12:05:00',
        },
        {
            id: 6,
            date: '2024-09-05',
            time: '15:45',
            duration: 0,
            doctor: 'dr. Rina Wijayanti, Sp.JP',
            specialty: 'Spesialis Jantung',
            consultation_type: 'video',
            status: 'no-show',
            complaint: 'Nyeri dada dan sesak napas',
            diagnosis: '-',
            notes: 'Pasien tidak hadir pada jadwal konsultasi yang telah ditentukan.',
            fee: 200000,
            payment_status: 'refunded',
            updated_at: '2024-09-05 16:00:00',
        },
    ];

    const filteredRecords = consultationRecords.filter((record) => {
        const matchesStatus =
            statusFilter === 'all' ? true : record.status === statusFilter;
        const matchesType =
            typeFilter === 'all'
                ? true
                : record.consultation_type === typeFilter;
        const matchesSearch = (
            record.doctor +
            record.specialty +
            record.diagnosis +
            record.complaint
        )
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        return matchesStatus && matchesType && matchesSearch;
    });

    const resetFilters = () => {
        setSearchQuery('');
        setStatusFilter('all');
        setTypeFilter('all');
    };

    const toggleDetail = (id: number) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedItems(newExpanded);
    };

    const hasActiveFilters =
        searchQuery.trim() || statusFilter !== 'all' || typeFilter !== 'all';

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-700 hover:bg-green-100';
            case 'cancelled':
                return 'bg-red-100 text-red-700 hover:bg-red-100';
            case 'no-show':
                return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
            default:
                return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Selesai';
            case 'cancelled':
                return 'Dibatalkan';
            case 'no-show':
                return 'Tidak Hadir';
            default:
                return status;
        }
    };

    const getPaymentBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-emerald-100 text-emerald-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'refunded':
                return 'bg-purple-100 text-purple-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getPaymentLabel = (status: string) => {
        switch (status) {
            case 'paid':
                return 'Lunas';
            case 'pending':
                return 'Menunggu';
            case 'refunded':
                return 'Dikembalikan';
            default:
                return status;
        }
    };

    const getTypeIcon = (type: string) => {
        return type === 'video' ? (
            <Video className="h-4 w-4" />
        ) : (
            <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
            </svg>
        );
    };

    const getTypeLabel = (type: string) => {
        return type === 'video' ? 'Video Call' : 'Chat';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const renderStars = (rating?: number) => {
        if (!rating) return null;
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`h-4 w-4 ${
                            i < rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-200 text-gray-200'
                        }`}
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                ))}
                <span className="ml-1 text-sm text-gray-600">({rating}/5)</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="mb-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                            Riwayat Konsultasi Online
                        </h1>
                        <p className="text-gray-600">
                            Catatan lengkap konsultasi kesehatan Anda
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-1.5 rounded-md bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800">
                            <Activity className="h-4 w-4 text-purple-600" />
                            Total Konsultasi: {consultationRecords.length}
                        </div>
                    </div>
                </div>

                <Card className="mb-6 bg-white shadow-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center justify-between gap-4 text-lg">
                                <div className="flex items-center">
                                    <SlidersHorizontal
                                        size={20}
                                        className="mr-2 text-blue-600"
                                    />
                                    Filter Konsultasi
                                </div>
                                {hasActiveFilters && (
                                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-600">
                                        Aktif
                                    </span>
                                )}
                            </CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={resetFilters}
                                disabled={!hasActiveFilters}
                            >
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Reset Filter
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Status Konsultasi
                                </label>
                                <Select
                                    value={statusFilter}
                                    onValueChange={setStatusFilter}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="all">
                                            Semua Status
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            Selesai
                                        </SelectItem>
                                        <SelectItem value="cancelled">
                                            Dibatalkan
                                        </SelectItem>
                                        <SelectItem value="no-show">
                                            Tidak Hadir
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Jenis Konsultasi
                                </label>
                                <Select
                                    value={typeFilter}
                                    onValueChange={setTypeFilter}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Jenis" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="all">
                                            Semua Jenis
                                        </SelectItem>
                                        <SelectItem value="video">
                                            Video Call
                                        </SelectItem>
                                        <SelectItem value="chat">
                                            Chat
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Pencarian
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Cari dokter, spesialisasi..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    {filteredRecords.map((record) => (
                        <Card
                            key={record.id}
                            className="bg-white shadow-sm transition-shadow hover:shadow-md"
                        >
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex flex-1 flex-col gap-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge
                                                className={getStatusBadge(
                                                    record.status,
                                                )}
                                            >
                                                {getStatusLabel(record.status)}
                                            </Badge>
                                            <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                                                {getTypeIcon(
                                                    record.consultation_type,
                                                )}
                                                {getTypeLabel(
                                                    record.consultation_type,
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(record.date)} •{' '}
                                                {record.time}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                                {record.doctor}
                                            </h3>
                                            <p className="text-sm text-blue-600">
                                                {record.specialty}
                                            </p>
                                            <p className="mt-2 text-sm text-gray-700">
                                                <span className="font-medium">
                                                    Keluhan:
                                                </span>{' '}
                                                {record.complaint}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                                            {record.duration > 0 && (
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                    <span>
                                                        {record.duration} menit
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4 text-gray-400" />
                                                <span>
                                                    Rp{' '}
                                                    {record.fee.toLocaleString()}
                                                </span>
                                            </div>
                                            <Badge
                                                className={getPaymentBadge(
                                                    record.payment_status,
                                                )}
                                            >
                                                {getPaymentLabel(
                                                    record.payment_status,
                                                )}
                                            </Badge>
                                        </div>

                                        {record.rating &&
                                            record.status === 'completed' && (
                                                <div>
                                                    {renderStars(record.rating)}
                                                </div>
                                            )}
                                    </div>

                                    <div className="flex flex-col gap-2 sm:items-end">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                toggleDetail(record.id)
                                            }
                                            className="shrink-0"
                                        >
                                            {expandedItems.has(record.id) ? (
                                                <>
                                                    <ChevronUp className="mr-2 h-4 w-4" />
                                                    Tutup Detail
                                                </>
                                            ) : (
                                                <>
                                                    <ChevronDown className="mr-2 h-4 w-4" />
                                                    Lihat Detail
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                {expandedItems.has(record.id) && (
                                    <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm shadow-sm">
                                        <h3 className="mb-4 text-base font-semibold text-gray-800">
                                            Detail Konsultasi
                                        </h3>

                                        {record.status === 'completed' && (
                                            <>
                                                <div className="mb-4">
                                                    <p className="font-medium text-gray-900">
                                                        Diagnosis
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {record.diagnosis}
                                                    </p>
                                                </div>

                                                {record.prescription && (
                                                    <div className="mb-4">
                                                        <p className="font-medium text-gray-900">
                                                            Resep Obat
                                                        </p>
                                                        <p className="text-gray-600">
                                                            {
                                                                record.prescription
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        <div className="border-t border-gray-200 pt-4">
                                            <p className="font-medium text-gray-900">
                                                Catatan
                                            </p>
                                            <p className="mt-1 text-gray-600">
                                                {record.notes}
                                            </p>
                                        </div>

                                        <div className="mt-4 text-xs text-gray-500">
                                            Terakhir diperbarui:{' '}
                                            {formatDateTime(record.updated_at)}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                    {filteredRecords.length === 0 && (
                        <Card className="shadow-sm">
                            <CardContent className="flex flex-col items-center py-12 text-center">
                                <Video className="mb-3 h-12 w-12 text-gray-400" />
                                <p className="text-lg font-medium text-gray-900">
                                    Tidak ada data konsultasi
                                </p>
                                <p className="mt-1 text-gray-500">
                                    Belum ada riwayat konsultasi yang sesuai
                                    dengan filter
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConsultationHistoryPage;
