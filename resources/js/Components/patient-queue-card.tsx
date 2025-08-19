import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/Components/ui/badge"
import { Calendar, Clock, Phone, FileText } from "lucide-react"

interface Patient {
  id: string
  name: string
  time: string
  type: string
  status: "waiting" | "in-progress" | "completed"
  phone?: string
  notes?: string
  isPregnant?: boolean
}

interface PatientQueueCardProps {
  patients: Patient[]
  onStartExamination: (patientId: string) => void
  onViewDetails: (patientId: string) => void
}

export function PatientQueueCard({ patients, onStartExamination, onViewDetails }: PatientQueueCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✓"
      case "in-progress":
        return "⏳"
      default:
        return "⏰"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Today's Patient Queue
        </CardTitle>
        <CardDescription>Scheduled appointments and walk-ins ({patients.length} patients)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{patient.name}</p>
                    {patient.isPregnant && (
                      <Badge variant="secondary" className="text-xs">
                        Pregnant
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
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
                  {patient.notes && <p className="text-xs text-muted-foreground mt-1 italic">{patient.notes}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusColor(patient.status)} className="flex items-center gap-1">
                  <span>{getStatusIcon(patient.status)}</span>
                  {patient.status}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => onViewDetails(patient.id)}>
                    <FileText className="h-3 w-3" />
                  </Button>
                  {patient.status === "waiting" && (
                    <Button size="sm" onClick={() => onStartExamination(patient.id)}>
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
  )
}
