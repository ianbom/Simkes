

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Checkbox } from "@/Components/ui/checkbox"
import { Heart, Baby, Activity, Save, X } from "lucide-react"

interface Patient {
  id: string
  name: string
  appointmentType: string
  isPregnant?: boolean
  pregnancyWeek?: number
  age: number
}

interface ExaminationFormProps {
  patient: Patient
  onComplete: (formData: any) => void
  onCancel: () => void
}

export function ExaminationForm({ patient, onComplete, onCancel }: ExaminationFormProps) {
  const [formData, setFormData] = useState({
    // Vital Signs
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    weight: "",
    height: "",

    // General Examination
    generalAppearance: "",
    consciousness: "alert",

    // ANC Specific
    fundalHeight: "",
    fetalHeartRate: "",
    fetalMovement: "",
    edema: false,
    proteinuria: false,

    // Child Specific
    developmentalMilestones: "",
    vaccinations: "",
    growth: "",

    // Common Fields
    symptoms: "",
    physicalExamination: "",
    diagnosis: "",
    treatment: "",
    recommendations: "",
    followUpDate: "",
    notes: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  const isANC = patient.appointmentType === "ANC" || patient.isPregnant
  const isChild = patient.appointmentType === "Child Checkup" || patient.age < 18

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isANC && <Heart className="h-5 w-5 text-pink-600" />}
            {isChild && <Baby className="h-5 w-5 text-blue-600" />}
            {!isANC && !isChild && <Activity className="h-5 w-5 text-primary" />}
            {isANC ? "Antenatal Care (ANC) Examination" : isChild ? "Child Checkup Examination" : "General Examination"}
          </CardTitle>
          <CardDescription>
            Complete the examination form for {patient.name}
            {isANC && patient.pregnancyWeek && ` (${patient.pregnancyWeek} weeks pregnant)`}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Vital Signs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Vital Signs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
              <Input
                id="bloodPressure"
                placeholder="120/80"
                value={formData.bloodPressure}
                onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
              <Input
                id="heartRate"
                placeholder="72"
                type="number"
                value={formData.heartRate}
                onChange={(e) => handleInputChange("heartRate", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                placeholder="36.5"
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => handleInputChange("temperature", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                placeholder="65"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                placeholder="165"
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="consciousness">Consciousness Level</Label>
              <Select
                value={formData.consciousness}
                onValueChange={(value) => handleInputChange("consciousness", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alert">Alert</SelectItem>
                  <SelectItem value="drowsy">Drowsy</SelectItem>
                  <SelectItem value="confused">Confused</SelectItem>
                  <SelectItem value="unconscious">Unconscious</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ANC Specific Fields */}
      {isANC && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" />
              Antenatal Care Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fundalHeight">Fundal Height (cm)</Label>
                <Input
                  id="fundalHeight"
                  placeholder="28"
                  type="number"
                  value={formData.fundalHeight}
                  onChange={(e) => handleInputChange("fundalHeight", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="fetalHeartRate">Fetal Heart Rate (bpm)</Label>
                <Input
                  id="fetalHeartRate"
                  placeholder="140"
                  type="number"
                  value={formData.fetalHeartRate}
                  onChange={(e) => handleInputChange("fetalHeartRate", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="fetalMovement">Fetal Movement</Label>
                <Select
                  value={formData.fetalMovement}
                  onValueChange={(value) => handleInputChange("fetalMovement", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select movement level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="reduced">Reduced</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label>Additional Assessments</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edema"
                    checked={formData.edema}
                    onCheckedChange={(checked) => handleInputChange("edema", checked)}
                  />
                  <Label htmlFor="edema">Edema present</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="proteinuria"
                    checked={formData.proteinuria}
                    onCheckedChange={(checked) => handleInputChange("proteinuria", checked)}
                  />
                  <Label htmlFor="proteinuria">Proteinuria</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Child Specific Fields */}
      {isChild && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Baby className="h-5 w-5 text-blue-600" />
              Child Development Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="developmentalMilestones">Developmental Milestones</Label>
                <Textarea
                  id="developmentalMilestones"
                  placeholder="Describe achieved milestones and any concerns..."
                  value={formData.developmentalMilestones}
                  onChange={(e) => handleInputChange("developmentalMilestones", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="vaccinations">Vaccination Status</Label>
                <Textarea
                  id="vaccinations"
                  placeholder="List recent vaccinations and schedule..."
                  value={formData.vaccinations}
                  onChange={(e) => handleInputChange("vaccinations", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="growth">Growth Assessment</Label>
                <Textarea
                  id="growth"
                  placeholder="Growth patterns, percentiles, concerns..."
                  value={formData.growth}
                  onChange={(e) => handleInputChange("growth", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Physical Examination */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Physical Examination & Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="symptoms">Chief Complaints & Symptoms</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe patient's main complaints and symptoms..."
                value={formData.symptoms}
                onChange={(e) => handleInputChange("symptoms", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="physicalExamination">Physical Examination Findings</Label>
              <Textarea
                id="physicalExamination"
                placeholder="Document examination findings by system..."
                value={formData.physicalExamination}
                onChange={(e) => handleInputChange("physicalExamination", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Textarea
                id="diagnosis"
                placeholder="Primary and secondary diagnoses..."
                value={formData.diagnosis}
                onChange={(e) => handleInputChange("diagnosis", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment & Follow-up */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Treatment Plan & Follow-up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="treatment">Treatment & Medications</Label>
              <Textarea
                id="treatment"
                placeholder="Prescribed medications, dosages, and treatment plan..."
                value={formData.treatment}
                onChange={(e) => handleInputChange("treatment", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="recommendations">Recommendations & Advice</Label>
              <Textarea
                id="recommendations"
                placeholder="Lifestyle advice, precautions, and recommendations..."
                value={formData.recommendations}
                onChange={(e) => handleInputChange("recommendations", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="followUpDate">Follow-up Date</Label>
                <Input
                  id="followUpDate"
                  type="date"
                  value={formData.followUpDate}
                  onChange={(e) => handleInputChange("followUpDate", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional observations or notes..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save & Complete Examination
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
