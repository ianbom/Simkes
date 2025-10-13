import { Badge } from '@/Components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Phone } from 'lucide-react';

interface Patient {
    id: string;
    name: string;
    time: string;
    type: string;
    status: 'waiting' | 'in-progress' | 'completed';
    phone?: string;
    notes?: string;
    isPregnant?: boolean;
    avatar?: string;
}

interface PatientQueueCardProps {
    patients: Patient[];
    onStartExamination: (patientId: string) => void;
    onViewDetails: (patientId: string) => void;
}

const OnlinePatientQueueCard = ({
    patients,
    onStartExamination,
    onViewDetails,
}: PatientQueueCardProps) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'in-progress':
                return (
                    <Badge className="text-yellow-800 bg-yellow-100 border-yellow-200">
                        Proses...
                    </Badge>
                );
            case 'completed':
                return (
                    <Badge className="text-green-800 bg-green-100 border-green-200">
                        Selesai
                    </Badge>
                );
            default:
                return (
                    <Badge className="text-gray-800 bg-gray-100 border-gray-200">
                        Menunggu..
                    </Badge>
                );
        }
    };

    return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Antrian Konsultasi Online
                </CardTitle>
                <CardDescription>
                    Daftar pasien yang hadir hari ini ({patients.length})
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {patients.map((patient) => (
                        <div
                            key={patient.id}
                            className="flex flex-col gap-3 p-4 border rounded-lg sm:flex-row sm:items-center sm:justify-between"
                        >
                            {/* Bagian kiri */}
                            <div className="flex items-start gap-4 sm:items-center">
                                {/* Foto pasien */}
                                {/* {patient.avatar ? (
                                    <img
                                        src={patient.avatar}
                                        alt={patient.name}
                                        className="object-cover w-12 h-12 rounded-full"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                                        <span className="text-sm font-medium text-primary">
                                            {patient.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </span>
                                    </div>
                                )} */}

                                {/* Data pasien */}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-foreground">
                                            {patient.name}
                                        </p>
                                        {patient.isPregnant && (
                                            <Badge className="text-xs text-white bg-blue-500">
                                                Hamil
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {patient.time}
                                        </span>
                                        <span>{patient.type}</span>
                                        {patient.phone && (
                                            <span className="flex items-center gap-1">
                                                <Phone className="w-3 h-3" />
                                                {patient.phone}
                                            </span>
                                        )}
                                    </div>

                                    {patient.notes && (
                                        <p className="mt-1 text-sm text-blue-600 cursor-pointer hover:underline">
                                            {patient.notes}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Bagian kanan */}
                            <div className="flex items-center gap-2">
                                {getStatusBadge(patient.status)}
                                {patient.status === 'waiting' && (
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            onStartExamination(patient.id)
                                        }
                                        className="text-white bg-blue-500 hover:bg-blue-600"
                                    >
                                        Periksa →
                                    </Button>
                                )}
                                {patient.status === 'in-progress' && (
                                    <Button
                                        size="sm"
                                        disabled
                                        className="text-gray-400 bg-gray-100"
                                    >
                                        Periksa
                                    </Button>
                                )}
                                {patient.status === 'completed' && (
                                    <Button
                                        size="sm"
                                        disabled
                                        className="text-gray-400 bg-gray-100"
                                    >
                                        Selesai
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
export default OnlinePatientQueueCard;
