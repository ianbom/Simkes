import { PatientQueueCard } from '@/Components/patient-queue-card';
import { QuickActions } from '@/Components/quick-actions';
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
import {
    Activity,
    AlertTriangle,
    Bell,
    Clock,
    Filter,
    Search,
    Stethoscope,
    UserCheck,
    Users,
    Video,
} from 'lucide-react';
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

export default function DashboardPageRoute({ user }) {
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

    const stats = [
        {
            title: "Today's Patients",
            value: patients.length,
            icon: Users,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
        },
        {
            title: 'Online Sessions',
            value: 8,
            icon: Video,
            color: 'text-secondary',
            bgColor: 'bg-secondary/10',
        },
        {
            title: 'Pending',
            value: patients.filter((p) => p.status === 'waiting').length,
            icon: Clock,
            color: 'text-accent',
            bgColor: 'bg-accent/10',
        },
        {
            title: 'Completed',
            value: patients.filter((p) => p.status === 'completed').length,
            icon: UserCheck,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
        },
    ];

    return (
        <PetugasLayout user={user}>
            <div className="px-4 py-6 pb-20 lg:px-8 lg:pb-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="font-heading text-foreground text-3xl font-bold">
                                Dashboard Petugas Faskes
                            </h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </div>
                    </div>
                    <Card className="border-blue-200 bg-gradient-to-r from-blue-500 to-indigo-900 transition-shadow hover:shadow-lg">
                        <CardContent className="p-6">
                            <div className="mb-4 flex items-center">
                                <div className="">
                                    <p className="text-3xl font-bold text-white">
                                        Selamat datang, Petugas Faskes Argya Dwi
                                    </p>
                                    <p className="text-md mt-1 font-extralight text-gray-200">
                                        Anda punya 8 appointments hari ini dan 3
                                        pesan penting untuk segera
                                        ditindaklanjuti.{' '}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-medium text-white opacity-50 transition-colors duration-200 hover:bg-blue-700">
                                    <Stethoscope className="mr-2 h-4 w-4" />
                                    Mulai Pemeriksaan
                                </button>
                                <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-medium text-primary transition-colors duration-200 hover:bg-green-700">
                                    <Video className="mr-2 h-4 w-4" />
                                    Konsultasi
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Stats */}
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            className="transition-shadow hover:shadow-md"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <div
                                        className={`flex-shrink-0 rounded-lg p-3 ${stat.bgColor}`}
                                    >
                                        <stat.icon
                                            className={`h-6 w-6 ${stat.color}`}
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-muted-foreground text-sm font-medium">
                                            {stat.title}
                                        </p>
                                        <p className="text-foreground text-2xl font-bold">
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Patient Search */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Search className="h-5 w-5" />
                            Cari Pasien
                        </CardTitle>
                        <CardDescription>
                            Search for walk-in patients or scheduled
                            appointments
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Search by name, ID, or phone number..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
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
                    {/* Patient Queue - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <PatientQueueCard
                            patients={patients}
                            onStartExamination={handleStartExamination}
                            onViewDetails={handleViewDetails}
                        />
                    </div>

                    {/* Right sidebar with notifications and quick actions */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
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
                                                {notification.type ===
                                                    'urgent' && (
                                                    <AlertTriangle className="text-destructive h-5 w-5" />
                                                )}
                                                {notification.type ===
                                                    'info' && (
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
        </PetugasLayout>
    );
}
