"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  User,
  Calendar,
  FileText,
  Pill,
  TestTube,
  Heart,
  Phone,
  Mail,
  MapPin,
  Download,
  Eye,
} from "lucide-react"

const patients = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 28,
    gender: "Female",
    phone: "+1 (555) 123-4567",
    email: "sarah.j@email.com",
    address: "123 Main St, City, State 12345",
    lastVisit: "2024-01-10",
    condition: "Pregnancy - 32 weeks",
    status: "active",
    avatar: "/woman-profile.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 45,
    gender: "Male",
    phone: "+1 (555) 234-5678",
    email: "m.chen@email.com",
    address: "456 Oak Ave, City, State 12345",
    lastVisit: "2024-01-08",
    condition: "Hypertension",
    status: "active",
    avatar: "/man-profile.png",
  },
  {
    id: 3,
    name: "Emma Wilson",
    age: 3,
    gender: "Female",
    phone: "+1 (555) 345-6789",
    email: "parent@email.com",
    address: "789 Pine St, City, State 12345",
    lastVisit: "2024-01-05",
    condition: "Routine Checkup",
    status: "active",
    avatar: "/woman-profile.png",
  },
]

const medicalRecords = [
  {
    id: 1,
    date: "2024-01-10",
    type: "ANC Visit",
    doctor: "Dr. Sarah Johnson",
    diagnosis: "Normal pregnancy progression",
    notes: "Patient doing well. Baby's heartbeat normal. Blood pressure stable.",
    vitals: { bp: "120/80", hr: "72", temp: "98.6°F", weight: "145 lbs" },
  },
  {
    id: 2,
    date: "2023-12-15",
    type: "Lab Results",
    doctor: "Dr. Sarah Johnson",
    diagnosis: "Blood work normal",
    notes: "All lab values within normal range. Continue current prenatal vitamins.",
    vitals: { bp: "118/78", hr: "68", temp: "98.4°F", weight: "142 lbs" },
  },
]

const prescriptions = [
  {
    id: 1,
    medication: "Prenatal Vitamins",
    dosage: "1 tablet daily",
    prescribedDate: "2023-10-15",
    duration: "Throughout pregnancy",
    status: "active",
    refills: 3,
  },
  {
    id: 2,
    medication: "Iron Supplement",
    dosage: "65mg daily",
    prescribedDate: "2023-12-01",
    duration: "3 months",
    status: "active",
    refills: 2,
  },
]

const labResults = [
  {
    id: 1,
    test: "Complete Blood Count",
    date: "2024-01-08",
    status: "normal",
    results: [
      { parameter: "Hemoglobin", value: "12.5 g/dL", range: "12.0-15.5 g/dL", status: "normal" },
      { parameter: "White Blood Cells", value: "7,200/μL", range: "4,500-11,000/μL", status: "normal" },
      { parameter: "Platelets", value: "250,000/μL", range: "150,000-450,000/μL", status: "normal" },
    ],
  },
  {
    id: 2,
    test: "Glucose Screening",
    date: "2023-12-20",
    status: "normal",
    results: [{ parameter: "Glucose", value: "95 mg/dL", range: "<140 mg/dL", status: "normal" }],
  },
]

export default function PatientHistoryPage() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || patient.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getLabStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600"
      case "abnormal":
        return "text-red-600"
      case "pending":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-sans">Patient History</h1>
            <p className="text-gray-600 font-sans">View and manage patient medical records</p>
          </div>

          <Button className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Export Records
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Patient List Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold font-sans">Patients</CardTitle>

                {/* Search and Filter */}
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 font-sans"
                    />
                  </div>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="font-sans">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Patients</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${
                        selectedPatient.id === patient.id ? "bg-primary/5 border-l-primary" : "border-l-transparent"
                      }`}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate font-sans">{patient.name}</h3>
                          <p className="text-sm text-gray-600 truncate font-sans">
                            {patient.age}y, {patient.gender}
                          </p>
                          <Badge className={`text-xs ${getStatusColor(patient.status)}`}>{patient.status}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Patient Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-primary" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 font-sans">{selectedPatient.name}</h2>
                          <p className="text-gray-600 font-sans">
                            {selectedPatient.age} years old • {selectedPatient.gender}
                          </p>
                          <Badge className={`mt-1 ${getStatusColor(selectedPatient.status)}`}>
                            {selectedPatient.status}
                          </Badge>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span className="font-sans">{selectedPatient.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span className="font-sans">{selectedPatient.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span className="font-sans">{selectedPatient.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Patient Records Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="visits">Visits</TabsTrigger>
                  <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                  <TabsTrigger value="labs">Lab Results</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-sans">
                          <Heart className="w-5 h-5 text-red-500" />
                          Current Condition
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg font-medium text-gray-900 font-sans">{selectedPatient.condition}</p>
                        <p className="text-sm text-gray-600 mt-1 font-sans">
                          Last visit: {new Date(selectedPatient.lastVisit).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-sans">
                          <Calendar className="w-5 h-5 text-blue-500" />
                          Recent Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-sm font-sans">
                            <span className="font-medium">Last Visit:</span> ANC Checkup
                          </div>
                          <div className="text-sm font-sans">
                            <span className="font-medium">Next Appointment:</span> Jan 24, 2024
                          </div>
                          <div className="text-sm font-sans">
                            <span className="font-medium">Active Prescriptions:</span> 2
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="font-sans">Recent Vitals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-900 font-sans">120/80</div>
                          <div className="text-sm text-gray-600 font-sans">Blood Pressure</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-900 font-sans">72</div>
                          <div className="text-sm text-gray-600 font-sans">Heart Rate</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-900 font-sans">98.6°F</div>
                          <div className="text-sm text-gray-600 font-sans">Temperature</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-900 font-sans">145</div>
                          <div className="text-sm text-gray-600 font-sans">Weight (lbs)</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Visits Tab */}
                <TabsContent value="visits" className="space-y-4">
                  {medicalRecords.map((record) => (
                    <Card key={record.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <div>
                              <CardTitle className="text-lg font-sans">{record.type}</CardTitle>
                              <p className="text-sm text-gray-600 font-sans">
                                {new Date(record.date).toLocaleDateString()} • {record.doctor}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1 font-sans">Diagnosis</h4>
                            <p className="text-gray-700 font-sans">{record.diagnosis}</p>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-1 font-sans">Notes</h4>
                            <p className="text-gray-700 font-sans">{record.notes}</p>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-2 font-sans">Vitals</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="text-sm">
                                <span className="text-gray-600 font-sans">BP:</span>
                                <span className="ml-1 font-medium font-sans">{record.vitals.bp}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-600 font-sans">HR:</span>
                                <span className="ml-1 font-medium font-sans">{record.vitals.hr} bpm</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-600 font-sans">Temp:</span>
                                <span className="ml-1 font-medium font-sans">{record.vitals.temp}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-600 font-sans">Weight:</span>
                                <span className="ml-1 font-medium font-sans">{record.vitals.weight}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Prescriptions Tab */}
                <TabsContent value="prescriptions" className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <Card key={prescription.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Pill className="w-8 h-8 text-green-500" />
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 font-sans">
                                {prescription.medication}
                              </h3>
                              <p className="text-gray-600 font-sans">{prescription.dosage}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <span className="font-sans">
                                  Prescribed: {new Date(prescription.prescribedDate).toLocaleDateString()}
                                </span>
                                <span className="font-sans">Duration: {prescription.duration}</span>
                                <span className="font-sans">Refills: {prescription.refills}</span>
                              </div>
                            </div>
                          </div>
                          <Badge
                            className={
                              prescription.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {prescription.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Lab Results Tab */}
                <TabsContent value="labs" className="space-y-4">
                  {labResults.map((lab) => (
                    <Card key={lab.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <TestTube className="w-5 h-5 text-purple-500" />
                            <div>
                              <CardTitle className="text-lg font-sans">{lab.test}</CardTitle>
                              <p className="text-sm text-gray-600 font-sans">
                                {new Date(lab.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Badge className={`${getLabStatusColor(lab.status)} bg-transparent border`}>
                            {lab.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {lab.results.map((result, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <span className="font-medium text-gray-900 font-sans">{result.parameter}</span>
                                <p className="text-sm text-gray-600 font-sans">Range: {result.range}</p>
                              </div>
                              <div className="text-right">
                                <span className={`font-medium ${getLabStatusColor(result.status)} font-sans`}>
                                  {result.value}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
