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
    ClipboardList,
    RefreshCcw,
    SlidersHorizontal,
    User,
} from 'lucide-react';
import { useMemo, useState } from 'react';

interface Kelahiran {
    id: number;
    tanggal_lahir: string;
    berat_lahir: number;
    panjang_lahir: number;
}

interface OrangTua {
    id: number;
    name: string;
    email: string;
}

interface Anak {
    id: number;
    nama: string;
    kelamin: string;
    kelahiran?: Kelahiran;
    orangTua?: OrangTua;
}

interface Faskes {
    id: number;
    nama: string;
    tipe_faskes: string;
}

interface Petugas {
    id: number;
    name: string;
    email: string;
    faskes?: Faskes;
}

interface Skrining {
    id: number;
    hasil: string;
    catatan?: string;
}

interface PemeriksaanAnak {
    id: number;
    anak_id: number;
    petugas_faskes_id: number;
    jenis_kunjungan: 'Rutin' | 'Sakit';
    tanggal_pemeriksaan: string;
    usia_saat_periksa_bulan: number;
    berat_badan_kg: number;
    tinggi_badan_cm: number;
    lingkar_kepala_cm: number;
    cara_ukur_tinggi?: string;
    suhu_tubuh_celsius: number;
    perkembangan_motorik: string;
    perkembangan_kognitif: string;
    perkembangan_emosional: string;
    frekuensi_napas_per_menit?: number;
    frekuensi_jantung_per_menit?: number;
    catatan_pemeriksaan?: string;
    saturasi_oksigen_persen?: number;
    keluhan?: string;
    diagnosis?: string;
    tindakan?: string;
    catatan?: string;
    jadwal_kontrol_berikutnya?: string;
    anak: Anak;
    petugas: Petugas;
    skrining?: Skrining;
    created_at: string;
    updated_at: string;
}

interface Props {
    checkupHistory?: PemeriksaanAnak[];
}

const ChildCheckupHistoryPage = ({ checkupHistory }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [expandedItems, setExpandedItems] = useState(new Set<number>());
    const [showAll, setShowAll] = useState(false);

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
                ${record.diagnosis || ''}
                ${record.keluhan || ''}
                ${record.petugas?.faskes?.nama || ''}
                ${record.anak?.nama || ''}
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
            <div className="px-4 py-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="font-heading text-2xl font-bold">
                        Riwayat Checkup Anak
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Catatan lengkap pemeriksaan buah hati pasien Anda
                    </p>
                </div>
                <Card className="bg-white shadow-sm">
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

    return (
        <div className="px-4 py-6 lg:px-8">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="font-heading text-2xl font-bold">
                        Riwayat Checkup Anak
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Catatan lengkap pemeriksaan buah hati pasien Anda
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
                                placeholder="Cari nama anak, orang tua, diagnosis..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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
                                    </div>

                                    <div>
                                        <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                            {record.anak.nama}
                                        </h3>
                                        {record.diagnosis && (
                                            <p className="mb-1 text-sm text-gray-700">
                                                Diagnosis: {record.diagnosis}
                                            </p>
                                        )}
                                        {record.keluhan && (
                                            <p className="mb-2 text-sm text-red-600">
                                                Keluhan: {record.keluhan}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 text-sm text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-gray-400" />
                                            <span>
                                                {record.anak?.orangTua
                                                    ? record.anak.orangTua.name
                                                    : 'Orang tua belum terdaftar'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 sm:items-end">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toggleDetail(record.id)}
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
                                        Detail Pemeriksaan
                                    </h3>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                Usia Saat Periksa
                                            </p>
                                            <p className="text-gray-600">
                                                {record.usia_saat_periksa_bulan}{' '}
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
                                                {record.lingkar_kepala_cm} cm
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
                                                {record.perkembangan_motorik}
                                            </p>
                                        </div>
                                    )}
                                    {record.perkembangan_kognitif && (
                                        <div className="mt-4 border-t border-gray-200 pt-4">
                                            <p className="font-medium text-gray-900">
                                                Perkembangan Kognitif:
                                            </p>
                                            <p className="mt-1 text-gray-600">
                                                {record.perkembangan_kognitif}
                                            </p>
                                        </div>
                                    )}
                                    {record.perkembangan_emosional && (
                                        <div className="mt-4 border-t border-gray-200 pt-4">
                                            <p className="font-medium text-gray-900">
                                                Perkembangan Emosional:
                                            </p>
                                            <p className="mt-1 text-gray-600">
                                                {record.perkembangan_emosional}
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

                                    {record.jadwal_kontrol_berikutnya && (
                                        <div className="mt-4 rounded-md bg-green-50 p-3">
                                            <p className="font-medium text-green-900">
                                                Jadwal Kontrol Berikutnya
                                            </p>
                                            <p className="text-green-700">
                                                {formatDate(
                                                    record.jadwal_kontrol_berikutnya,
                                                )}
                                            </p>
                                        </div>
                                    )}

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
                        className="min-w-[250px]"
                    >
                        Tampilkan Semua Data ({filteredRecords.length} total)
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
    );
};

export default ChildCheckupHistoryPage;
