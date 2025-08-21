import { Badge } from '@/Components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, FileText, Phone } from 'lucide-react';

interface Patient {
    id: string;
    name: string;
    time: string;
    type: string;
    status: 'waiting' | 'in-progress' | 'completed';
    phone?: string;
    notes?: string;
    isPregnant?: boolean;
}

interface PatientQueueCardProps {
    patients: Patient[];
    onStartExamination: (patientId: string) => void;
    onViewDetails: (patientId: string) => void;
}

export function PatientQueueCard({
    patients,
    onStartExamination,
    onViewDetails,
}: PatientQueueCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'in-progress':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return '✓';
            case 'in-progress':
                return '⏳';
            default:
                return '⏰';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Today's Patient Queue
                </CardTitle>
                <CardDescription>
                    Scheduled appointments and walk-ins ({patients.length}{' '}
                    patients)
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {patients.map((patient) => (
                        // <div
                        //     key={patient.id}
                        //     className="flex items-center justify-between p-4 transition-colors rounded-lg bg-muted hover:bg-muted/80"
                        // >
                        //     <div className="flex items-center gap-4">
                        //         <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                        //             <span className="text-sm font-medium text-primary">
                        //                 {patient.name
                        //                     .split(' ')
                        //                     .map((n) => n[0])
                        //                     .join('')}
                        //             </span>
                        //         </div>
                        //         <div className="flex-1">
                        //             <div className="flex items-center gap-2">
                        //                 <p className="font-medium text-foreground">
                        //                     {patient.name}
                        //                 </p>
                        //                 {patient.isPregnant && (
                        //                     <Badge
                        //                         variant="secondary"
                        //                         className="text-xs"
                        //                     >
                        //                         Pregnant
                        //                     </Badge>
                        //                 )}
                        //             </div>
                        //             <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        //                 <span className="flex items-center gap-1">
                        //                     <Clock className="w-3 h-3" />
                        //                     {patient.time}
                        //                 </span>
                        //                 <span>{patient.type}</span>
                        //                 {patient.phone && (
                        //                     <span className="flex items-center gap-1">
                        //                         <Phone className="w-3 h-3" />
                        //                         {patient.phone}
                        //                     </span>
                        //                 )}
                        //             </div>
                        //             {patient.notes && (
                        //                 <p className="mt-1 text-xs italic text-muted-foreground">
                        //                     {patient.notes}
                        //                 </p>
                        //             )}
                        //         </div>
                        //     </div>
                        //     <div className="flex items-center gap-2">
                        //         <Badge
                        //             variant={getStatusColor(patient.status)}
                        //             className="flex items-center gap-1"
                        //         >
                        //             <span>{getStatusIcon(patient.status)}</span>
                        //             {patient.status}
                        //         </Badge>
                        //         <div className="flex gap-1">
                        //             <Button
                        //                 variant="outline"
                        //                 size="sm"
                        //                 onClick={() =>
                        //                     onViewDetails(patient.id)
                        //                 }
                        //             >
                        //                 <FileText className="w-3 h-3" />
                        //             </Button>
                        //             {patient.status === 'waiting' && (
                        //                 <Button
                        //                     size="sm"
                        //                     onClick={() =>
                        //                         onStartExamination(patient.id)
                        //                     }
                        //                 >
                        //                     Start
                        //                 </Button>
                        //             )}
                        //         </div>
                        //     </div>
                        // </div>
                        <div
                            key={patient.id}
                            className="bg-muted hover:bg-muted/80 flex flex-col gap-3 rounded-lg p-4 transition-colors sm:flex-row sm:items-center sm:justify-between"
                        >
                            {/* Bagian kiri */}
                            <div className="flex items-start gap-4 sm:items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <span className="text-sm font-medium text-primary">
                                        {patient.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="text-foreground font-medium">
                                            {patient.name}
                                        </p>
                                        {patient.isPregnant && (
                                            <Badge
                                                variant="secondary"
                                                className="bg-pink-100 text-xs text-pink-800"
                                            >
                                                Pregnant
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
                                        <p className="text-muted-foreground mt-1 text-xs italic">
                                            {patient.notes}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Bagian kanan (aksi) */}
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge
                                    className={`flex items-center gap-1 ${getStatusColor(patient.status)}`}
                                >
                                    <span>{getStatusIcon(patient.status)}</span>
                                    {patient.status}
                                </Badge>
                                <div className="flex gap-1">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            onViewDetails(patient.id)
                                        }
                                    >
                                        <FileText className="h-3 w-3" />
                                    </Button>
                                    {patient.status === 'waiting' && (
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                onStartExamination(patient.id)
                                            }
                                            className="bg-green-500 text-white hover:bg-green-600"
                                        >
                                            Start
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
