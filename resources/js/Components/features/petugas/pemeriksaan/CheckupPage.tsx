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
const CheckupPage = () => {
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
        <div className="px-4 py-6 pb-20 lg:px-8 lg:pb-6">
            {/* Header */}
            <div className="mb-6">
                <div className="mb-4 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <h1 className="font-heading text-foreground text-2xl font-bold">
                            Ruang Pemeriksaan - Pemeriksaan Offline{' '}
                        </h1>
                    </div>
                </div>
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
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
                                <FileText className="h-5 w-5" />
                                Ready to Start Examination
                            </CardTitle>
                            <CardDescription>
                                Review patient information and begin the{' '}
                                {patient.appointmentType} examination process
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="bg-muted rounded-lg p-4">
                                    <h3 className="text-foreground mb-2 font-medium">
                                        Chief Complaint
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        {patient.chiefComplaint}
                                    </p>
                                </div>

                                <div className="bg-muted rounded-lg p-4">
                                    <h3 className="text-foreground mb-2 font-medium">
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
                                        className="flex-1 bg-secondary text-white"
                                    >
                                        <Stethoscope className="mr-2 h-4 w-4" />
                                        Start Examination
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 bg-transparent"
                                    >
                                        <User className="mr-2 h-4 w-4" />
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
    );
};

export default CheckupPage;
