"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, User, Plus, ChevronLeft, ChevronRight } from "lucide-react"

const appointments = [
  {
    id: 1,
    time: "09:00",
    duration: "30 min",
    patient: "Sarah Johnson",
    type: "ANC Checkup",
    status: "confirmed",
    date: "2024-01-15",
  },
  {
    id: 2,
    time: "10:30",
    duration: "45 min",
    patient: "Michael Chen",
    type: "Consultation",
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: 3,
    time: "14:00",
    duration: "30 min",
    patient: "Emma Wilson",
    type: "Child Checkup",
    status: "confirmed",
    date: "2024-01-15",
  },
  {
    id: 4,
    time: "15:30",
    duration: "60 min",
    patient: "David Rodriguez",
    type: "Telemedicine",
    status: "confirmed",
    date: "2024-01-16",
  },
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState<"calendar" | "list">("calendar")

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return appointments.filter((apt) => apt.date === dateString)
  }

  const getTodayAppointments = () => {
    const today = new Date().toISOString().split("T")[0]
    return appointments.filter((apt) => apt.date === today)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ANC Checkup":
        return "bg-blue-100 text-blue-800"
      case "Child Checkup":
        return "bg-purple-100 text-purple-800"
      case "Consultation":
        return "bg-teal-100 text-teal-800"
      case "Telemedicine":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const days = getDaysInMonth(currentDate)
  const todayAppointments = getTodayAppointments()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-sans">My Schedule</h1>
            <p className="text-gray-600 font-sans">Manage your appointments and calendar</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-white rounded-lg border border-gray-200 p-1">
              <Button
                variant={view === "calendar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("calendar")}
                className="text-sm"
              >
                <CalendarDays className="w-4 h-4 mr-1" />
                Calendar
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("list")}
                className="text-sm"
              >
                <Clock className="w-4 h-4 mr-1" />
                List
              </Button>
            </div>

            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar/List View */}
          <div className="lg:col-span-3">
            {view === "calendar" ? (
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold font-sans">
                      {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                        Today
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 font-sans">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => {
                      if (!day) {
                        return <div key={index} className="p-2 h-24"></div>
                      }

                      const dayAppointments = getAppointmentsForDate(day)
                      const isToday = day.toDateString() === new Date().toDateString()
                      const isSelected = day.toDateString() === selectedDate.toDateString()

                      return (
                        <div
                          key={index}
                          className={`p-2 h-24 border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                            isToday ? "bg-primary/5 border-primary/20" : ""
                          } ${isSelected ? "bg-primary/10 border-primary/30" : ""}`}
                          onClick={() => setSelectedDate(day)}
                        >
                          <div
                            className={`text-sm font-medium mb-1 font-sans ${
                              isToday ? "text-primary" : "text-gray-900"
                            }`}
                          >
                            {day.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayAppointments.slice(0, 2).map((apt) => (
                              <div
                                key={apt.id}
                                className="text-xs bg-primary/10 text-primary px-1 py-0.5 rounded truncate font-sans"
                              >
                                {apt.time} {apt.patient.split(" ")[0]}
                              </div>
                            ))}
                            {dayAppointments.length > 2 && (
                              <div className="text-xs text-gray-500 font-sans">+{dayAppointments.length - 2} more</div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">All Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900 font-sans">
                              {new Date(appointment.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="text-xs text-gray-500 font-sans">{appointment.time}</div>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-gray-900 font-sans">{appointment.patient}</h3>
                              <Badge className={getTypeColor(appointment.type)}>{appointment.type}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1 font-sans">
                                <Clock className="w-3 h-3" />
                                {appointment.duration}
                              </span>
                              <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                            </div>
                          </div>
                        </div>

                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Today's Schedule Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold font-sans">Today's Schedule</CardTitle>
                <p className="text-sm text-gray-600 font-sans">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </CardHeader>
              <CardContent>
                {todayAppointments.length > 0 ? (
                  <div className="space-y-3">
                    {todayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-primary font-sans">{appointment.time}</span>
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-900 font-sans">{appointment.patient}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-600 font-sans">
                              {appointment.type} • {appointment.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <CalendarDays className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 font-sans">No appointments today</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold font-sans">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-sans">Today's Appointments</span>
                    <span className="font-medium text-gray-900 font-sans">{todayAppointments.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-sans">This Week</span>
                    <span className="font-medium text-gray-900 font-sans">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-sans">Pending Confirmations</span>
                    <span className="font-medium text-yellow-600 font-sans">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-sans">Completed Today</span>
                    <span className="font-medium text-green-600 font-sans">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
