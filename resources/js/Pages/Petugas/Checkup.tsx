'use client';
import { ExaminationForm } from '@/Components/examination-form';
import { PatientProfileHeader } from '@/Components/patient-profile-header';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import PetugasLayout from '@/Layouts/PetugasLayout';
import { Clock, FileText, Stethoscope, User } from 'lucide-react';
import { useState } from 'react';

const mockPatient = {
    id: '1',
    name: 'Sarah Johnson',
    age: 28,
    gender: 'Female',
    patientId: 'P-2024-001',
    phone: '+1234567890',
    address: '123 Main St, City, State',
    emergencyContact: 'John Johnson - +1234567891',
    isPregnant: true,
    pregnancyWeek: 12,
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    currentMedications: ['Prenatal vitamins', 'Folic acid'],
    lastVisit: '2024-01-15',
    photo: '/woman-profile.png',
    appointmentType: 'ANC',
    appointmentTime: '09:00 AM',
    chiefComplaint: 'Routine prenatal checkup',
};

export default function CheckupRoom(user) {
    const [isExaminationStarted, setIsExaminationStarted] = useState(false);
    const [patient] = useState(mockPatient);

    const handleStartExamination = () => {
        setIsExaminationStarted(true);
    };

    const handleCompleteExamination = (formData: any) => {
        console.log('Examination completed:', formData);
        // In a real app, this would save to database and navigate back
        setIsExaminationStarted(false);
    };

    const handleCancelExamination = () => {
        setIsExaminationStarted(false);
    };

    return (
        <PetugasLayout user={user}>
            <div className="px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold font-heading text-foreground">
                                Ruang Pemeriksaan - Pemeriksaan Offline{' '}
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {patient.appointmentTime}
                        </span>
                        <Badge variant="third">{patient.appointmentType}</Badge>
                        <span>Room 1</span>
                    </div>
                </div>

                {/* Patient Profile Header */}
                <PatientProfileHeader patient={patient} />

                {/* Examination Section */}
                <div className="mt-8">
                    {!isExaminationStarted ? (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Ready to Start Examination
                                </CardTitle>
                                <CardDescription>
                                    Review patient information and begin the{' '}
                                    {patient.appointmentType} examination
                                    process
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-muted">
                                        <h3 className="mb-2 font-medium text-foreground">
                                            Chief Complaint
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {patient.chiefComplaint}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-lg bg-muted">
                                        <h3 className="mb-2 font-medium text-foreground">
                                            Important Notes
                                        </h3>
                                        <div className="space-y-2 text-sm">
                                            {patient.allergies.length > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant="destructive"
                                                        className="text-xs"
                                                    >
                                                        Allergies
                                                    </Badge>
                                                    <span className="text-muted-foreground">
                                                        {patient.allergies.join(
                                                            ', ',
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                            {patient.currentMedications.length >
                                                0 && (
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        Medications
                                                    </Badge>
                                                    <span className="text-muted-foreground">
                                                        {patient.currentMedications.join(
                                                            ', ',
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 pt-4 sm:max-w-md sm:flex-row">
                                        <Button
                                            onClick={handleStartExamination}
                                            className="flex-1 text-white bg-secondary"
                                        >
                                            <Stethoscope className="w-4 h-4 mr-2" />
                                            Start Examination
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="flex-1 bg-transparent"
                                        >
                                            <User className="w-4 h-4 mr-2" />
                                            View Full History
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <ExaminationForm
                            patient={patient}
                            onComplete={handleCompleteExamination}
                            onCancel={handleCancelExamination}
                        />
                    )}
                </div>
            </div>
        </PetugasLayout>
    );
}
