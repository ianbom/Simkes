import { PatientProfileHeader } from '@/Components/partials/petugas/pemeriksaan/anak/PatientProfileHeader';
import TabsPemeriksaanAnak from '@/Components/partials/petugas/pemeriksaan/anak/TabsPemeriksaanAnak';
import TabsPerkembanganAnak from '@/Components/partials/petugas/pemeriksaan/anak/TabsPerkembanganAnak';
import TabsRiwayatSakit from '@/Components/partials/petugas/pemeriksaan/anak/TabsRiwayatSakitAnak';
import { Badge } from '@/Components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Activity, Clock, History, Stethoscope } from 'lucide-react';
import { useState } from 'react';

const mockPatient = {
    id: '1217979',
    name: 'Sarah Johnson',
    age: 3,
    kelamin: 'P',
    patientId: 'P-2024-001',
    phone: '+1234567890',
    address: 'Surabaya, Jawa Timur, Indonesia',
    emergencyContact: 'John Johnson - +1234567891',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    currentMedications: ['Prenatal vitamins', 'Folic acid'],
    lastVisit: '2024-01-15',
    photo: '/assets/images/profile-8.jpeg',
    appointmentType: 'ANC',
    appointmentTime: '09:00 AM',
    chiefComplaint: 'Routine prenatal checkup',
};
interface Props {
    child: any;
    checkupHistory: any[];
    sickHistory: any[];
    growth: any[];
}
const ChildCheckupPage = ({
    child,
    checkupHistory,
    sickHistory,
    growth,
}: Props) => {
    const [patient] = useState(mockPatient);
    const [activeTab, setActiveTab] = useState('checkup');

    return (
        <div className="px-4 py-6 pb-20 lg:px-8 lg:pb-6">
            {/* Header */}
            <div className="mb-6">
                <div className="mb-4 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <h1 className="font-heading text-foreground text-2xl font-bold">
                            Ruang Pemeriksaan Offline{' '}
                        </h1>
                    </div>
                </div>
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {patient.appointmentTime}
                    </span>
                    <Badge variant="outline">{patient.appointmentType}</Badge>
                    <span>Room 1</span>
                </div>
            </div>

            {/* Patient Profile Header */}
            <PatientProfileHeader child={child} patientType="child" />

            {/* Tabs Section */}
            <div className="mt-8">
                {/* Mobile: Dropdown */}
                <div className="mb-4 block md:hidden">
                    <Select value={activeTab} onValueChange={setActiveTab}>
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="checkup" className="bg-white">
                                <div className="flex items-center gap-2">
                                    <Stethoscope className="h-4 w-4" />
                                    <span>Checkup</span>
                                </div>
                            </SelectItem>
                            <SelectItem
                                value="medical-history"
                                className="bg-white"
                            >
                                <div className="flex items-center gap-2">
                                    <History className="h-4 w-4" />
                                    <span>Riwayat Sakit</span>
                                </div>
                            </SelectItem>
                            <SelectItem
                                value="child-development"
                                className="bg-white"
                            >
                                <div className="flex items-center gap-2">
                                    <Activity className="h-4 w-4" />
                                    <span>Grafik Perkembangan Anak</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Desktop: Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <TabsList className="bg-muted/50 hidden w-full justify-start rounded-lg border bg-white px-3 py-7 md:inline-flex">
                        <TabsTrigger
                            value="checkup"
                            className="data-[state=inactive]:text-muted-foreground flex items-center gap-2 px-4 py-4 text-base font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <Stethoscope className="h-5 w-5" />
                            Checkup
                        </TabsTrigger>
                        <TabsTrigger
                            value="medical-history"
                            className="data-[state=inactive]:text-muted-foreground flex items-center gap-2 px-4 py-4 text-base font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <History className="h-5 w-5" />
                            Riwayat Sakit
                        </TabsTrigger>
                        <TabsTrigger
                            value="child-development"
                            className="data-[state=inactive]:text-muted-foreground flex items-center gap-2 px-4 py-4 text-base font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <Activity className="h-5 w-5" />
                            Grafik Perkembangan Anak
                        </TabsTrigger>
                    </TabsList>

                    <TabsPemeriksaanAnak child={child} />
                    <TabsRiwayatSakit sickHistory={sickHistory} />
                    <TabsPerkembanganAnak growth={growth} child={child} />
                </Tabs>
            </div>
        </div>
    );
};

export default ChildCheckupPage;
