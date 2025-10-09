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
import PetugasLayout from '@/Layouts/PetugasLayout';
import { ArrowUpDown, Calendar, Clock, Filter } from 'lucide-react';
import { useMemo, useState } from 'react';

type Jadwal = {
    id: number;
    petugas_faskes_id: number;
    tanggal: string; // "YYYY-MM-DD"
    jam_mulai: string; // "HH:mm:ss"
    jam_selesai: string; // "HH:mm:ss"
    status_ketersediaan: 'Tersedia' | 'Penuh';
    created_at: string;
    updated_at: string;
};

interface ListJadwalKetersediaanPageProps {
    user: {
        id: number;
        name: string;
        email?: string;
    };
    schedule: Jadwal[];
}

export default function ListJadwalKetersediaanPageRoute({
    user,
    schedule,
}: ListJadwalKetersediaanPageProps) {
    // Filters & Ordering state
    const [statusFilter, setStatusFilter] = useState<
        'all' | 'Tersedia' | 'Penuh'
    >('all');
    const [dateFilter, setDateFilter] = useState<string>(''); // YYYY-MM-DD
    const [orderBy, setOrderBy] = useState<
        | 'date_desc'
        | 'date_asc'
        | 'start_time_asc'
        | 'start_time_desc'
        | 'end_time_asc'
        | 'end_time_desc'
    >('date_desc');

    // Helpers
    const formatDate = (d: string) => {
        // d: "2025-10-03" -> "03 Oct 2025"
        try {
            const dt = new Date(d + 'T00:00:00');
            return dt.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            });
        } catch {
            return d;
        }
    };

    const formatTime = (t: string) => {
        // "21:49:31" -> "21:49"
        return t?.slice(0, 5);
    };

    const filteredAndSorted = useMemo(() => {
        let data = [...(schedule || [])];

        // Filter by status
        if (statusFilter !== 'all') {
            data = data.filter((s) => s.status_ketersediaan === statusFilter);
        }

        // Filter by date (exact match, opsional bisa dibuat range)
        if (dateFilter) {
            data = data.filter((s) => s.tanggal === dateFilter);
        }

        // Ordering
        const toDateTime = (jadwal: Jadwal, useEnd = false) =>
            new Date(
                `${jadwal.tanggal}T${useEnd ? jadwal.jam_selesai : jadwal.jam_mulai}`,
            );

        switch (orderBy) {
            case 'date_desc':
                data.sort(
                    (a, b) =>
                        new Date(b.tanggal).getTime() -
                        new Date(a.tanggal).getTime(),
                );
                break;
            case 'date_asc':
                data.sort(
                    (a, b) =>
                        new Date(a.tanggal).getTime() -
                        new Date(b.tanggal).getTime(),
                );
                break;
            case 'start_time_asc':
                data.sort(
                    (a, b) => toDateTime(a).getTime() - toDateTime(b).getTime(),
                );
                break;
            case 'start_time_desc':
                data.sort(
                    (a, b) => toDateTime(b).getTime() - toDateTime(a).getTime(),
                );
                break;
            case 'end_time_asc':
                data.sort(
                    (a, b) =>
                        toDateTime(a, true).getTime() -
                        toDateTime(b, true).getTime(),
                );
                break;
            case 'end_time_desc':
                data.sort(
                    (a, b) =>
                        toDateTime(b, true).getTime() -
                        toDateTime(a, true).getTime(),
                );
                break;
            default:
                break;
        }

        return data;
    }, [schedule, statusFilter, dateFilter, orderBy]);

    const getStatusBadge = (status: Jadwal['status_ketersediaan']) => {
        if (status === 'Tersedia') {
            return (
                <Badge className="border-green-200 bg-green-100 text-green-800">
                    {status}
                </Badge>
            );
        }
        return (
            <Badge className="border-red-200 bg-red-100 text-red-800">
                {status}
            </Badge>
        );
    };

    return (
        <PetugasLayout user={user}>
            <div className="px-4 py-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="font-heading text-foreground text-2xl font-bold">
                        Jadwal Ketersediaan
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Kelola dan lihat jadwal ketersediaan konsultasi online
                        Anda.
                    </p>
                </div>

                {/* Filter & Ordering */}
                <Card className="mb-6 bg-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filter & Pengurutan
                        </CardTitle>
                        <CardDescription>
                            Sesuaikan tampilan jadwal Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            {/* Status */}
                            <div className="flex flex-col gap-2">
                                <label className="text-muted-foreground text-sm">
                                    Status Ketersediaan
                                </label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(
                                            e.target
                                                .value as typeof statusFilter,
                                        )
                                    }
                                    className="rounded-md border px-3 py-2 text-sm"
                                >
                                    <option value="all">Semua</option>
                                    <option value="Tersedia">Tersedia</option>
                                    <option value="Penuh">Penuh</option>
                                </select>
                            </div>

                            {/* Tanggal */}
                            <div className="flex flex-col gap-2">
                                <label className="text-muted-foreground text-sm">
                                    Tanggal
                                </label>
                                <Input
                                    type="date"
                                    value={dateFilter}
                                    onChange={(e) =>
                                        setDateFilter(e.target.value)
                                    }
                                />
                            </div>

                            {/* Ordering */}
                            <div className="flex flex-col gap-2">
                                <label className="text-muted-foreground text-sm">
                                    Urutkan Berdasarkan
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={orderBy}
                                        onChange={(e) =>
                                            setOrderBy(
                                                e.target
                                                    .value as typeof orderBy,
                                            )
                                        }
                                        className="w-full rounded-md border px-3 py-2 text-sm"
                                    >
                                        <option value="date_desc">
                                            Tanggal (Terbaru)
                                        </option>
                                        <option value="date_asc">
                                            Tanggal (Terlama)
                                        </option>
                                        <option value="start_time_asc">
                                            Jam Mulai (A-Z)
                                        </option>
                                        <option value="start_time_desc">
                                            Jam Mulai (Z-A)
                                        </option>
                                        <option value="end_time_asc">
                                            Jam Selesai (A-Z)
                                        </option>
                                        <option value="end_time_desc">
                                            Jam Selesai (Z-A)
                                        </option>
                                    </select>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="shrink-0"
                                    >
                                        <ArrowUpDown className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Reset */}
                            <div className="flex items-end">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        setStatusFilter('all');
                                        setDateFilter('');
                                        setOrderBy('date_desc');
                                    }}
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* List Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredAndSorted.length === 0 && (
                        <Card className="bg-white md:col-span-2 xl:col-span-3">
                            <CardContent className="text-muted-foreground p-6 text-center">
                                Tidak ada jadwal yang cocok dengan filter.
                            </CardContent>
                        </Card>
                    )}

                    {filteredAndSorted.map((s) => (
                        <Card key={s.id} className="overflow-hidden bg-white">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center justify-between text-base">
                                    <span className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {formatDate(s.tanggal)}
                                    </span>
                                    {getStatusBadge(s.status_ketersediaan)}
                                </CardTitle>
                                <CardDescription>
                                    ID Jadwal: #{s.id}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="flex flex-col gap-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Jam Mulai
                                        </span>
                                        <span className="flex items-center gap-1 font-medium">
                                            <Clock className="h-4 w-4" />
                                            {formatTime(s.jam_mulai)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Jam Selesai
                                        </span>
                                        <span className="flex items-center gap-1 font-medium">
                                            <Clock className="h-4 w-4" />
                                            {formatTime(s.jam_selesai)}
                                        </span>
                                    </div>
                                </div>

                                {/* (Opsional) Aksi cepat */}
                                {/* <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">Nonaktifkan</Button>
                </div> */}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </PetugasLayout>
    );
}
