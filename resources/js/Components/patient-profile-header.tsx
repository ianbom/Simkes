import { Card, CardContent } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { User, Phone, MapPin, Heart, Calendar, Droplet } from "lucide-react"
import Image from "next/image"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  patientId: string
  phone: string
  address: string
  emergencyContact: string
  isPregnant?: boolean
  pregnancyWeek?: number
  bloodType: string
  allergies: string[]
  currentMedications: string[]
  lastVisit: string
  photo: string
  appointmentType: string
}

interface PatientProfileHeaderProps {
  patient: Patient
}

export function PatientProfileHeader({ patient }: PatientProfileHeaderProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Patient Photo */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
              <Image
                src={patient.photo || "/placeholder.svg"}
                alt={patient.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Patient Basic Info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-heading font-bold text-foreground">{patient.name}</h2>
                {patient.isPregnant && (
                  <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                    <Heart className="h-3 w-3 mr-1" />
                    Pregnant ({patient.pregnancyWeek}w)
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">Contact Information</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3 w-3 mt-0.5" />
                    <span>{patient.address}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-foreground mb-2">Emergency Contact</h3>
                <div className="text-sm text-muted-foreground">
                  <span>{patient.emergencyContact}</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Last visit: {patient.lastVisit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
