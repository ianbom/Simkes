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

const PatientQueueCard = ({
    patients,
    onStartExamination,
    onViewDetails,
}: PatientQueueCardProps) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'in-progress':
                return (
                    <Badge className="border-yellow-200 bg-yellow-100 text-yellow-800">
                        Proses...
                    </Badge>
                );
            case 'completed':
                return (
                    <Badge className="border-green-200 bg-green-100 text-green-800">
                        Selesai
                    </Badge>
                );
            default:
                return (
                    <Badge className="border-gray-200 bg-gray-100 text-gray-800">
                        Menunggu..
                    </Badge>
                );
        }
    };

    return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Riwayat Checkup Pasien
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
                            className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            {/* Bagian kiri */}
                            <div className="flex items-start gap-4 sm:items-center">
                                {/* Foto pasien */}
                                {patient.avatar ? (
                                    <img
                                        src={patient.avatar}
                                        alt={patient.name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <span className="text-sm font-medium text-primary">
                                            {patient.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </span>
                                    </div>
                                )}

                                {/* Data pasien */}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-foreground font-semibold">
                                            {patient.name}
                                        </p>
                                        {patient.isPregnant && (
                                            <Badge className="bg-blue-500 text-xs text-white">
                                                Hamil
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-3 text-sm">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {patient.time}
                                        </span>
                                        <span>{patient.type}</span>
                                        {patient.phone && (
                                            <span className="flex items-center gap-1">
                                                <Phone className="h-3 w-3" />
                                                {patient.phone}
                                            </span>
                                        )}
                                    </div>

                                    {patient.notes && (
                                        <p className="mt-1 cursor-pointer text-sm text-blue-600 hover:underline">
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
                                        className="bg-blue-500 text-white hover:bg-blue-600"
                                    >
                                        Periksa →
                                    </Button>
                                )}
                                {patient.status === 'in-progress' && (
                                    <Button
                                        size="sm"
                                        disabled
                                        className="bg-gray-100 text-gray-400"
                                    >
                                        Periksa
                                    </Button>
                                )}
                                {patient.status === 'completed' && (
                                    <Button
                                        size="sm"
                                        disabled
                                        className="bg-gray-100 text-gray-400"
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
export default PatientQueueCard;
