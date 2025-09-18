import CardHero from '@/Components/partials/petugas/dashboard/CardHero';
import PatientQueueCard from '@/Components/partials/petugas/dashboard/PatientQueueCard';
import QuickActions from '@/Components/partials/petugas/dashboard/QuickActions';
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
import { Activity, AlertTriangle, Bell, Clock, Search } from 'lucide-react';
import { useState } from 'react';

const mockPatients = [
    {
        id: '1',
        name: 'Sarah Johnson',
        time: '09:00 AM',
        type: 'ANC',
        status: 'waiting' as const,
        phone: '+1234567890',
        isPregnant: true,
        notes: 'First trimester checkup',
    },
    {
        id: '2',
        name: 'Michael Chen',
        time: '09:30 AM',
        type: 'Child Checkup',
        status: 'in-progress' as const,
        phone: '+1234567891',
        notes: '2-year-old routine vaccination',
    },
    {
        id: '3',
        name: 'Emma Davis',
        time: '10:00 AM',
        type: 'General',
        status: 'waiting' as const,
        phone: '+1234567892',
        notes: 'Follow-up for hypertension',
    },
    {
        id: '4',
        name: 'James Wilson',
        time: '10:30 AM',
        type: 'Follow-up',
        status: 'completed' as const,
        phone: '+1234567893',
    },
];

const mockNotifications = [
    {
        id: '1',
        type: 'urgent' as const,
        title: 'Abnormal Lab Results',
        patient: 'Maria Rodriguez',
        time: '2 hours ago',
        description: 'High blood pressure reading requires immediate attention',
    },
    {
        id: '2',
        type: 'info' as const,
        title: 'Prescription Refill',
        patient: 'John Smith',
        time: '4 hours ago',
        description: 'Diabetes medication refill approved',
    },
    {
        id: '3',
        type: 'warning' as const,
        title: 'Missed Appointment',
        patient: 'Lisa Brown',
        time: '1 day ago',
        description: 'Follow-up appointment needs rescheduling',
    },
];

const DashboardPetugasPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [patients] = useState(mockPatients);
    const [notifications] = useState(mockNotifications);

    const handleStartExamination = (patientId: string) => {
        console.log('Starting examination for patient:', patientId);
    };

    const handleViewDetails = (patientId: string) => {
        console.log('Viewing details for patient:', patientId);
    };

    const handleSearch = () => {
        console.log('Searching for:', searchQuery);
    };

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
                    {/* <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                    </div> */}
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
                        Search for walk-in patients or scheduled appointments
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Search by name, ID, or phone number..."
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
                            Search
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Patient Queue */}
                <div className="lg:col-span-2">
                    <PatientQueueCard
                        patients={patients}
                        onStartExamination={handleStartExamination}
                        onViewDetails={handleViewDetails}
                    />
                </div>
                {/* Right sidebar with notifications and quick actions */}
                <div className="space-y-6">
                    <QuickActions />
                    {/* Clinical Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Clinical Notifications
                            </CardTitle>
                            <CardDescription>
                                Important alerts and lab results
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className="bg-muted hover:bg-muted/80 flex cursor-pointer gap-3 rounded-lg p-3 transition-colors"
                                    >
                                        <div className="mt-1 flex-shrink-0">
                                            {notification.type === 'urgent' && (
                                                <AlertTriangle className="text-destructive h-5 w-5" />
                                            )}
                                            {notification.type === 'info' && (
                                                <Activity className="h-5 w-5 text-primary" />
                                            )}
                                            {notification.type ===
                                                'warning' && (
                                                <Clock className="h-5 w-5 text-yellow-600" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-foreground font-medium">
                                                    {notification.title}
                                                </p>
                                                <span className="text-muted-foreground text-xs">
                                                    {notification.time}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground mb-1 text-sm">
                                                {notification.patient}
                                            </p>
                                            <p className="text-foreground text-sm">
                                                {notification.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPetugasPage;
