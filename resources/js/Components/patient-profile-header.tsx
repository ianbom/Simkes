import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import { Calendar, Droplet, Heart, MapPin, Phone, User } from 'lucide-react';
interface Patient {
    id: string;
    name: string;
    age: number;
    gender: string;
    patientId: string;
    phone: string;
    address: string;
    emergencyContact: string;
    isPregnant?: boolean;
    pregnancyWeek?: number;
    bloodType: string;
    allergies: string[];
    currentMedications: string[];
    lastVisit: string;
    photo: string;
    appointmentType: string;
}

interface PatientProfileHeaderProps {
    patient: Patient;
}

export function PatientProfileHeader({ patient }: PatientProfileHeaderProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col gap-6 sm:flex-row">
                    {/* Patient Photo */}
                    <div className="flex-shrink-0">
                        <div className="bg-muted h-24 w-24 overflow-hidden rounded-full">
                            {patient.photo ? (
                                <img
                                    src={patient.photo}
                                    alt={patient.name}
                                    width={96}
                                    height={96}
                                    className="h-full w-full rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full bg-gray-300 text-xl font-bold">
                                    {patient.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Patient Basic Info */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <div className="mb-2 flex items-center gap-3">
                                <h2 className="font-heading text-foreground text-xl font-bold">
                                    {patient.name}
                                </h2>
                                {patient.isPregnant && (
                                    <Badge
                                        variant="secondary"
                                        className="bg-pink-100 text-pink-800"
                                    >
                                        <Heart className="mr-1 h-3 w-3" />
                                        Pregnant ({patient.pregnancyWeek}w)
                                    </Badge>
                                )}
                            </div>
                            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    {patient.age} years, {patient.gender}
                                </span>
                                <span>ID: {patient.patientId}</span>
                                <span className="flex items-center gap-1">
                                    <Droplet className="h-4 w-4" />
                                    {patient.bloodType}
                                </span>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <h3 className="text-foreground mb-2 font-medium">
                                    Contact Information
                                </h3>
                                <div className="text-muted-foreground space-y-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-3 w-3" />
                                        <span>{patient.phone}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="mt-0.5 h-3 w-3" />
                                        <span>{patient.address}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-foreground mb-2 font-medium">
                                    Emergency Contact
                                </h3>
                                <div className="text-muted-foreground text-sm">
                                    <span>{patient.emergencyContact}</span>
                                </div>
                                <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
                                    <Calendar className="h-3 w-3" />
                                    <span>Last visit: {patient.lastVisit}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
