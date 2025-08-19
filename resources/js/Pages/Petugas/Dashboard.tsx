import { useState } from "react"
import { Navigation } from "@/Components/navigation"
import { PatientQueueCard } from "@/Components/patient-queue-card"
import { QuickActions } from "@/Components/quick-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/Components/ui/input"
import { Badge } from "@/Components/ui/badge"
import { Search, Bell, Users, Video, Activity, AlertTriangle, Clock, UserCheck, Filter } from "lucide-react"

// Mock data for demonstration
const mockPatients = [
  {
    id: "1",
    name: "Sarah Johnson",
    time: "09:00 AM",
    type: "ANC",
    status: "waiting" as const,
    phone: "+1234567890",
    isPregnant: true,
    notes: "First trimester checkup",
  },
  {
    id: "2",
    name: "Michael Chen",
    time: "09:30 AM",
    type: "Child Checkup",
    status: "in-progress" as const,
    phone: "+1234567891",
    notes: "2-year-old routine vaccination",
  },
  {
    id: "3",
    name: "Emma Davis",
    time: "10:00 AM",
    type: "General",
    status: "waiting" as const,
    phone: "+1234567892",
    notes: "Follow-up for hypertension",
  },
  {
    id: "4",
    name: "James Wilson",
    time: "10:30 AM",
    type: "Follow-up",
    status: "completed" as const,
    phone: "+1234567893",
  },
]

const mockNotifications = [
  {
    id: "1",
    type: "urgent" as const,
    title: "Abnormal Lab Results",
    patient: "Maria Rodriguez",
    time: "2 hours ago",
    description: "High blood pressure reading requires immediate attention",
  },
  {
    id: "2",
    type: "info" as const,
    title: "Prescription Refill",
    patient: "John Smith",
    time: "4 hours ago",
    description: "Diabetes medication refill approved",
  },
  {
    id: "3",
    type: "warning" as const,
    title: "Missed Appointment",
    patient: "Lisa Brown",
    time: "1 day ago",
    description: "Follow-up appointment needs rescheduling",
  },
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [patients] = useState(mockPatients)
  const [notifications] = useState(mockNotifications)

  const handleStartExamination = (patientId: string) => {
    console.log("Starting examination for patient:", patientId)
    // In a real app, this would navigate to the checkup room
  }

  const handleViewDetails = (patientId: string) => {
    console.log("Viewing details for patient:", patientId)
    // In a real app, this would show patient details modal
  }

  const handleSearch = () => {
    console.log("Searching for:", searchQuery)
    // In a real app, this would filter patients
  }

  const stats = [
    {
      title: "Today's Patients",
      value: patients.length,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Online Sessions",
      value: 8,
      icon: Video,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Pending",
      value: patients.filter((p) => p.status === "waiting").length,
      icon: Clock,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Completed",
      value: patients.filter((p) => p.status === "completed").length,
      icon: UserCheck,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  return (

    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main content */}
      <div className="lg:pl-72 pb-16 lg:pb-0">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">Daily Task Dashboard</h1>
                <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="relative bg-transparent">
                  <Bell className="h-4 w-4" />
                  {notifications.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Patient Search */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Patient Search
              </CardTitle>
              <CardDescription>Search for walk-in patients or scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name, ID, or phone number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Patient Queue - Takes 2 columns */}
            <div className="lg:col-span-2">
              <PatientQueueCard
                patients={patients}
                onStartExamination={handleStartExamination}
                onViewDetails={handleViewDetails}
              />
            </div>

            {/* Right sidebar with notifications and quick actions */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActions />

              {/* Clinical Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Clinical Notifications
                  </CardTitle>
                  <CardDescription>Important alerts and lab results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {notification.type === "urgent" && <AlertTriangle className="h-5 w-5 text-destructive" />}
                          {notification.type === "info" && <Activity className="h-5 w-5 text-primary" />}
                          {notification.type === "warning" && <Clock className="h-5 w-5 text-yellow-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-foreground">{notification.title}</p>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{notification.patient}</p>
                          <p className="text-sm text-foreground">{notification.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
