import { Badge } from '@/Components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import PetugasLayout from '@/Layouts/PetugasLayout';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Calendar, Clock, Search, Video } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Anak {
    id: number;
    nama: string;
}

interface Pasien {
    id: number;
    name: string;
    no_telp?: string;
}

interface Kehamilan {
    id: number;
}

interface Consul {
    id: number;
    waktu_mulai_dijadwalkan: string;
    durasi_menit: number;
    link_video_conference: string;
    status_sesi: string;
    anak: Anak | null;
    pasien: Pasien;
    kehamilan: Kehamilan | null;
}

interface ListConsultationPageRouteProps {
    user: any;
    consulQueue: Consul[];
}

export default function ListConsultationPageRoute({
    user,
    consulQueue,
}: ListConsultationPageRouteProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredConsultations = useMemo(() => {
        return consulQueue.filter((c) => {
            // 🔎 Search by pasien/anak
            const name =
                c.anak?.nama?.toLowerCase() ||
                c.pasien?.name?.toLowerCase() ||
                '';
            const matchesSearch = name.includes(searchQuery.toLowerCase());

            // 🔎 Filter by status
            const matchesStatus =
                statusFilter === 'all' ||
                c.status_sesi.toLowerCase() === statusFilter.toLowerCase();

            return matchesSearch && matchesStatus;
        });
    }, [consulQueue, searchQuery, statusFilter]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Dikonfirmasi':
                return (
                    <Badge className="border-blue-200 bg-blue-100 text-blue-800">
                        {status}
                    </Badge>
                );
            case 'Berlangsung':
                return (
                    <Badge className="border-yellow-200 bg-yellow-100 text-yellow-800">
                        {status}
                    </Badge>
                );
            case 'Selesai':
                return (
                    <Badge className="border-green-200 bg-green-100 text-green-800">
                        {status}
                    </Badge>
                );
            case 'Batal':
            case 'Tidak Hadir':
                return (
                    <Badge className="border-red-200 bg-red-100 text-red-800">
                        {status}
                    </Badge>
                );
            default:
                return (
                    <Badge className="border-gray-200 bg-gray-100 text-gray-800">
                        {status}
                    </Badge>
                );
        }
    };

    return (
        <PetugasLayout user={user}>
            <div className="px-4 py-6 lg:px-8">
                <h1 className="font-heading mb-6 text-2xl font-bold">
                    Daftar Konsultasi Online
                </h1>

                {/* Filter & Search */}
                <Card className="mb-6 bg-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Search className="h-5 w-5" />
                            Cari & Filter
                        </CardTitle>
                        <CardDescription>
                            Cari berdasarkan nama pasien atau filter status
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Input
                                placeholder="Cari nama pasien..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1"
                            />

                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="rounded-md border px-3 py-2 text-sm"
                            >
                                <option value="all">Semua Status</option>
                                <option value="Dipesan">Dipesan</option>
                                <option value="Dikonfirmasi">
                                    Dikonfirmasi
                                </option>
                                <option value="Berlangsung">Berlangsung</option>
                                <option value="Selesai">Selesai</option>
                                <option value="Batal">Batal</option>
                                <option value="Tidak Hadir">Tidak Hadir</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* List Konsultasi */}
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle>
                            Antrian ({filteredConsultations.length})
                        </CardTitle>
                        <CardDescription>
                            Daftar konsultasi pasien
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredConsultations.map((c) => {
                                const name =
                                    c.anak?.nama || c.pasien?.name || 'Pasien';

                                return (
                                    <div
                                        key={c.id}
                                        className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        {/* Left: Data Pasien */}
                                        <div>
                                            <p className="text-foreground font-semibold">
                                                {name}
                                            </p>
                                            <div className="text-muted-foreground mt-1 flex flex-wrap gap-3 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {c.waktu_mulai_dijadwalkan}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {c.durasi_menit} menit
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs text-blue-600">
                                                {c.link_video_conference}
                                            </p>
                                        </div>

                                        {/* Right: Status & Action */}
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(c.status_sesi)}
                                            {c.link_video_conference && (
                                                <Link
                                                    href={route(
                                                        'petugas.joinMeet',
                                                        c.id,
                                                    )} // route Laravel
                                                >
                                                    <Button
                                                        size="sm"
                                                        className="bg-green-500 text-white hover:bg-green-600"
                                                    >
                                                        <Video className="mr-1 h-4 w-4" />
                                                        Join
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PetugasLayout>
    );
}
