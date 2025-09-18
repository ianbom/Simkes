'use client';

import { Navigation } from '@/components/partials/Navigation';
import { SessionSummaryForm } from '@/Components/session-summary-form';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { VideoCallInterface } from '@/Components/video-call-interface';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Clock, Phone, User, Video } from 'lucide-react';
import { useState } from 'react';

// Mock consultation data
const mockConsultation = {
    id: 'C-2024-001',
    patient: {
        id: '2',
        name: 'Michael Chen',
        age: 35,
        gender: 'Male',
        patientId: 'P-2024-002',
        phone: '+1234567892',
        photo: '/man-profile.png',
        location: 'New York, NY',
        timezone: 'EST',
    },
    scheduledTime: '10:30 AM',
    duration: '30 minutes',
    type: 'Follow-up Consultation',
    chiefComplaint: 'Follow-up for hypertension management',
    status: 'scheduled' as 'scheduled' | 'in-progress' | 'completed',
    sessionStartTime: null as Date | null,
    sessionEndTime: null as Date | null,
};

export default function ConsultationPageRoute() {
    const [consultation, setConsultation] = useState(mockConsultation);
    const [isCallActive, setIsCallActive] = useState(false);
    const [showSummaryForm, setShowSummaryForm] = useState(false);

    const handleStartCall = () => {
        setConsultation((prev) => ({
            ...prev,
            status: 'in-progress',
            sessionStartTime: new Date(),
        }));
        setIsCallActive(true);
    };

    const handleEndCall = () => {
        setConsultation((prev) => ({
            ...prev,
            status: 'completed',
            sessionEndTime: new Date(),
        }));
        setIsCallActive(false);
        setShowSummaryForm(true);
    };

    const handleCompleteSummary = (summaryData: any) => {
        console.log('Session completed with summary:', summaryData);
        // In a real app, this would save to database and navigate back
        setShowSummaryForm(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'default';
            case 'in-progress':
                return 'secondary';
            default:
                return 'outline';
        }
    };

    return (
        <div className="bg-background min-h-screen">
            <Navigation />

            {/* Main content */}
            <div className="pb-16 lg:pb-0 lg:pl-72">
                <div className="px-4 py-6 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="mb-4 flex items-center gap-4">
                            <Link href="/">
                                <Button variant="outline" size="sm">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Dashboard
                                </Button>
                            </Link>
                            <div className="flex items-center gap-2">
                                <Video className="h-6 w-6 text-primary" />
                                <h1 className="font-heading text-foreground text-2xl font-bold">
                                    Consultation Room - Telemedicine
                                </h1>
                            </div>
                        </div>
                        <div className="text-muted-foreground flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {consultation.scheduledTime}
                            </span>
                            <Badge
                                variant={getStatusColor(consultation.status)}
                            >
                                {consultation.status.replace('-', ' ')}
                            </Badge>
                            <span>{consultation.duration}</span>
                        </div>
                    </div>

                    {/* Patient Information Card */}
                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-muted h-16 w-16 overflow-hidden rounded-full">
                                    <div className="flex h-full w-full items-center justify-center bg-primary/10">
                                        <span className="text-lg font-medium text-primary">
                                            {consultation.patient.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-heading text-foreground text-lg font-bold">
                                        {consultation.patient.name}
                                    </h3>
                                    <div className="text-muted-foreground mt-1 flex flex-wrap gap-4 text-sm">
                                        <span className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            {
                                                consultation.patient.age
                                            } years,{' '}
                                            {consultation.patient.gender}
                                        </span>
                                        <span>
                                            ID: {consultation.patient.patientId}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Phone className="h-3 w-3" />
                                            {consultation.patient.phone}
                                        </span>
                                        <span>
                                            {consultation.patient.location} (
                                            {consultation.patient.timezone})
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-muted mt-4 rounded-lg p-3">
                                <h4 className="text-foreground mb-1 font-medium">
                                    Chief Complaint
                                </h4>
                                <p className="text-muted-foreground text-sm">
                                    {consultation.chiefComplaint}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main Content Area */}
                    {!showSummaryForm ? (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* Video Call Interface - Takes 2 columns */}
                            <div className="lg:col-span-2">
                                <VideoCallInterface
                                    consultation={consultation}
                                    isCallActive={isCallActive}
                                    onStartCall={handleStartCall}
                                    onEndCall={handleEndCall}
                                />
                            </div>

                            {/* Session Information Sidebar */}
                            <div className="space-y-6">
                                {/* Session Status */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Session Status
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground text-sm">
                                                    Status
                                                </span>
                                                <Badge
                                                    variant={getStatusColor(
                                                        consultation.status,
                                                    )}
                                                >
                                                    {consultation.status.replace(
                                                        '-',
                                                        ' ',
                                                    )}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground text-sm">
                                                    Scheduled
                                                </span>
                                                <span className="text-sm font-medium">
                                                    {consultation.scheduledTime}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground text-sm">
                                                    Duration
                                                </span>
                                                <span className="text-sm font-medium">
                                                    {consultation.duration}
                                                </span>
                                            </div>
                                            {consultation.sessionStartTime && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-muted-foreground text-sm">
                                                        Started
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                        {consultation.sessionStartTime.toLocaleTimeString()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Notes */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Quick Notes
                                        </CardTitle>
                                        <CardDescription>
                                            Jot down notes during the
                                            consultation
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <textarea
                                            className="border-border focus:ring-ring h-32 w-full resize-none rounded-md border p-3 text-sm focus:outline-none focus:ring-2"
                                            placeholder="Take notes during the consultation..."
                                        />
                                    </CardContent>
                                </Card>

                                {/* Patient History Quick Access */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Quick Access
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start bg-transparent"
                                            >
                                                View Patient History
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start bg-transparent"
                                            >
                                                Previous Consultations
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start bg-transparent"
                                            >
                                                Lab Results
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start bg-transparent"
                                            >
                                                Prescriptions
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <SessionSummaryForm
                            consultation={consultation}
                            onComplete={handleCompleteSummary}
                            onCancel={() => setShowSummaryForm(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
