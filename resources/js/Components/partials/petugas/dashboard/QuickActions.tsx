import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Activity, Calendar, FileText, Settings, UserPlus } from 'lucide-react';

const QuickActions = () => {
    const actions = [
        {
            title: 'Add Walk-in Patient',
            description: 'Register new patient',
            icon: UserPlus,
            action: () => console.log('Add patient'),
            variant: 'default' as const,
        },
        {
            title: 'Schedule Appointment',
            description: 'Book future visit',
            icon: Calendar,
            action: () => console.log('Schedule'),
            variant: 'outline' as const,
        },
        {
            title: 'View All Records',
            description: 'Patient history',
            icon: FileText,
            action: () => console.log('Records'),
            variant: 'outline' as const,
        },
        {
            title: 'Emergency Protocol',
            description: 'Quick access',
            icon: Activity,
            action: () => console.log('Emergency'),
            variant: 'destructive' as const,
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Quick Actions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {actions.map((action, index) => (
                        // <Button
                        //     key={index}
                        //     variant={action.variant}
                        //     className="flex flex-col items-start h-auto gap-2 p-4"
                        //     onClick={action.action}
                        // >
                        //     <div className="flex items-center w-full gap-2">
                        //         <action.icon className="w-4 h-4" />
                        //         <span className="font-medium">
                        //             {action.title}
                        //         </span>
                        //     </div>
                        //     <span className="text-xs opacity-80">
                        //         {action.description}
                        //     </span>
                        // </Button>
                        <div
                            key={index}
                            onClick={action.action}
                            role="button"
                            className={`flex cursor-pointer flex-col gap-2 rounded-xl border p-4 shadow-sm transition hover:shadow-md ${
                                action.variant === 'destructive'
                                    ? 'border-red-500 text-red-600'
                                    : ''
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                {/* <action.icon className="w-5 h-5" /> */}
                                <span className="font-semibold">
                                    {action.title}
                                </span>
                            </div>
                            <span className="text-muted-foreground text-xs">
                                {action.description}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
export default QuickActions;
