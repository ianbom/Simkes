import CardHero from '@/Components/partials/petugas/dashboard/CardHero';
import OnlinePatientQueueCard from '@/Components/partials/petugas/dashboard/OnlinePatientQueueCard';
import PatientQueueCard from '@/Components/partials/petugas/dashboard/PatientQueueCard';
import QuickStats from '@/Components/partials/petugas/dashboard/QuickStats';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Search } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { differenceInDays, parseISO } from "date-fns";

// ✅ Import komponen modal
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/Components/ui/dialog';
import CreateAnakForm from '@/Components/Pasien/CreateAnakForm';


interface PregnantCheckup {
    id: number;
    jenis_pemeriksaan: string;
    tanggal_checkup: string;
    keluhan?: string;
}

interface ChildCheckup {
    id: number;
    jenis_kunjungan: string;
    tanggal_pemeriksaan: string;
    berat_badan_kg?: string;
    tinggi_badan_cm?: string;
}

interface DashboardPetugasPageProps {
    lastestPregnantPatients: PregnantCheckup[];
    lastestChildPatients: ChildCheckup[];
    consulQueue: any[];
    childPatient?: any[];
    patientPregnant?: any[];
    patient?: any[];
}

export default function DashboardPetugasPage({
    lastestPregnantPatients,
    lastestChildPatients,
    consulQueue,
    childPatient,
    patientPregnant,
    patient,
}: DashboardPetugasPageProps) {

    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateAnakOpen, setIsCreateAnakOpen] = useState(false);

    const handleSearch = () => {
        if (!searchQuery.trim()) return;
        router.get(route('petugas.dashboard.index'), { patient_nik: searchQuery }, {
            preserveState: true,
            onSuccess: () => {
                setIsModalOpen(true);
            },
        });
    };

    const handleStartExamination = (patientId: string | number) => {
        console.log('Starting examination for patient:', patientId);
    };

    const handleViewDetails = (patientId: string | number) => {
        console.log('Viewing details for patient:', patientId);
    };

    // 🔹 Data Pasien Hamil
    const pregnantPatients = lastestPregnantPatients.map((p) => ({
        id: `pregnant-${p.id}`,
        name: `Ibu ${p.id}`,
        time: p.tanggal_checkup,
        type: `ANC - ${p.jenis_pemeriksaan}`,
        status: 'waiting' as const,
        notes: p.keluhan ?? '',
        isPregnant: true,
    }));

    // 🔹 Data Anak
    const childPatients = lastestChildPatients.map((c) => ({
        id: `child-${c.id}`,
        name: `Anak ${c.id}`,
        time: c.tanggal_pemeriksaan,
        type: `Kunjungan - ${c.jenis_kunjungan}`,
        status: 'waiting' as const,
        notes: `BB: ${c.berat_badan_kg}kg | TB: ${c.tinggi_badan_cm}cm`,
        isPregnant: false,
    }));

    // 🔹 Data Konsultasi Online
    const onlinePatients = consulQueue.map((c) => {
        let name = c.pasien?.name ?? 'Pasien';
        let type = 'Konsultasi Umum';

        if (c.anak) {
            name = c.anak.nama ?? name;
            type = 'Konsultasi Anak';
        }

        if (c.kehamilan) {
            type = 'Konsultasi Ibu Hamil';
        }

        return {
            id: String(c.id),
            name,
            time: c.waktu_mulai_dijadwalkan,
            type,
            status:
                c.status_sesi === 'Dikonfirmasi'
                    ? ('waiting' as const)
                    : ('in-progress' as const),
            phone: c.pasien?.no_telp,
            notes: `Durasi: ${c.durasi_menit} menit | Link: ${c.link_video_conference}`,
            isPregnant: !!c.kehamilan,
        };
    });

    // 🔹 Gabungan Pasien (offline)
    const allPatients = [...pregnantPatients, ...childPatients];

    // 🔹 Jika hasil pencarian ditemukan
    const hasSearchResults =
        (childPatient && childPatient.length > 0) ||
        (patientPregnant && patientPregnant.length > 0);

    return (
        <div className="px-4 py-6 pb-20 lg:px-8 lg:pb-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="font-heading text-foreground text-2xl font-bold">
                            Dashboard Petugas Faskes
                        </h1>
                    </div>
                </div>
                <CardHero />
            </div>

            {/* Quick Stats */}
            <QuickStats />

            {/* Patient Search */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5" />
                        Cari Pasien
                    </CardTitle>
                    <CardDescription>
                        Cari pasien berdasarkan NIK
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Masukkan NIK pasien"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <Button
                            onClick={handleSearch}
                            className="bg-primary text-white hover:bg-primary/90"
                        >
                            <Search className="mr-2 h-4 w-4" />
                            Cari
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* 🔹 Modal hasil pencarian pasien */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent
                    className="w-[90vw] max-w-6xl bg-white text-black rounded-2xl shadow-xl border border-gray-200"
                >
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-black">
                            Hasil Pencarian Pasien
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 text-base">
                            Menampilkan hasil pencarian berdasarkan NIK:{" "}
                            <span className="font-semibold text-black">{searchQuery}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* === Kolom Kehamilan === */}
                        <div className="pr-4 border-r border-gray-200">
                            <div className="flex items-center justify-between mb-4 border-b pb-2">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    🤰 Kehamilan
                                </h3>
                                <Button
                                    size="sm"
                                    className="bg-green-500 text-white hover:bg-green-600"
                                    onClick={() => console.log("Tambah Kehamilan diklik")}
                                >
                                    + Kehamilan
                                </Button>
                            </div>

                            {patientPregnant && patientPregnant.length > 0 ? (
                                patientPregnant.map((p) => {
                                    const createdAt = parseISO(p.created_at);
                                    const usiaHari = differenceInDays(new Date(), createdAt);

                                    return (
                                        <div
                                            key={p.id}
                                            className="border border-gray-300 p-5 rounded-lg mb-4 bg-gray-50 hover:bg-gray-100 transition"
                                        >
                                            <p><span className="font-medium">ID: </span>{p.id}</p>
                                            <p><span className="font-medium">Kehamilan ke: </span>{p.kehamilan_ke ?? "-"}</p>
                                            <p><span className="font-medium">Jumlah Janin: </span>{p.jumlah_janin ?? "-"}</p>
                                            <p><span className="font-medium">Status: </span>{p.status ?? "Tidak diketahui"}</p>
                                            <p><span className="font-medium">Usia: </span>{usiaHari} hari sejak pencatatan</p>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-500 text-sm mt-2">
                                    Tidak ada data kehamilan.
                                </p>
                            )}
                        </div>

                        {/* === Kolom Anak === */}
                        <div className="pl-4">
                            <div className="flex items-center justify-between mb-4 border-b pb-2">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    👶 Anak
                                </h3>
                                <Button
                                    size="sm"
                                    className="bg-blue-500 text-white hover:bg-blue-600"
                                    onClick={() => setIsCreateAnakOpen(true)}
                                >
                                    + Anak
                                </Button>
                            </div>

                            {childPatient && childPatient.length > 0 ? (
                                childPatient.map((c) => {
                                    const createdAt = parseISO(c.created_at);
                                    const usiaHari = differenceInDays(new Date(), createdAt);

                                 return (
                                    <div
                                        key={c.id}
                                        onClick={() => router.get(route('petugas.create.pemeriksaanAnak', { id: c.id }))}
                                        className="cursor-pointer border border-gray-300 p-5 rounded-lg mb-4 bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p>
                                                    <span className="font-medium">Nama: </span>{c.nama}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Kelamin: </span>
                                                    {c.kelamin === "L" ? "Laki-laki" : c.kelamin === "P" ? "Perempuan" : "-"}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Usia: </span>
                                                    {usiaHari} hari sejak pencatatan
                                                </p>
                                            </div>


                                        </div>
                                    </div>
                                );

                                })
                            ) : (
                                <p className="text-gray-500 text-sm mt-2">
                                    Tidak ada data anak.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end mt-8">
                        <Button
                            variant="outline"
                            className="border-gray-400 text-black hover:bg-gray-200 px-6 py-2 rounded-lg"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Tutup
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* 🔹 Modal Create Anak */}
            <Dialog open={isCreateAnakOpen} onOpenChange={setIsCreateAnakOpen}>
                <DialogContent className="max-w-2xl bg-white text-black rounded-xl shadow-lg border border-gray-200">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-black">
                            Tambah Data Anak
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Lengkapi informasi anak berikut dengan benar.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4">
                        <CreateAnakForm patient={patient}/>
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button
                            variant="outline"
                            className="border-gray-400 text-black hover:bg-gray-200"
                            onClick={() => setIsCreateAnakOpen(false)}
                        >
                            Tutup
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* 🔹 Default Tampilan (tanpa pencarian) */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <PatientQueueCard
                    patients={allPatients}
                    onStartExamination={handleStartExamination}
                    onViewDetails={handleViewDetails}
                />
                <OnlinePatientQueueCard
                    patients={onlinePatients}
                    onStartExamination={(id) => console.log('Start Online', id)}
                    onViewDetails={(id) => console.log('Detail Online', id)}
                />
            </div>
        </div>
    );
}
