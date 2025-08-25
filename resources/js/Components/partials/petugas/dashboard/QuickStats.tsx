import { Card, CardContent } from '@/Components/ui/card';
import { Clock, UserCheck, Users, Video } from 'lucide-react';
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
const QuickStats = () => {
    const [patients] = useState(mockPatients);
    const stats = [
        {
            title: 'Pasien Hari Ini',
            value: patients.length,
            icon: Users,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
        },
        {
            title: 'Konsultasi Online',
            value: 8,
            icon: Video,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
        },
        {
            title: 'Pasien Menunggu',
            value: patients.filter((p) => p.status === 'waiting').length,
            icon: Clock,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
        },
        {
            title: 'Pemerikasaan Selesai',
            value: patients.filter((p) => p.status === 'completed').length,
            icon: UserCheck,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
        },
    ];
    return (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index} className="transition-shadow hover:shadow-md">
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
    );
};
export default QuickStats;
