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
import { formatDate, formatDateTime } from '@/utils/dateFormatter';
import {
    Activity,
    AlertCircle,
    Calendar,
    ChevronDown,
    ChevronUp,
    ClipboardList,
    FileText,
    Image as ImageIcon,
    RefreshCcw,
    SlidersHorizontal,
    Stethoscope,
    User,
} from 'lucide-react';
import { useMemo, useState } from 'react';

interface RiwayatSakit {
    id: number;
    tanggal_sakit: string;
    diagnosis: string;
    gejala: string;
    tindakan_pengobatan: string;
    catatan: string;
}

interface MediaPemeriksaan {
    id: number;
    file_url: string;
    created_at: string;
}

interface PemeriksaanAnak {
    id: number;
    jenis_kunjungan: string;
    tanggal_pemeriksaan: string;
    usia_saat_periksa_bulan: number;
    berat_badan_kg: string;
    tinggi_badan_cm: string;
    lingkar_kepala_cm: string;
    suhu_tubuh_celsius: string;
    saturasi_oksigen_persen?: number;
    perkembangan_motorik?: string;
    perkembangan_kognitif?: string;
    perkembangan_emosional?: string;
    catatan_pemeriksaan?: string;
    updated_at: string;
    anak: {
        nama: string;
    };
    petugas: {
        name: string;
        faskes?: {
            nama: string;
        };
    };
    riwayat_sakit: RiwayatSakit[];
    media_pemeriksaan_anak: MediaPemeriksaan[];
}

interface Props {
    checkupHistory?: PemeriksaanAnak[];
}

const ChildCheckupHistoryPage = ({ checkupHistory }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [expandedItems, setExpandedItems] = useState(new Set<number>());
    const [showAll, setShowAll] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const INITIAL_DISPLAY = 10;

    const filteredRecords = useMemo(() => {
        if (!checkupHistory) return [];

        return checkupHistory.filter((record) => {
            const matchesType =
                typeFilter === 'all'
                    ? true
                    : record.jenis_kunjungan?.toLowerCase() === typeFilter;

            const searchText = `
                ${record.petugas?.name || ''}
                ${record.anak?.nama || ''}
                ${record.petugas?.faskes?.nama || ''}
                ${record.riwayat_sakit?.map(r => r.diagnosis).join(' ') || ''}
            `.toLowerCase();

            const matchesSearch =
                searchQuery.trim() === '' ||
                searchText.includes(searchQuery.toLowerCase());

            return matchesType && matchesSearch;
        });
    }, [checkupHistory, typeFilter, searchQuery]);

    const displayedRecords = showAll
        ? filteredRecords
        : filteredRecords.slice(0, INITIAL_DISPLAY);

    const hasMoreRecords = filteredRecords.length > INITIAL_DISPLAY;

    if (!checkupHistory || checkupHistory.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="mb-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                            Riwayat Checkup Anak
                        </h1>
                        <p className="text-gray-600">
                            Catatan lengkap pemeriksaan buah hati Anda
                        </p>
                    </div>
                    <Card className="shadow-sm">
                        <CardContent className="flex flex-col items-center py-12 text-center">
                            <ClipboardList className="mb-3 h-12 w-12 text-gray-400" />
                            <p className="text-lg font-medium text-gray-900">
                                Tidak ada data pemeriksaan
                            </p>
                            <p className="mt-1 text-gray-500">
                                Belum ada riwayat pemeriksaan anak
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    const resetFilters = () => {
        setSearchQuery('');
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

    const hasActiveFilters = searchQuery.trim() || typeFilter !== 'all';

    const getTypeBadge = (type: string) => {
        if (type.toLowerCase() === 'rutin') {
            return 'bg-green-100 text-green-700 hover:bg-green-100';
        }
        return 'bg-red-100 text-red-700 hover:bg-red-100';
    };

    const getTypeLabel = (type: string) => {
        return type.toLowerCase() === 'rutin'
            ? 'Pemeriksaan Rutin'
            : 'Pemeriksaan Sakit';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="mb-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                            Riwayat Checkup Anak
                        </h1>
                        <p className="text-gray-600">
                            Catatan lengkap pemeriksaan buah hati Anda
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-1.5 rounded-md bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800">
                            <Activity className="h-4 w-4 text-purple-600" />
                            Total: {checkupHistory?.length || 0}
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
                                    Filter Pemeriksaan
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
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Jenis Pemeriksaan
                                </label>
                                <Select
                                    value={typeFilter}
                                    onValueChange={setTypeFilter}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Pemeriksaan" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="all">
                                            Semua Pemeriksaan
                                        </SelectItem>
                                        <SelectItem value="rutin">
                                            Pemeriksaan Rutin
                                        </SelectItem>
                                        <SelectItem value="sakit">
                                            Pemeriksaan Sakit
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
                                    placeholder="Cari nama anak, dokter, diagnosis..."
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
                    {displayedRecords.map((record) => (
                        <Card
                            key={record.id}
                            className="bg-white shadow-sm transition-shadow hover:shadow-md"
                        >
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex flex-1 flex-col gap-3">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Badge
                                                className={getTypeBadge(
                                                    record.jenis_kunjungan,
                                                )}
                                            >
                                                {getTypeLabel(
                                                    record.jenis_kunjungan,
                                                )}
                                            </Badge>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(
                                                    record.tanggal_pemeriksaan,
                                                )}
                                            </div>
                                            {record.riwayat_sakit && record.riwayat_sakit.length > 0 && (
                                                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                                                    <AlertCircle className="mr-1 h-3 w-3" />
                                                    Ada Riwayat Sakit
                                                </Badge>
                                            )}
                                            {record.media_pemeriksaan_anak && record.media_pemeriksaan_anak.length > 0 && (
                                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                                    <ImageIcon className="mr-1 h-3 w-3" />
                                                    {record.media_pemeriksaan_anak.length} Foto
                                                </Badge>
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                                {record.anak.nama}
                                            </h3>
                                        </div>

                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-gray-400" />
                                                <span>
                                                    {record.petugas.name}
                                                </span>
                                            </div>
                                            {record.petugas.faskes && (
                                                <div className="flex items-center gap-2">
                                                    <Stethoscope className="h-4 w-4 text-gray-400" />
                                                    <span>
                                                        {
                                                            record.petugas
                                                                .faskes.nama
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                        </div>
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
                                    <div className="mt-4 space-y-4">
                                        {/* Data Pemeriksaan */}
                                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm shadow-sm">
                                            <h3 className="mb-4 text-base font-semibold text-gray-800">
                                                Detail Pemeriksaan
                                            </h3>

                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Usia Saat Periksa
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {
                                                            record.usia_saat_periksa_bulan
                                                        }{' '}
                                                        bulan
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Suhu Tubuh
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {record.suhu_tubuh_celsius}
                                                        °C
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Berat Badan
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {record.berat_badan_kg} kg
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Tinggi Badan
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {record.tinggi_badan_cm} cm
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Lingkar Kepala
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {record.lingkar_kepala_cm}{' '}
                                                        cm
                                                    </p>
                                                </div>
                                                {record.saturasi_oksigen_persen && (
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            Saturasi Oksigen
                                                        </p>
                                                        <p className="text-gray-600">
                                                            {
                                                                record.saturasi_oksigen_persen
                                                            }
                                                            %
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {record.perkembangan_motorik && (
                                                <div className="mt-4 border-t border-gray-200 pt-4">
                                                    <p className="font-medium text-gray-900">
                                                        Perkembangan Motorik:
                                                    </p>
                                                    <p className="mt-1 text-gray-600">
                                                        {
                                                            record.perkembangan_motorik
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                            {record.perkembangan_kognitif && (
                                                <div className="mt-4 border-t border-gray-200 pt-4">
                                                    <p className="font-medium text-gray-900">
                                                        Perkembangan Kognitif:
                                                    </p>
                                                    <p className="mt-1 text-gray-600">
                                                        {
                                                            record.perkembangan_kognitif
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                            {record.perkembangan_emosional && (
                                                <div className="mt-4 border-t border-gray-200 pt-4">
                                                    <p className="font-medium text-gray-900">
                                                        Perkembangan Emosional:
                                                    </p>
                                                    <p className="mt-1 text-gray-600">
                                                        {
                                                            record.perkembangan_emosional
                                                        }
                                                    </p>
                                                </div>
                                            )}

                                            {record.catatan_pemeriksaan && (
                                                <div className="mt-4 border-t border-gray-200 pt-4">
                                                    <p className="font-medium text-gray-900">
                                                        Catatan Pemeriksaan:
                                                    </p>
                                                    <p className="mt-1 text-gray-600">
                                                        {record.catatan_pemeriksaan}
                                                    </p>
                                                </div>
                                            )}

                                            <div className="mt-4 text-xs text-gray-500">
                                                Terakhir diperbarui:{' '}
                                                {formatDateTime(record.updated_at)}
                                            </div>
                                        </div>

                                        {/* Riwayat Sakit */}
                                        {record.riwayat_sakit && record.riwayat_sakit.length > 0 && (
                                            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm shadow-sm">
                                                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-800">
                                                    <FileText className="h-5 w-5 text-red-600" />
                                                    Riwayat Sakit
                                                </h3>

                                                <div className="space-y-4">
                                                    {record.riwayat_sakit.map((sakit, index) => (
                                                        <div key={sakit.id} className="rounded-md border border-red-300 bg-white p-3">
                                                            {record.riwayat_sakit.length > 1 && (
                                                                <p className="mb-2 text-xs font-semibold text-red-700">
                                                                    Riwayat {index + 1}
                                                                </p>
                                                            )}
                                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                                <div>
                                                                    <p className="font-medium text-gray-900">
                                                                        Tanggal Sakit
                                                                    </p>
                                                                    <p className="text-gray-600">
                                                                        {formatDate(sakit.tanggal_sakit)}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-gray-900">
                                                                        Diagnosis
                                                                    </p>
                                                                    <p className="text-gray-600">
                                                                        {sakit.diagnosis}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-gray-900">
                                                                        Gejala
                                                                    </p>
                                                                    <p className="text-gray-600">
                                                                        {sakit.gejala}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-gray-900">
                                                                        Tindakan Pengobatan
                                                                    </p>
                                                                    <p className="text-gray-600">
                                                                        {sakit.tindakan_pengobatan}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {sakit.catatan && (
                                                                <div className="mt-3 border-t border-gray-200 pt-3">
                                                                    <p className="font-medium text-gray-900">
                                                                        Catatan
                                                                    </p>
                                                                    <p className="text-gray-600">
                                                                        {sakit.catatan}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Media Pemeriksaan */}
                                        {record.media_pemeriksaan_anak && record.media_pemeriksaan_anak.length > 0 && (
                                            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-sm shadow-sm">
                                                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-800">
                                                    <ImageIcon className="h-5 w-5 text-purple-600" />
                                                    Dokumentasi Pemeriksaan ({record.media_pemeriksaan_anak.length} foto)
                                                </h3>

                                                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                                    {record.media_pemeriksaan_anak.map((media) => (
                                                        <div
                                                            key={media.id}
                                                            className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg border border-purple-300 bg-white shadow-sm transition-all hover:shadow-md"
                                                            onClick={() => setSelectedImage(`/storage/${media.file_url}`)}
                                                        >
                                                            <img
                                                                src={`/storage/${media.file_url}`}
                                                                alt={`Foto pemeriksaan ${record.anak.nama}`}
                                                                className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-20" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                    {filteredRecords.length === 0 && (
                        <Card className="bg-white shadow-sm">
                            <CardContent className="flex flex-col items-center py-12 text-center">
                                <ClipboardList className="mb-3 h-12 w-12 text-gray-400" />
                                <p className="text-lg font-medium text-gray-900">
                                    Tidak ada data pemeriksaan
                                </p>
                                <p className="mt-1 text-gray-500">
                                    {hasActiveFilters
                                        ? 'Belum ada riwayat pemeriksaan yang sesuai dengan filter'
                                        : 'Belum ada riwayat pemeriksaan anak'}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Show More Button */}
                {!showAll && hasMoreRecords && (
                    <div className="mt-8 flex flex-col items-center gap-3">
                        <Button
                            onClick={() => setShowAll(true)}
                            size="lg"
                            className="min-w-[250px] text-white"
                        >
                            Tampilkan Semua Data ({filteredRecords.length}{' '}
                            total)
                        </Button>
                        <p className="text-sm text-gray-600">
                            Menampilkan {displayedRecords.length} dari{' '}
                            {filteredRecords.length} data
                        </p>
                    </div>
                )}

                {/* Show Less Button */}
                {showAll && hasMoreRecords && (
                    <div className="mt-8 flex justify-center">
                        <Button
                            onClick={() => setShowAll(false)}
                            variant="outline"
                            size="lg"
                        >
                            <ChevronUp className="mr-2 h-4 w-4" />
                            Tampilkan Lebih Sedikit
                        </Button>
                    </div>
                )}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-h-[90vh] max-w-[90vw]">
                        <img
                            src={selectedImage}
                            alt="Preview"
                            className="max-h-[90vh] max-w-full rounded-lg"
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-100"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChildCheckupHistoryPage;
