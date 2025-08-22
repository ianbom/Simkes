'use client';

import { Navigation } from '@/Components/partials/Navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Calendar,
    Download,
    Eye,
    FileText,
    Filter,
    Heart,
    Mail,
    MapPin,
    Phone,
    Pill,
    Search,
    TestTube,
    User,
} from 'lucide-react';
import { useState } from 'react';

const patients = [
    {
        id: 1,
        name: 'Sarah Johnson',
        age: 28,
        gender: 'Female',
        phone: '+1 (555) 123-4567',
        email: 'sarah.j@email.com',
        address: '123 Main St, City, State 12345',
        lastVisit: '2024-01-10',
        condition: 'Pregnancy - 32 weeks',
        status: 'active',
        avatar: '/woman-profile.png',
    },
    {
        id: 2,
        name: 'Michael Chen',
        age: 45,
        gender: 'Male',
        phone: '+1 (555) 234-5678',
        email: 'm.chen@email.com',
        address: '456 Oak Ave, City, State 12345',
        lastVisit: '2024-01-08',
        condition: 'Hypertension',
        status: 'active',
        avatar: '/man-profile.png',
    },
    {
        id: 3,
        name: 'Emma Wilson',
        age: 3,
        gender: 'Female',
        phone: '+1 (555) 345-6789',
        email: 'parent@email.com',
        address: '789 Pine St, City, State 12345',
        lastVisit: '2024-01-05',
        condition: 'Routine Checkup',
        status: 'active',
        avatar: '/woman-profile.png',
    },
];

const medicalRecords = [
    {
        id: 1,
        date: '2024-01-10',
        type: 'ANC Visit',
        doctor: 'Dr. Sarah Johnson',
        diagnosis: 'Normal pregnancy progression',
        notes: "Patient doing well. Baby's heartbeat normal. Blood pressure stable.",
        vitals: { bp: '120/80', hr: '72', temp: '98.6°F', weight: '145 lbs' },
    },
    {
        id: 2,
        date: '2023-12-15',
        type: 'Lab Results',
        doctor: 'Dr. Sarah Johnson',
        diagnosis: 'Blood work normal',
        notes: 'All lab values within normal range. Continue current prenatal vitamins.',
        vitals: { bp: '118/78', hr: '68', temp: '98.4°F', weight: '142 lbs' },
    },
];

const prescriptions = [
    {
        id: 1,
        medication: 'Prenatal Vitamins',
        dosage: '1 tablet daily',
        prescribedDate: '2023-10-15',
        duration: 'Throughout pregnancy',
        status: 'active',
        refills: 3,
    },
    {
        id: 2,
        medication: 'Iron Supplement',
        dosage: '65mg daily',
        prescribedDate: '2023-12-01',
        duration: '3 months',
        status: 'active',
        refills: 2,
    },
];

const labResults = [
    {
        id: 1,
        test: 'Complete Blood Count',
        date: '2024-01-08',
        status: 'normal',
        results: [
            {
                parameter: 'Hemoglobin',
                value: '12.5 g/dL',
                range: '12.0-15.5 g/dL',
                status: 'normal',
            },
            {
                parameter: 'White Blood Cells',
                value: '7,200/μL',
                range: '4,500-11,000/μL',
                status: 'normal',
            },
            {
                parameter: 'Platelets',
                value: '250,000/μL',
                range: '150,000-450,000/μL',
                status: 'normal',
            },
        ],
    },
    {
        id: 2,
        test: 'Glucose Screening',
        date: '2023-12-20',
        status: 'normal',
        results: [
            {
                parameter: 'Glucose',
                value: '95 mg/dL',
                range: '<140 mg/dL',
                status: 'normal',
            },
        ],
    },
];

export default function PatientHistoryPage() {
    const [selectedPatient, setSelectedPatient] = useState(patients[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [activeTab, setActiveTab] = useState('overview');

    const filteredPatients = patients.filter((patient) => {
        const matchesSearch = patient.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterStatus === 'all' || patient.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'inactive':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'critical':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getLabStatusColor = (status: string) => {
        switch (status) {
            case 'normal':
                return 'text-green-600';
            case 'abnormal':
                return 'text-red-600';
            case 'pending':
                return 'text-yellow-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            <main className="container mx-auto max-w-7xl px-4 py-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="font-sans text-2xl font-bold text-gray-900">
                            Patient History
                        </h1>
                        <p className="font-sans text-gray-600">
                            View and manage patient medical records
                        </p>
                    </div>

                    <Button className="bg-primary hover:bg-primary/90">
                        <Download className="mr-2 h-4 w-4" />
                        Export Records
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    {/* Patient List Sidebar */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="font-sans text-lg font-semibold">
                                    Patients
                                </CardTitle>

                                {/* Search and Filter */}
                                <div className="space-y-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search patients..."
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            className="pl-10 font-sans"
                                        />
                                    </div>

                                    <Select
                                        value={filterStatus}
                                        onValueChange={setFilterStatus}
                                    >
                                        <SelectTrigger className="font-sans">
                                            <Filter className="mr-2 h-4 w-4" />
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All Patients
                                            </SelectItem>
                                            <SelectItem value="active">
                                                Active
                                            </SelectItem>
                                            <SelectItem value="inactive">
                                                Inactive
                                            </SelectItem>
                                            <SelectItem value="critical">
                                                Critical
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="max-h-96 space-y-1 overflow-y-auto">
                                    {filteredPatients.map((patient) => (
                                        <div
                                            key={patient.id}
                                            className={`cursor-pointer border-l-4 p-3 transition-colors hover:bg-gray-50 ${
                                                selectedPatient.id ===
                                                patient.id
                                                    ? 'border-l-primary bg-primary/5'
                                                    : 'border-l-transparent'
                                            }`}
                                            onClick={() =>
                                                setSelectedPatient(patient)
                                            }
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                    <User className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="truncate font-sans font-medium text-gray-900">
                                                        {patient.name}
                                                    </h3>
                                                    <p className="truncate font-sans text-sm text-gray-600">
                                                        {patient.age}y,{' '}
                                                        {patient.gender}
                                                    </p>
                                                    <Badge
                                                        className={`text-xs ${getStatusColor(patient.status)}`}
                                                    >
                                                        {patient.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Patient Details */}
                    <div className="lg:col-span-3">
                        <div className="space-y-6">
                            {/* Patient Header */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                                            <User className="h-10 w-10 text-primary" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <h2 className="font-sans text-2xl font-bold text-gray-900">
                                                        {selectedPatient.name}
                                                    </h2>
                                                    <p className="font-sans text-gray-600">
                                                        {selectedPatient.age}{' '}
                                                        years old •{' '}
                                                        {selectedPatient.gender}
                                                    </p>
                                                    <Badge
                                                        className={`mt-1 ${getStatusColor(selectedPatient.status)}`}
                                                    >
                                                        {selectedPatient.status}
                                                    </Badge>
                                                </div>

                                                <div className="space-y-1 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-4 w-4" />
                                                        <span className="font-sans">
                                                            {
                                                                selectedPatient.phone
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4" />
                                                        <span className="font-sans">
                                                            {
                                                                selectedPatient.email
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4" />
                                                        <span className="font-sans">
                                                            {
                                                                selectedPatient.address
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Patient Records Tabs */}
                            <Tabs
                                value={activeTab}
                                onValueChange={setActiveTab}
                            >
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="overview">
                                        Overview
                                    </TabsTrigger>
                                    <TabsTrigger value="visits">
                                        Visits
                                    </TabsTrigger>
                                    <TabsTrigger value="prescriptions">
                                        Prescriptions
                                    </TabsTrigger>
                                    <TabsTrigger value="labs">
                                        Lab Results
                                    </TabsTrigger>
                                </TabsList>

                                {/* Overview Tab */}
                                <TabsContent
                                    value="overview"
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 font-sans">
                                                    <Heart className="h-5 w-5 text-red-500" />
                                                    Current Condition
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="font-sans text-lg font-medium text-gray-900">
                                                    {selectedPatient.condition}
                                                </p>
                                                <p className="mt-1 font-sans text-sm text-gray-600">
                                                    Last visit:{' '}
                                                    {new Date(
                                                        selectedPatient.lastVisit,
                                                    ).toLocaleDateString()}
                                                </p>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 font-sans">
                                                    <Calendar className="h-5 w-5 text-blue-500" />
                                                    Recent Activity
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    <div className="font-sans text-sm">
                                                        <span className="font-medium">
                                                            Last Visit:
                                                        </span>{' '}
                                                        ANC Checkup
                                                    </div>
                                                    <div className="font-sans text-sm">
                                                        <span className="font-medium">
                                                            Next Appointment:
                                                        </span>{' '}
                                                        Jan 24, 2024
                                                    </div>
                                                    <div className="font-sans text-sm">
                                                        <span className="font-medium">
                                                            Active
                                                            Prescriptions:
                                                        </span>{' '}
                                                        2
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="font-sans">
                                                Recent Vitals
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                <div className="rounded-lg bg-gray-50 p-3 text-center">
                                                    <div className="font-sans text-2xl font-bold text-gray-900">
                                                        120/80
                                                    </div>
                                                    <div className="font-sans text-sm text-gray-600">
                                                        Blood Pressure
                                                    </div>
                                                </div>
                                                <div className="rounded-lg bg-gray-50 p-3 text-center">
                                                    <div className="font-sans text-2xl font-bold text-gray-900">
                                                        72
                                                    </div>
                                                    <div className="font-sans text-sm text-gray-600">
                                                        Heart Rate
                                                    </div>
                                                </div>
                                                <div className="rounded-lg bg-gray-50 p-3 text-center">
                                                    <div className="font-sans text-2xl font-bold text-gray-900">
                                                        98.6°F
                                                    </div>
                                                    <div className="font-sans text-sm text-gray-600">
                                                        Temperature
                                                    </div>
                                                </div>
                                                <div className="rounded-lg bg-gray-50 p-3 text-center">
                                                    <div className="font-sans text-2xl font-bold text-gray-900">
                                                        145
                                                    </div>
                                                    <div className="font-sans text-sm text-gray-600">
                                                        Weight (lbs)
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Visits Tab */}
                                <TabsContent
                                    value="visits"
                                    className="space-y-4"
                                >
                                    {medicalRecords.map((record) => (
                                        <Card key={record.id}>
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="h-5 w-5 text-blue-500" />
                                                        <div>
                                                            <CardTitle className="font-sans text-lg">
                                                                {record.type}
                                                            </CardTitle>
                                                            <p className="font-sans text-sm text-gray-600">
                                                                {new Date(
                                                                    record.date,
                                                                ).toLocaleDateString()}{' '}
                                                                •{' '}
                                                                {record.doctor}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="mb-1 font-sans font-medium text-gray-900">
                                                            Diagnosis
                                                        </h4>
                                                        <p className="font-sans text-gray-700">
                                                            {record.diagnosis}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h4 className="mb-1 font-sans font-medium text-gray-900">
                                                            Notes
                                                        </h4>
                                                        <p className="font-sans text-gray-700">
                                                            {record.notes}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h4 className="mb-2 font-sans font-medium text-gray-900">
                                                            Vitals
                                                        </h4>
                                                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                                            <div className="text-sm">
                                                                <span className="font-sans text-gray-600">
                                                                    BP:
                                                                </span>
                                                                <span className="ml-1 font-sans font-medium">
                                                                    {
                                                                        record
                                                                            .vitals
                                                                            .bp
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="text-sm">
                                                                <span className="font-sans text-gray-600">
                                                                    HR:
                                                                </span>
                                                                <span className="ml-1 font-sans font-medium">
                                                                    {
                                                                        record
                                                                            .vitals
                                                                            .hr
                                                                    }{' '}
                                                                    bpm
                                                                </span>
                                                            </div>
                                                            <div className="text-sm">
                                                                <span className="font-sans text-gray-600">
                                                                    Temp:
                                                                </span>
                                                                <span className="ml-1 font-sans font-medium">
                                                                    {
                                                                        record
                                                                            .vitals
                                                                            .temp
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="text-sm">
                                                                <span className="font-sans text-gray-600">
                                                                    Weight:
                                                                </span>
                                                                <span className="ml-1 font-sans font-medium">
                                                                    {
                                                                        record
                                                                            .vitals
                                                                            .weight
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </TabsContent>

                                {/* Prescriptions Tab */}
                                <TabsContent
                                    value="prescriptions"
                                    className="space-y-4"
                                >
                                    {prescriptions.map((prescription) => (
                                        <Card key={prescription.id}>
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <Pill className="h-8 w-8 text-green-500" />
                                                        <div>
                                                            <h3 className="font-sans text-lg font-semibold text-gray-900">
                                                                {
                                                                    prescription.medication
                                                                }
                                                            </h3>
                                                            <p className="font-sans text-gray-600">
                                                                {
                                                                    prescription.dosage
                                                                }
                                                            </p>
                                                            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                                                                <span className="font-sans">
                                                                    Prescribed:{' '}
                                                                    {new Date(
                                                                        prescription.prescribedDate,
                                                                    ).toLocaleDateString()}
                                                                </span>
                                                                <span className="font-sans">
                                                                    Duration:{' '}
                                                                    {
                                                                        prescription.duration
                                                                    }
                                                                </span>
                                                                <span className="font-sans">
                                                                    Refills:{' '}
                                                                    {
                                                                        prescription.refills
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Badge
                                                        className={
                                                            prescription.status ===
                                                            'active'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }
                                                    >
                                                        {prescription.status}
                                                    </Badge>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </TabsContent>

                                {/* Lab Results Tab */}
                                <TabsContent value="labs" className="space-y-4">
                                    {labResults.map((lab) => (
                                        <Card key={lab.id}>
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <TestTube className="h-5 w-5 text-purple-500" />
                                                        <div>
                                                            <CardTitle className="font-sans text-lg">
                                                                {lab.test}
                                                            </CardTitle>
                                                            <p className="font-sans text-sm text-gray-600">
                                                                {new Date(
                                                                    lab.date,
                                                                ).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Badge
                                                        className={`${getLabStatusColor(lab.status)} border bg-transparent`}
                                                    >
                                                        {lab.status}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-3">
                                                    {lab.results.map(
                                                        (result, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                                                            >
                                                                <div>
                                                                    <span className="font-sans font-medium text-gray-900">
                                                                        {
                                                                            result.parameter
                                                                        }
                                                                    </span>
                                                                    <p className="font-sans text-sm text-gray-600">
                                                                        Range:{' '}
                                                                        {
                                                                            result.range
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <span
                                                                        className={`font-medium ${getLabStatusColor(result.status)} font-sans`}
                                                                    >
                                                                        {
                                                                            result.value
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
