import { PatientKehamilanProfileHeader } from '@/Components/partials/petugas/pemeriksaan/kehamilan/PatientKehamilanProfileHeader';
import TabsPemeriksaanKehamilan from '@/Components/partials/petugas/pemeriksaan/kehamilan/TabsPemeriksaanKehamilan';
import TabsPerkembanganKehamilan from '@/Components/partials/petugas/pemeriksaan/kehamilan/TabsPerkembanganKehamilan';
import TabsRiwayatSakitKehamilan from '@/Components/partials/petugas/pemeriksaan/kehamilan/TabsRiwayatSakitKehamilan';
import { PatientProfileHeader } from '@/Components/patient-profile-header';
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
import { Activity, Clock, History, Stethoscope } from 'lucide-react';
import { useState } from 'react';

interface LabTest {
    id: string;
    namaTes: string;
    hasilLab: string;
    satuan: string;
    status: string;
}
interface Props {
    pregnant: any;
    checkupHistory: any[];
    sickHistory: any[];
    growth: any[];

}
const PregnancyCheckupPage = ({
    pregnant,
    checkupHistory,
    growth,
    sickHistory,

}: Props) => {

    const [activeTab, setActiveTab] = useState('checkup');

    const [labTests, setLabTests] = useState<LabTest[]>([
        { id: '1', namaTes: '', hasilLab: '', satuan: '', status: '' },
    ]);

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
              
            </div>

            {/* Patient Profile Header */}
            <PatientKehamilanProfileHeader pregnant={pregnant} />

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
                                value="pregnancy-development"
                                className="bg-white"
                            >
                                <div className="flex items-center gap-2">
                                    <Activity className="h-4 w-4" />
                                    <span>Grafik Perkembangan Janin</span>
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
                            value="pregnancy-development"
                            className="data-[state=inactive]:text-muted-foreground flex items-center gap-2 px-4 py-4 text-base font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <Activity className="h-5 w-5" />
                            Grafik Perkembangan Janin
                        </TabsTrigger>
                    </TabsList>

                    {/* Checkup Tab */}
                    <TabsPemeriksaanKehamilan pregnant={pregnant} />
                    <TabsRiwayatSakitKehamilan sickHistory={sickHistory} />
                    <TabsPerkembanganKehamilan
                        growth={growth}
                        pregnant={pregnant}
                    />

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
