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
    AlertCircle,
    AlertTriangle,
    Calendar,
    ChevronDown,
    ChevronUp,
    ClipboardList,
    RefreshCcw,
    SlidersHorizontal,
    Stethoscope,
    User,
} from 'lucide-react';
import { useMemo, useState } from 'react';

interface Kehamilan {
    id: number;
    user_id: number;
    status: string;
    usia_kehamilan_minggu?: number;
    hpht: string;
    hpl: string;
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

interface DataJanin {
    id: number;
    detak_jantung_janin?: number;
    presentasi_janin?: string;
}

interface PemeriksaanAnc {
    id: number;
    kehamilan_id: number;
    petugas_faskes_id: number;
    jenis_pemeriksaan: 'Rutin' | 'Sakit';
    tanggal_checkup: string;
    berat_badan: number;
    tekanan_darah_sistolik: number;
    tekanan_darah_diastolik: number;
    lila?: number;
    tinggi_fundus?: number;
    status_bengkak_kaki?: 'Tidak Ada' | 'Ringan' | 'Berat';
    keluhan?: string;
    suhu_tubuh_celsius?: number;
    frekuensi_napas_per_menit?: number;
    frekuensi_jantung_per_menit?: number;
    catatan_petugas?: string;
    deteksi_resiko?: string;
    saran_kunjungan_berikutnya?: string;
    kehamilan?: Kehamilan;
    petugas?: Petugas;
    dataJanin?: DataJanin[];
    created_at: string;
    updated_at: string;
}

interface Props {
    checkupHistory?: PemeriksaanAnc[];
}

const PregnancyCheckupHistoryPage = ({ checkupHistory }: Props) => {
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
                    : record.jenis_pemeriksaan?.toLowerCase() === typeFilter;

            const searchText = `
                ${record.petugas?.name || ''}
                ${record.keluhan || ''}
                ${record.catatan_petugas || ''}
                ${record.petugas?.faskes?.nama || ''}
                ${record.deteksi_resiko || ''}
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
                            Riwayat Checkup Kehamilan
                        </h1>
                        <p className="text-gray-600">
                            Catatan lengkap pemeriksaan kehamilan Anda
                        </p>
                    </div>
                    <Card className="shadow-sm">
                        <CardContent className="flex flex-col items-center py-12 text-center">
                            <ClipboardList className="mb-3 h-12 w-12 text-gray-400" />
                            <p className="text-lg font-medium text-gray-900">
                                Tidak ada data pemeriksaan
                            </p>
                            <p className="mt-1 text-gray-500">
                                Belum ada riwayat pemeriksaan kehamilan
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

    const getBengkakBadge = (status?: string) => {
        if (!status || status === 'Tidak Ada')
            return 'bg-green-100 text-green-700';
        if (status === 'Ringan') return 'bg-yellow-100 text-yellow-700';
        return 'bg-red-100 text-red-700';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="mb-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                            Riwayat Checkup Kehamilan
                        </h1>
                        <p className="text-gray-600">
                            Catatan lengkap pemeriksaan kehamilan Anda
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
                                    placeholder="Cari dokter, keluhan, catatan..."
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
                                                    record.jenis_pemeriksaan,
                                                )}
                                            >
                                                {getTypeLabel(
                                                    record.jenis_pemeriksaan,
                                                )}
                                            </Badge>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(
                                                    record.tanggal_checkup,
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-4 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-4 shadow-sm">
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-semibold text-gray-900">
                                                                Pemeriksaan ANC
                                                            </h3>
                                                            {record.kehamilan_id && (
                                                                <span className="mt-1 inline-block text-xs font-medium text-gray-500">
                                                                    ID
                                                                    Kehamilan: #
                                                                    {
                                                                        record.kehamilan_id
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>

                                                        {record.kehamilan
                                                            ?.usia_kehamilan_minggu && (
                                                            <Badge className="whitespace-nowrap bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 hover:bg-purple-100">
                                                                {
                                                                    record
                                                                        .kehamilan
                                                                        .usia_kehamilan_minggu
                                                                }{' '}
                                                                minggu
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                        <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2">
                                                            <Calendar className="h-4 w-4 flex-shrink-0 text-blue-600" />
                                                            <div className="flex min-w-0 flex-col">
                                                                <span className="text-xs font-medium text-gray-500">
                                                                    HPHT
                                                                </span>
                                                                <span className="truncate text-sm font-semibold text-gray-900">
                                                                    {record
                                                                        .kehamilan
                                                                        ?.hpht
                                                                        ? formatDate(
                                                                              record
                                                                                  .kehamilan
                                                                                  .hpht,
                                                                          )
                                                                        : 'Belum ada data'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2">
                                                            <Calendar className="h-4 w-4 flex-shrink-0 text-green-600" />
                                                            <div className="flex min-w-0 flex-col">
                                                                <span className="text-xs font-medium text-gray-500">
                                                                    HPL
                                                                </span>
                                                                <span className="truncate text-sm font-semibold text-gray-900">
                                                                    {record
                                                                        .kehamilan
                                                                        ?.hpl
                                                                        ? formatDate(
                                                                              record
                                                                                  .kehamilan
                                                                                  .hpl,
                                                                          )
                                                                        : 'Belum ada data'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                {record.keluhan && (
                                                    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                                                        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                                                        <div>
                                                            <p className="text-xs font-semibold text-red-900">
                                                                Keluhan Pasien
                                                            </p>
                                                            <p className="text-sm text-red-700">
                                                                {record.keluhan}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {record.deteksi_resiko && (
                                                    <div className="flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3">
                                                        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
                                                        <div>
                                                            <p className="text-xs font-semibold text-orange-900">
                                                                Deteksi Risiko
                                                            </p>
                                                            <p className="text-sm text-orange-700">
                                                                {
                                                                    record.deteksi_resiko
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-gray-400" />
                                                <span>
                                                    {record.petugas?.name ||
                                                        'Tidak ada data'}
                                                </span>
                                            </div>
                                            {record.petugas?.faskes && (
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
                                    <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm shadow-sm">
                                        <h3 className="mb-4 text-base font-semibold text-gray-800">
                                            Detail Pemeriksaan
                                        </h3>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Tekanan Darah
                                                </p>
                                                <p className="text-gray-600">
                                                    {
                                                        record.tekanan_darah_sistolik
                                                    }
                                                    /
                                                    {
                                                        record.tekanan_darah_diastolik
                                                    }{' '}
                                                    mmHg
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Berat Badan
                                                </p>
                                                <p className="text-gray-600">
                                                    {record.berat_badan} kg
                                                </p>
                                            </div>
                                            {record.tinggi_fundus && (
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Tinggi Fundus
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {record.tinggi_fundus}{' '}
                                                        cm
                                                    </p>
                                                </div>
                                            )}
                                            {record.lila && (
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        LILA
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {record.lila} cm
                                                    </p>
                                                </div>
                                            )}
                                            {record.status_bengkak_kaki && (
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Status Bengkak Kaki
                                                    </p>
                                                    <Badge
                                                        className={getBengkakBadge(
                                                            record.status_bengkak_kaki,
                                                        )}
                                                    >
                                                        {
                                                            record.status_bengkak_kaki
                                                        }
                                                    </Badge>
                                                </div>
                                            )}
                                            {record.suhu_tubuh_celsius && (
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Suhu Tubuh
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {
                                                            record.suhu_tubuh_celsius
                                                        }
                                                        °C
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {record.dataJanin &&
                                            record.dataJanin.length > 0 && (
                                                <div className="mt-4 border-t border-gray-200 pt-4">
                                                    <p className="mb-2 font-medium text-gray-900">
                                                        Data Janin
                                                    </p>
                                                    {record.dataJanin.map(
                                                        (janin, index) => (
                                                            <div
                                                                key={index}
                                                                className="mb-2 rounded-md bg-purple-50 p-3"
                                                            >
                                                                {janin.detak_jantung_janin && (
                                                                    <p className="text-sm text-gray-700">
                                                                        Detak
                                                                        Jantung:{' '}
                                                                        {
                                                                            janin.detak_jantung_janin
                                                                        }{' '}
                                                                        bpm
                                                                    </p>
                                                                )}
                                                                {janin.presentasi_janin && (
                                                                    <p className="text-sm text-gray-700">
                                                                        Presentasi:{' '}
                                                                        {
                                                                            janin.presentasi_janin
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            )}

                                        {record.catatan_petugas && (
                                            <div className="mt-4 border-t border-gray-200 pt-4">
                                                <p className="font-medium text-gray-900">
                                                    Catatan Petugas
                                                </p>
                                                <p className="mt-1 text-gray-600">
                                                    {record.catatan_petugas}
                                                </p>
                                            </div>
                                        )}

                                        {record.saran_kunjungan_berikutnya && (
                                            <div className="mt-4 rounded-md bg-green-50 p-3">
                                                <p className="font-medium text-green-900">
                                                    Kunjungan Berikutnya
                                                </p>
                                                <p className="text-green-700">
                                                    {formatDate(
                                                        record.saran_kunjungan_berikutnya,
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
                                        : 'Belum ada riwayat pemeriksaan kehamilan'}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {!showAll && hasMoreRecords && (
                    <div className="mt-8 flex flex-col items-center gap-3">
                        <Button
                            onClick={() => setShowAll(true)}
                            size="lg"
                            className="min-w-[250px]"
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
        </div>
    );
};

export default PregnancyCheckupHistoryPage;
