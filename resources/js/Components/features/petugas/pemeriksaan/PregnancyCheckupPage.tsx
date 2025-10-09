
import TabsPemeriksaanKehamilan from '@/Components/partials/petugas/pemeriksaan/TabsPemeriksaanKehamilan';
import { Badge } from '@/Components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import {
    Activity,
    Clock,
    History,
    Stethoscope,
    TrendingUp,

} from 'lucide-react';
import { useState } from 'react';

const mockPatient = {
    id: '1217979',
    name: 'Hamil Sarah Johnson',
    age: 32,
    isPregnant: true,
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
    pregnancyWeek: '12',
    chiefComplaint: 'Routine prenatal checkup',
};
interface LabTest {
    id: string;
    namaTes: string;
    hasilLab: string;
    satuan: string;
    status: string;
}
const PregnancyCheckupPage = ({pregnant}) => {
    const [patient] = useState(mockPatient);
    const [activeTab, setActiveTab] = useState('checkup');

    const [labTests, setLabTests] = useState<LabTest[]>([
        { id: '1', namaTes: '', hasilLab: '', satuan: '', status: '' },
    ]);


    return (
        <div className="px-4 py-6 pb-20 lg:px-8 lg:pb-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold font-heading text-foreground">
                            Ruang Pemeriksaan Offline{' '}
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {patient.appointmentTime}
                    </span>
                    <Badge variant="outline">{patient.appointmentType}</Badge>
                    <span>Room 1</span>
                </div>
            </div>

            {/* Patient Profile Header */}
            {/* <PatientProfileHeader patient={patient} patientType="pregnancy" /> */}

            {/* Tabs Section */}
            <div className="mt-8">
                {/* Mobile: Dropdown */}
                <div className="block mb-4 md:hidden">
                    <Select value={activeTab} onValueChange={setActiveTab}>
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="checkup" className="bg-white">
                                <div className="flex items-center gap-2">
                                    <Stethoscope className="w-4 h-4" />
                                    <span>Checkup</span>
                                </div>
                            </SelectItem>
                            <SelectItem
                                value="medical-history"
                                className="bg-white"
                            >
                                <div className="flex items-center gap-2">
                                    <History className="w-4 h-4" />
                                    <span>Riwayat Sakit</span>
                                </div>
                            </SelectItem>
                            <SelectItem
                                value="child-development"
                                className="bg-white"
                            >
                                <div className="flex items-center gap-2">
                                    <Activity className="w-4 h-4" />
                                    <span>Riwayat Perkembangan Janin</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="charts" className="bg-white">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>Grafik</span>
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
                    <TabsList className="justify-start hidden w-full px-3 bg-white border rounded-lg bg-muted/50 py-7 md:inline-flex">
                        <TabsTrigger
                            value="checkup"
                            className="data-[state=inactive]:text-muted-foreground flex items-center gap-2 px-4 py-4 text-base font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <Stethoscope className="w-5 h-5" />
                            Checkup
                        </TabsTrigger>
                        <TabsTrigger
                            value="medical-history"
                            className="data-[state=inactive]:text-muted-foreground flex items-center gap-2 px-4 py-4 text-base font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <History className="w-5 h-5" />
                            Riwayat Sakit
                        </TabsTrigger>
                        <TabsTrigger
                            value="child-development"
                            className="data-[state=inactive]:text-muted-foreground flex items-center gap-2 px-4 py-4 text-base font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <Activity className="w-5 h-5" />
                            Riwayat Perkembangan Janin
                        </TabsTrigger>
                        <TabsTrigger
                            value="charts"
                            className="data-[state=inactive]:text-muted-foreground flex items-center gap-2 px-4 py-4 text-base font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <TrendingUp className="w-5 h-5" />
                            Grafik
                        </TabsTrigger>
                    </TabsList>

                    {/* Checkup Tab */}
                   <TabsPemeriksaanKehamilan pregnant={pregnant}/>

                    {/* Medical History Tab */}
                    <TabsContent
                        value="medical-history"
                        className="mt-6 bg-white"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Riwayat Sakit</CardTitle>
                                <CardDescription>
                                    History of patient's medical conditions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Medical history content will be displayed
                                    here.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Child Development Tab */}
                    <TabsContent
                        value="child-development"
                        className="mt-6 bg-white"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Riwayat Perkembangan Janin
                                </CardTitle>
                                <CardDescription>
                                    Child development tracking and milestones
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Child development history will be displayed
                                    here.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Charts Tab */}
                    <TabsContent value="charts" className="mt-6 bg-white">
                        <Card>
                            <CardHeader>
                                <CardTitle>Grafik</CardTitle>
                                <CardDescription>
                                    Visual charts and growth tracking
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Charts and graphs will be displayed here.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default PregnancyCheckupPage;
