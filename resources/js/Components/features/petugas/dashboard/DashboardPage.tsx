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
import { useState } from 'react';

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
    consulQueue : any[]
}

const DashboardPetugasPage = ({
    lastestPregnantPatients,
    lastestChildPatients,
    consulQueue
}: DashboardPetugasPageProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleStartExamination = (patientId: string | number) => {
        console.log('Starting examination for patient:', patientId);
    };

    const handleViewDetails = (patientId: string | number) => {
        console.log('Viewing details for patient:', patientId);
    };

    const handleSearch = () => {
        console.log('Searching for:', searchQuery);
    };

    const pregnantPatients = lastestPregnantPatients.map((p) => ({
        id: `pregnant-${p.id}`,
        name: `Ibu ${p.id}`,
        time: p.tanggal_checkup,
        type: `ANC - ${p.jenis_pemeriksaan}`,
        status: 'waiting' as const,
        notes: p.keluhan ?? '',
        isPregnant: true,
    }));

    const childPatients = lastestChildPatients.map((c) => ({
        id: `child-${c.id}`,
        name: `Anak ${c.id}`,
        time: c.tanggal_pemeriksaan,
        type: `Kunjungan - ${c.jenis_kunjungan}`,
        status: 'waiting' as const,
        notes: `BB: ${c.berat_badan_kg}kg | TB: ${c.tinggi_badan_cm}cm`,
        isPregnant: false,
    }));

    // 🔹 Gabungkan jadi satu array
    const allPatients = [...pregnantPatients, ...childPatients];

     const onlinePatients = consulQueue.map((c) => {
    let name = c.pasien?.name ?? "Pasien";
    let type = "Konsultasi Umum";

    // Jika ada data anak
    if (c.anak) {
      name = c.anak.nama ?? name;
      type = "Konsultasi Anak";
    }

    // Jika ada data kehamilan
    if (c.kehamilan) {
      type = "Konsultasi Ibu Hamil";
    }

    return {
      id: String(c.id),
      name,
      time: c.waktu_mulai_dijadwalkan,
      type,
      status: c.status_sesi === "Dikonfirmasi" ? ("waiting" as const) : ("in-progress" as const),
      phone: c.pasien?.no_telp,
      notes: `Durasi: ${c.durasi_menit} menit | Link: ${c.link_video_conference}`,
      isPregnant: !!c.kehamilan,
    };
  });

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
                        Cari pasien walk-in atau pasien dengan janji temu
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Cari berdasarkan nama, ID, atau no telp..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <Button
                            onClick={handleSearch}
                            className="bg-gray-200 hover:text-white"
                        >
                            <Search className="mr-2 h-4 w-4" />
                            Cari
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Patient Queue (Ibu & Anak gabung) */}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Ibu Hamil */}
                 <PatientQueueCard
                patients={allPatients}
                onStartExamination={handleStartExamination}
                onViewDetails={handleViewDetails}
            />

                {/* Anak */}
                 <OnlinePatientQueueCard
                  patients={onlinePatients}
                  onStartExamination={(id) => console.log("Start Online", id)}
                  onViewDetails={(id) => console.log("Detail Online", id)}
                />
            </div>
        </div>
    );
};

export default DashboardPetugasPage;
