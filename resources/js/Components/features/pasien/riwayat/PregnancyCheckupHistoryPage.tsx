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
    Stethoscope,
    User,
} from 'lucide-react';
import { useState } from 'react';

interface CheckupRecord {
    id: number;
    date: string;
    type: 'rutin' | 'sakit';
    doctor: string;
    faskes: string;
    complaint?: string;
    diagnosis: string;
    blood_pressure: string;
    weight: number;
    gestational_age: string;
    fetal_heart_rate: string;
    notes: string;
    next_checkup?: string;
    updated_at: string;
}

const PregnancyCheckupHistoryPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [expandedItems, setExpandedItems] = useState(new Set());

    const checkupRecords: CheckupRecord[] = [
        {
            id: 1,
            date: '2024-10-05',
            type: 'rutin',
            doctor: 'dr. Sarah Wijaya, Sp.OG',
            faskes: 'Puskesmas Wonokromo',
            diagnosis: 'Kehamilan Normal',
            blood_pressure: '120/80 mmHg',
            weight: 62.5,
            gestational_age: '24 minggu',
            fetal_heart_rate: '145 bpm',
            notes: 'Kondisi ibu dan janin sehat. Tidak ada keluhan. Disarankan untuk tetap mengonsumsi vitamin kehamilan.',
            next_checkup: '2024-11-05',
            updated_at: '2024-10-05 10:30:00',
        },
        {
            id: 2,
            date: '2024-09-28',
            type: 'sakit',
            doctor: 'dr. Ahmad Ridwan, Sp.OG',
            faskes: 'Puskesmas Gubeng',
            complaint: 'Mual dan muntah berlebihan, pusing',
            diagnosis: 'Hiperemesis Gravidarum Ringan',
            blood_pressure: '110/70 mmHg',
            weight: 60.0,
            gestational_age: '23 minggu',
            fetal_heart_rate: '142 bpm',
            notes: 'Diberikan obat anti mual dan vitamin B6. Disarankan untuk makan porsi kecil tapi sering, dan istirahat cukup.',
            updated_at: '2024-09-28 14:15:00',
        },
        {
            id: 3,
            date: '2024-09-05',
            type: 'rutin',
            doctor: 'dr. Sarah Wijaya, Sp.OG',
            faskes: 'Puskesmas Wonokromo',
            diagnosis: 'Kehamilan Normal',
            blood_pressure: '115/75 mmHg',
            weight: 61.0,
            gestational_age: '20 minggu',
            fetal_heart_rate: '140 bpm',
            notes: 'Hasil USG menunjukkan perkembangan janin normal. Disarankan melakukan pemeriksaan rutin bulan depan.',
            next_checkup: '2024-10-05',
            updated_at: '2024-09-05 09:45:00',
        },
        {
            id: 4,
            date: '2024-08-20',
            type: 'sakit',
            doctor: 'dr. Lisa Kartika, Sp.OG',
            faskes: 'RS Ibu dan Anak',
            complaint: 'Nyeri perut bawah, keluar flek',
            diagnosis: 'Threatened Abortion',
            blood_pressure: '125/85 mmHg',
            weight: 59.5,
            gestational_age: '18 minggu',
            fetal_heart_rate: '138 bpm',
            notes: 'Diberikan obat penguat kandungan dan disarankan bed rest total. Kontrol kembali 3 hari kemudian.',
            updated_at: '2024-08-20 16:20:00',
        },
        {
            id: 5,
            date: '2024-08-05',
            type: 'rutin',
            doctor: 'dr. Sarah Wijaya, Sp.OG',
            faskes: 'Puskesmas Wonokromo',
            diagnosis: 'Kehamilan Normal',
            blood_pressure: '118/76 mmHg',
            weight: 58.0,
            gestational_age: '16 minggu',
            fetal_heart_rate: '144 bpm',
            notes: 'Pemeriksaan rutin berjalan lancar. Ibu diminta untuk rutin mengonsumsi tablet tambah darah.',
            next_checkup: '2024-09-05',
            updated_at: '2024-08-05 11:00:00',
        },
    ];

    const filteredRecords = checkupRecords.filter((record) => {
        const matchesType =
            typeFilter === 'all' ? true : record.type === typeFilter;
        const matchesSearch = (
            record.doctor +
            record.diagnosis +
            (record.complaint || '') +
            record.faskes
        )
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        return matchesType && matchesSearch;
    });

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
        if (type === 'rutin') {
            return 'bg-green-100 text-green-700 hover:bg-green-100';
        }
        return 'bg-red-100 text-red-700 hover:bg-red-100';
    };

    const getTypeLabel = (type: string) => {
        return type === 'rutin' ? 'Pemeriksaan Rutin' : 'Pemeriksaan Sakit';
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
                            Total Kunjungan: {checkupRecords.length}
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
                                    placeholder="Cari dokter, diagnosis, atau faskes..."
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
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Badge
                                                className={getTypeBadge(
                                                    record.type,
                                                )}
                                            >
                                                {getTypeLabel(record.type)}
                                            </Badge>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(record.date)}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                                {record.diagnosis}
                                            </h3>
                                            {record.complaint && (
                                                <p className="mb-2 text-sm text-red-600">
                                                    Keluhan: {record.complaint}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-gray-400" />
                                                <span>{record.doctor}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Stethoscope className="h-4 w-4 text-gray-400" />
                                                <span>{record.faskes}</span>
                                            </div>
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
                                                    {record.blood_pressure}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Berat Badan
                                                </p>
                                                <p className="text-gray-600">
                                                    {record.weight} kg
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Usia Kehamilan
                                                </p>
                                                <p className="text-gray-600">
                                                    {record.gestational_age}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Detak Jantung Janin
                                                </p>
                                                <p className="text-gray-600">
                                                    {record.fetal_heart_rate}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 border-t border-gray-200 pt-4">
                                            <p className="font-medium text-gray-900">
                                                Catatan Dokter
                                            </p>
                                            <p className="mt-1 text-gray-600">
                                                {record.notes}
                                            </p>
                                        </div>

                                        {record.next_checkup && (
                                            <div className="mt-4 rounded-md bg-green-50 p-3">
                                                <p className="font-medium text-green-900">
                                                    Jadwal Kontrol Berikutnya
                                                </p>
                                                <p className="text-green-700">
                                                    {formatDate(
                                                        record.next_checkup,
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
                        <Card className="shadow-sm">
                            <CardContent className="flex flex-col items-center py-12 text-center">
                                <ClipboardList className="mb-3 h-12 w-12 text-gray-400" />
                                <p className="text-lg font-medium text-gray-900">
                                    Tidak ada data pemeriksaan
                                </p>
                                <p className="mt-1 text-gray-500">
                                    Belum ada riwayat pemeriksaan yang sesuai
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

export default PregnancyCheckupHistoryPage;
