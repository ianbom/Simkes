import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Calendar, FileText, Settings, Activity } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Add Walk-in Patient",
      description: "Register new patient",
      icon: UserPlus,
      action: () => console.log("Add patient"),
      variant: "default" as const,
    },
    {
      title: "Schedule Appointment",
      description: "Book future visit",
      icon: Calendar,
      action: () => console.log("Schedule"),
      variant: "outline" as const,
    },
    {
      title: "View All Records",
      description: "Patient history",
      icon: FileText,
      action: () => console.log("Records"),
      variant: "outline" as const,
    },
    {
      title: "Emergency Protocol",
      description: "Quick access",
      icon: Activity,
      action: () => console.log("Emergency"),
      variant: "destructive" as const,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-start gap-2"
              onClick={action.action}
            >
              <div className="flex items-center gap-2 w-full">
                <action.icon className="h-4 w-4" />
                <span className="font-medium">{action.title}</span>
              </div>
              <span className="text-xs opacity-80">{action.description}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
