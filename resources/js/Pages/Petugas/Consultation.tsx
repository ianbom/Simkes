"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { VideoCallInterface } from "@/components/video-call-interface"
import { SessionSummaryForm } from "@/components/session-summary-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Clock, User, ArrowLeft, Phone } from "lucide-react"
import Link from "next/link"

// Mock consultation data
const mockConsultation = {
  id: "C-2024-001",
  patient: {
    id: "2",
    name: "Michael Chen",
    age: 35,
    gender: "Male",
    patientId: "P-2024-002",
    phone: "+1234567892",
    photo: "/man-profile.png",
    location: "New York, NY",
    timezone: "EST",
  },
  scheduledTime: "10:30 AM",
  duration: "30 minutes",
  type: "Follow-up Consultation",
  chiefComplaint: "Follow-up for hypertension management",
  status: "scheduled" as "scheduled" | "in-progress" | "completed",
  sessionStartTime: null as Date | null,
  sessionEndTime: null as Date | null,
}

export default function ConsultationRoom() {
  const [consultation, setConsultation] = useState(mockConsultation)
  const [isCallActive, setIsCallActive] = useState(false)
  const [showSummaryForm, setShowSummaryForm] = useState(false)

  const handleStartCall = () => {
    setConsultation((prev) => ({
      ...prev,
      status: "in-progress",
      sessionStartTime: new Date(),
    }))
    setIsCallActive(true)
  }

  const handleEndCall = () => {
    setConsultation((prev) => ({
      ...prev,
      status: "completed",
      sessionEndTime: new Date(),
    }))
    setIsCallActive(false)
    setShowSummaryForm(true)
  }

  const handleCompleteSummary = (summaryData: any) => {
    console.log("Session completed with summary:", summaryData)
    // In a real app, this would save to database and navigate back
    setShowSummaryForm(false)
  }

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main content */}
      <div className="lg:pl-72 pb-16 lg:pb-0">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Video className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-heading font-bold text-foreground">Consultation Room - Telemedicine</h1>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {consultation.scheduledTime}
              </span>
              <Badge variant={getStatusColor(consultation.status)}>{consultation.status.replace("-", " ")}</Badge>
              <span>{consultation.duration}</span>
            </div>
          </div>

          {/* Patient Information Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-medium text-primary">
                      {consultation.patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-bold text-foreground">{consultation.patient.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {consultation.patient.age} years, {consultation.patient.gender}
                    </span>
                    <span>ID: {consultation.patient.patientId}</span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {consultation.patient.phone}
                    </span>
                    <span>
                      {consultation.patient.location} ({consultation.patient.timezone})
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-foreground mb-1">Chief Complaint</h4>
                <p className="text-sm text-muted-foreground">{consultation.chiefComplaint}</p>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          {!showSummaryForm ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    <CardTitle className="text-lg">Session Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Badge variant={getStatusColor(consultation.status)}>
                          {consultation.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Scheduled</span>
                        <span className="text-sm font-medium">{consultation.scheduledTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Duration</span>
                        <span className="text-sm font-medium">{consultation.duration}</span>
                      </div>
                      {consultation.sessionStartTime && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Started</span>
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
                    <CardTitle className="text-lg">Quick Notes</CardTitle>
                    <CardDescription>Jot down notes during the consultation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      className="w-full h-32 p-3 text-sm border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Take notes during the consultation..."
                    />
                  </CardContent>
                </Card>

                {/* Patient History Quick Access */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        View Patient History
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Previous Consultations
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Lab Results
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
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
  )
}
