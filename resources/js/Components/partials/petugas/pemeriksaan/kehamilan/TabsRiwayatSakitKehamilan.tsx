import { Badge } from '@/Components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { TabsContent } from '@/Components/ui/tabs';
import { RiwayatSakitKehamilan } from '@/types/interface';
import { formatDate, formatDateTime } from '@/utils/dateFormatter';
import {
    Activity,
    AlertCircle,
    Calendar,
    ChevronDown,
    ChevronUp,
    ClipboardList,
    History,
    Pill,
    RefreshCcw,
    SlidersHorizontal,
    Stethoscope,
} from 'lucide-react';
import { useMemo, useState } from 'react';
interface Props {
    sickHistory?: RiwayatSakitKehamilan[];
}

export default function TabsRiwayatSakitKehamilan({ sickHistory = [] }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedItems, setExpandedItems] = useState(new Set<number>());
    const [showAll, setShowAll] = useState(false);

    const INITIAL_DISPLAY = 10;

    const filteredRecords = useMemo(() => {
        if (!sickHistory || !Array.isArray(sickHistory)) {
            console.warn('sickHistory is not a valid array:', sickHistory);
            return [];
        }

        return sickHistory.filter((record) => {
            const searchText = `
                ${record.kehamilan?.kehamilan_ke || ''}
                ${record.kehamilan?.user?.name || ''}
                ${record.diagnosis || ''}
                ${record.gejala || ''}
                ${record.tindakan_pengobatan || ''}
                ${record.pemeriksaan?.petugas?.name || ''}
                ${record.pemeriksaan?.petugas?.faskes?.nama || ''}
            `.toLowerCase();

            const matchesSearch =
                searchQuery.trim() === '' ||
                searchText.includes(searchQuery.toLowerCase());

            return matchesSearch;
        });
    }, [sickHistory, searchQuery]);

    const displayedRecords = showAll
        ? filteredRecords
        : filteredRecords.slice(0, INITIAL_DISPLAY);

    const hasMoreRecords = filteredRecords.length > INITIAL_DISPLAY;

    if (!sickHistory || sickHistory.length === 0) {
        return (
            <TabsContent value="medical-history" className="mt-6">
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <History className="h-5 w-5" />
                            Riwayat Sakit
                        </CardTitle>
                        <CardDescription>
                            Catatan lengkap riwayat sakit pasien
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center py-12 text-center">
                        <ClipboardList className="mb-3 h-12 w-12 text-gray-400" />
                        <p className="text-lg font-medium text-gray-900">
                            Tidak ada data riwayat sakit
                        </p>
                        <p className="mt-1 text-gray-500">
                            Belum ada riwayat sakit yang tercatat
                        </p>
                    </CardContent>
                </Card>
            </TabsContent>
        );
    }

    const resetFilters = () => {
        setSearchQuery('');
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

    const hasActiveFilters = searchQuery.trim() !== '';
    return (
        <TabsContent value="medical-history" className="mt-6">
            <Card className="bg-white">
                <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <History className="h-5 w-5" />
                                Riwayat Sakit
                            </CardTitle>
                            <CardDescription>
                                Catatan lengkap riwayat sakit pasien
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {/* Info Box */}
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                            <h3 className="mb-2 flex items-center gap-2 font-medium text-red-900">
                                <Activity className="h-4 w-4 text-red-600" />
                                Riwayat Kondisi Sakit
                            </h3>
                            <p className="text-sm text-red-700">
                                Dokumentasi lengkap mengenai riwayat sakit dan
                                penanganan yang telah diberikan
                            </p>
                        </div>

                        {/* Filter Card */}
                        <Card className="bg-white shadow-sm">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-4 text-lg">
                                        <div className="flex items-center">
                                            <SlidersHorizontal
                                                size={20}
                                                className="mr-2 text-blue-600"
                                            />
                                            Filter Riwayat
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
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Pencarian
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Cari nama petugas, diagnosis, gejala, tindakan..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Records List */}
                        <div className="space-y-4">
                            {displayedRecords.map((record) => (
                                <Card
                                    key={record.id}
                                    className="border-l-4 border-l-red-500 bg-white shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="flex flex-1 flex-col gap-3">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                                                        <AlertCircle className="mr-1 h-3 w-3" />
                                                        Riwayat Sakit
                                                    </Badge>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Calendar className="h-4 w-4" />
                                                        {formatDate(
                                                            record.tanggal_diagnosis,
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                                        {
                                                            record.kehamilan
                                                                .user?.name
                                                        }
                                                    </h3>
                                                    <p className="mb-1 text-sm font-medium text-gray-700">
                                                        Diagnosis:{' '}
                                                        {record.diagnosis}
                                                    </p>
                                                    {record.gejala && (
                                                        <p className="text-sm text-red-600">
                                                            Gejala:{' '}
                                                            {record.gejala}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex flex-col gap-2 text-sm text-gray-700">
                                                    {/* <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-gray-400" />
                                                        <span>
                                                            {record.anak
                                                                ?.orangTua
                                                                ? record.anak
                                                                      .orangTua
                                                                      .name
                                                                : 'Orang tua belum terdaftar'}
                                                        </span>
                                                    </div> */}
                                                    {record.pemeriksaan
                                                        ?.petugas && (
                                                        <div className="flex items-center gap-2">
                                                            <Stethoscope className="h-4 w-4 text-gray-400" />
                                                            <span>
                                                                Petugas:{' '}
                                                                {
                                                                    record
                                                                        .pemeriksaan
                                                                        .petugas
                                                                        .name
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
                                                    {expandedItems.has(
                                                        record.id,
                                                    ) ? (
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
                                            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm shadow-sm">
                                                <h3 className="mb-4 text-base font-semibold text-gray-800">
                                                    Detail Riwayat Sakit
                                                </h3>

                                                <div className="space-y-4">
                                                    {/* Informasi Anak */}
                                                    <div className="rounded-md bg-white p-3">
                                                        <p className="mb-2 font-semibold text-gray-900">
                                                            Informasi Kehamilan
                                                        </p>
                                                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                                            <div>
                                                                <p className="text-xs font-medium text-gray-500">
                                                                    Kehamilan
                                                                    ke:
                                                                </p>
                                                                <p className="text-gray-700">
                                                                    {
                                                                        record
                                                                            .kehamilan
                                                                            .kehamilan_ke
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium text-gray-500">
                                                                    Jumlah
                                                                    janin:
                                                                </p>
                                                                <p className="text-gray-700">
                                                                    {
                                                                        record
                                                                            .kehamilan
                                                                            .jumlah_janin
                                                                    }
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <p className="text-xs font-medium text-gray-500">
                                                                    Hari
                                                                    Perkiraan
                                                                    Lahir
                                                                </p>
                                                                <p className="text-gray-700">
                                                                    {
                                                                        record
                                                                            .kehamilan
                                                                            .hpl
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium text-gray-500">
                                                                    Hari Pertama
                                                                    Haid
                                                                    Terakhir
                                                                </p>
                                                                <p className="text-gray-700">
                                                                    {
                                                                        record
                                                                            .kehamilan
                                                                            .hpht
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium text-gray-500">
                                                                    Status
                                                                    kehamilan
                                                                </p>
                                                                <p className="text-gray-700">
                                                                    {
                                                                        record
                                                                            .kehamilan
                                                                            .status
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Diagnosis & Gejala */}
                                                    <div className="rounded-md bg-white p-3">
                                                        <p className="mb-2 font-semibold text-gray-900">
                                                            <AlertCircle className="mb-1 mr-1 inline h-4 w-4" />
                                                            Diagnosis & Gejala
                                                        </p>
                                                        <div className="space-y-2">
                                                            <div>
                                                                <p className="text-xs font-medium text-gray-500">
                                                                    Diagnosis
                                                                </p>
                                                                <p className="text-gray-700">
                                                                    {
                                                                        record.diagnosis
                                                                    }
                                                                </p>
                                                            </div>
                                                            {record.gejala && (
                                                                <div>
                                                                    <p className="text-xs font-medium text-gray-500">
                                                                        Gejala
                                                                    </p>
                                                                    <p className="text-gray-700">
                                                                        {
                                                                            record.gejala
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Tindakan Pengobatan */}
                                                    {record.tindakan_pengobatan && (
                                                        <div className="rounded-md bg-white p-3">
                                                            <p className="mb-2 font-semibold text-gray-900">
                                                                <Pill className="mb-1 mr-1 inline h-4 w-4" />
                                                                Tindakan
                                                                Pengobatan
                                                            </p>
                                                            <p className="text-gray-700">
                                                                {
                                                                    record.tindakan_pengobatan
                                                                }
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Catatan */}
                                                    {/* {record.catatan && (
                                                        <div className="p-3 bg-white rounded-md">
                                                            <p className="mb-2 font-semibold text-gray-900">
                                                                Catatan Tambahan
                                                            </p>
                                                            <p className="text-gray-700">
                                                                {record.catatan}
                                                            </p>
                                                        </div>
                                                    )} */}

                                                    {/* Informasi Pemeriksaan Terkait */}
                                                    {record.pemeriksaan && (
                                                        <div className="rounded-md bg-white p-3">
                                                            <p className="mb-2 font-semibold text-gray-900">
                                                                Informasi
                                                                Pemeriksaan
                                                                Terkait
                                                            </p>
                                                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                                                <div>
                                                                    <p className="text-xs font-medium text-gray-500">
                                                                        Tanggal
                                                                        Pemeriksaan
                                                                    </p>
                                                                    <p className="text-gray-700">
                                                                        {formatDate(
                                                                            record
                                                                                .pemeriksaan
                                                                                .tanggal_checkup,
                                                                        )}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium text-gray-500">
                                                                        Petugas
                                                                    </p>
                                                                    <p className="text-gray-700">
                                                                        {
                                                                            record
                                                                                .pemeriksaan
                                                                                .petugas
                                                                                .name
                                                                        }
                                                                    </p>
                                                                </div>
                                                                {record
                                                                    .pemeriksaan
                                                                    .petugas
                                                                    .faskes && (
                                                                    <div>
                                                                        <p className="text-xs font-medium text-gray-500">
                                                                            Fasilitas
                                                                            Kesehatan
                                                                        </p>
                                                                        <p className="text-gray-700">
                                                                            {
                                                                                record
                                                                                    .pemeriksaan
                                                                                    .petugas
                                                                                    .faskes
                                                                                    .nama
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )}
                                                                {record
                                                                    .pemeriksaan
                                                                    .catatan_petugas && (
                                                                    <div>
                                                                        <p className="text-xs font-medium text-gray-500">
                                                                            Catatan
                                                                            Petugas
                                                                        </p>
                                                                        <p className="text-gray-700">
                                                                            {
                                                                                record
                                                                                    .pemeriksaan
                                                                                    .catatan_petugas
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-4 text-xs text-gray-500">
                                                    Terakhir diperbarui:{' '}
                                                    {formatDateTime(
                                                        record.updated_at,
                                                    )}
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
                                            Tidak ada data riwayat sakit
                                        </p>
                                        <p className="mt-1 text-gray-500">
                                            {hasActiveFilters
                                                ? 'Tidak ada riwayat sakit yang sesuai dengan pencarian'
                                                : 'Belum ada riwayat sakit yang tercatat'}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Show More/Less Buttons */}
                        {!showAll && hasMoreRecords && (
                            <div className="mt-8 flex flex-col items-center gap-3">
                                <Button
                                    onClick={() => setShowAll(true)}
                                    size="lg"
                                    className="min-w-[250px]"
                                >
                                    Tampilkan Semua Data (
                                    {filteredRecords.length} total)
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
                </CardContent>
            </Card>
        </TabsContent>
    );
}
