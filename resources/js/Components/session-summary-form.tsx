

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Checkbox } from "@/Components/ui/checkbox"
import { FileText, Save, X, Clock, User } from "lucide-react"

interface Consultation {
  id: string
  patient: {
    name: string
    patientId: string
  }
  sessionStartTime: Date | null
  sessionEndTime: Date | null
  type: string
}

interface SessionSummaryFormProps {
  consultation: Consultation
  onComplete: (summaryData: any) => void
  onCancel: () => void
}

export function SessionSummaryForm({ consultation, onComplete, onCancel }: SessionSummaryFormProps) {
  const [formData, setFormData] = useState({
    // Session Details
    sessionDuration: "",
    sessionQuality: "good",
    technicalIssues: false,

    // Patient Assessment
    chiefComplaint: "",
    symptoms: "",
    patientHistory: "",
    currentMedications: "",

    // Clinical Assessment
    assessment: "",
    diagnosis: "",
    differentialDiagnosis: "",

    // Treatment Plan
    treatment: "",
    prescriptions: "",
    recommendations: "",
    lifestyle: "",

    // Follow-up
    followUpRequired: false,
    followUpDate: "",
    followUpType: "telemedicine",
    urgentReferral: false,
    referralSpecialty: "",

    // Additional
    patientEducation: "",
    notes: "",
    patientSatisfaction: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Calculate session duration if not manually entered
    if (consultation.sessionStartTime && consultation.sessionEndTime && !formData.sessionDuration) {
      const duration = Math.floor(
        (consultation.sessionEndTime.getTime() - consultation.sessionStartTime.getTime()) / (1000 * 60),
      )
      formData.sessionDuration = `${duration} minutes`
    }

    onComplete(formData)
  }

  const sessionDuration =
    consultation.sessionStartTime && consultation.sessionEndTime
      ? Math.floor((consultation.sessionEndTime.getTime() - consultation.sessionStartTime.getTime()) / (1000 * 60))
      : 0

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Session Summary - {consultation.type}
          </CardTitle>
          <CardDescription>
            Complete the consultation summary for {consultation.patient.name} (ID: {consultation.patient.patientId})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Duration: {sessionDuration} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Session ID: {consultation.id}</span>
            </div>
            <div>
              <span>Completed: {consultation.sessionEndTime?.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Quality */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Session Quality & Technical Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sessionQuality">Session Quality</Label>
              <Select
                value={formData.sessionQuality}
                onValueChange={(value) => handleInputChange("sessionQuality", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sessionDuration">Session Duration</Label>
              <Input
                id="sessionDuration"
                placeholder={`${sessionDuration} minutes`}
                value={formData.sessionDuration}
                onChange={(e) => handleInputChange("sessionDuration", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="technicalIssues"
                  checked={formData.technicalIssues}
                  onCheckedChange={(checked) => handleInputChange("technicalIssues", checked)}
                />
                <Label htmlFor="technicalIssues">Technical issues encountered during session</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Patient Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="chiefComplaint">Chief Complaint</Label>
              <Textarea
                id="chiefComplaint"
                placeholder="Patient's main concern or reason for consultation..."
                value={formData.chiefComplaint}
                onChange={(e) => handleInputChange("chiefComplaint", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="symptoms">Symptoms & History of Present Illness</Label>
              <Textarea
                id="symptoms"
                placeholder="Detailed description of symptoms, onset, duration, severity..."
                value={formData.symptoms}
                onChange={(e) => handleInputChange("symptoms", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="patientHistory">Relevant Medical History</Label>
              <Textarea
                id="patientHistory"
                placeholder="Past medical history, family history, social history..."
                value={formData.patientHistory}
                onChange={(e) => handleInputChange("patientHistory", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="currentMedications">Current Medications</Label>
              <Textarea
                id="currentMedications"
                placeholder="List current medications, dosages, and compliance..."
                value={formData.currentMedications}
                onChange={(e) => handleInputChange("currentMedications", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Clinical Assessment & Diagnosis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="assessment">Clinical Assessment</Label>
              <Textarea
                id="assessment"
                placeholder="Your clinical assessment based on the consultation..."
                value={formData.assessment}
                onChange={(e) => handleInputChange("assessment", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="diagnosis">Primary Diagnosis</Label>
              <Textarea
                id="diagnosis"
                placeholder="Primary diagnosis or working diagnosis..."
                value={formData.diagnosis}
                onChange={(e) => handleInputChange("diagnosis", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="differentialDiagnosis">Differential Diagnosis</Label>
              <Textarea
                id="differentialDiagnosis"
                placeholder="Alternative diagnoses to consider..."
                value={formData.differentialDiagnosis}
                onChange={(e) => handleInputChange("differentialDiagnosis", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Treatment Plan & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="treatment">Treatment Plan</Label>
              <Textarea
                id="treatment"
                placeholder="Immediate treatment plan and interventions..."
                value={formData.treatment}
                onChange={(e) => handleInputChange("treatment", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="prescriptions">Prescriptions</Label>
              <Textarea
                id="prescriptions"
                placeholder="Medications prescribed with dosages and instructions..."
                value={formData.prescriptions}
                onChange={(e) => handleInputChange("prescriptions", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="recommendations">Medical Recommendations</Label>
              <Textarea
                id="recommendations"
                placeholder="Medical advice, precautions, and recommendations..."
                value={formData.recommendations}
                onChange={(e) => handleInputChange("recommendations", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lifestyle">Lifestyle & Self-Care Advice</Label>
              <Textarea
                id="lifestyle"
                placeholder="Diet, exercise, lifestyle modifications..."
                value={formData.lifestyle}
                onChange={(e) => handleInputChange("lifestyle", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Follow-up & Referrals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Follow-up & Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="followUpRequired"
                checked={formData.followUpRequired}
                onCheckedChange={(checked) => handleInputChange("followUpRequired", checked)}
              />
              <Label htmlFor="followUpRequired">Follow-up appointment required</Label>
            </div>

            {formData.followUpRequired && (
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
                <div>
                  <Label htmlFor="followUpType">Follow-up Type</Label>
                  <Select
                    value={formData.followUpType}
                    onValueChange={(value) => handleInputChange("followUpType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="telemedicine">Telemedicine</SelectItem>
                      <SelectItem value="in-person">In-person</SelectItem>
                      <SelectItem value="phone">Phone call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="urgentReferral"
                checked={formData.urgentReferral}
                onCheckedChange={(checked) => handleInputChange("urgentReferral", checked)}
              />
              <Label htmlFor="urgentReferral">Urgent referral to specialist required</Label>
            </div>

            {formData.urgentReferral && (
              <div>
                <Label htmlFor="referralSpecialty">Referral Specialty</Label>
                <Input
                  id="referralSpecialty"
                  placeholder="e.g., Cardiology, Dermatology, Emergency..."
                  value={formData.referralSpecialty}
                  onChange={(e) => handleInputChange("referralSpecialty", e.target.value)}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="patientEducation">Patient Education Provided</Label>
              <Textarea
                id="patientEducation"
                placeholder="Information and education provided to the patient..."
                value={formData.patientEducation}
                onChange={(e) => handleInputChange("patientEducation", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="patientSatisfaction">Patient Satisfaction & Feedback</Label>
              <Textarea
                id="patientSatisfaction"
                placeholder="Patient's feedback about the consultation..."
                value={formData.patientSatisfaction}
                onChange={(e) => handleInputChange("patientSatisfaction", e.target.value)}
              />
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
              Save & Complete Session
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
