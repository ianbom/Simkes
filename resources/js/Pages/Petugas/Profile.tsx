"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Calendar, Award, Shield, Eye, EyeOff, Camera, Save, Edit3 } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@healthclinic.com",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Center Dr, Healthcare City, HC 12345",
    dateOfBirth: "1985-03-15",
    licenseNumber: "MD123456789",
    specialization: "General Practice",
    experience: "8 years",
    bio: "Dedicated healthcare professional with extensive experience in general practice and patient care. Committed to providing compassionate and comprehensive medical services.",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    systemUpdates: true,
    marketingEmails: false,
  })

  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    sessionTimeout: "30",
    loginAlerts: true,
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to a backend
    console.log("[v0] Profile data saved:", profileData)
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSecurity((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-sans">My Profile</h1>
            <p className="text-gray-600 font-sans">Manage your personal information and settings</p>
          </div>

          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-primary" />
                    </div>
                    {isEditing && (
                      <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 font-sans">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-gray-600 font-sans">{profileData.specialization}</p>
                    <Badge className="mt-1 bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-sans">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      disabled={!isEditing}
                      className="font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-sans">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      disabled={!isEditing}
                      className="font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-sans">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-sans">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="font-sans">
                      Date of Birth
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10 font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="font-sans">
                    Address
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="font-sans">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className="font-sans"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Information Tab */}
          <TabsContent value="professional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Professional Credentials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber" className="font-sans">
                      Medical License Number
                    </Label>
                    <div className="relative">
                      <Award className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="licenseNumber"
                        value={profileData.licenseNumber}
                        onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization" className="font-sans">
                      Specialization
                    </Label>
                    <Input
                      id="specialization"
                      value={profileData.specialization}
                      onChange={(e) => handleInputChange("specialization", e.target.value)}
                      disabled={!isEditing}
                      className="font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="font-sans">
                      Years of Experience
                    </Label>
                    <Input
                      id="experience"
                      value={profileData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      disabled={!isEditing}
                      className="font-sans"
                    />
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-4">
                  <Label className="font-sans">Certifications</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 font-sans">Board Certification</h4>
                        <Badge className="bg-green-100 text-green-800">Valid</Badge>
                      </div>
                      <p className="text-sm text-gray-600 font-sans">American Board of Family Medicine</p>
                      <p className="text-xs text-gray-500 font-sans">Expires: Dec 2025</p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 font-sans">CPR Certification</h4>
                        <Badge className="bg-green-100 text-green-800">Valid</Badge>
                      </div>
                      <p className="text-sm text-gray-600 font-sans">American Heart Association</p>
                      <p className="text-xs text-gray-500 font-sans">Expires: Mar 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-sans">Email Notifications</Label>
                      <p className="text-sm text-gray-600 font-sans">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-sans">SMS Notifications</Label>
                      <p className="text-sm text-gray-600 font-sans">Receive notifications via text message</p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-sans">Appointment Reminders</Label>
                      <p className="text-sm text-gray-600 font-sans">Get reminders for upcoming appointments</p>
                    </div>
                    <Switch
                      checked={notifications.appointmentReminders}
                      onCheckedChange={(checked) => handleNotificationChange("appointmentReminders", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-sans">System Updates</Label>
                      <p className="text-sm text-gray-600 font-sans">
                        Notifications about system maintenance and updates
                      </p>
                    </div>
                    <Switch
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("systemUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-sans">Marketing Emails</Label>
                      <p className="text-sm text-gray-600 font-sans">Receive promotional and marketing content</p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-sans">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600 font-sans">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={security.twoFactorAuth}
                      onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-sans">Login Alerts</Label>
                      <p className="text-sm text-gray-600 font-sans">
                        Get notified when someone logs into your account
                      </p>
                    </div>
                    <Switch
                      checked={security.loginAlerts}
                      onCheckedChange={(checked) => handleSecurityChange("loginAlerts", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout" className="font-sans">
                      Session Timeout (minutes)
                    </Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                      className="max-w-32 font-sans"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-sans">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="font-sans">
                        Current Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          className="pr-10 font-sans"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="font-sans">
                        New Password
                      </Label>
                      <Input id="newPassword" type={showPassword ? "text" : "password"} className="font-sans" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="font-sans">
                        Confirm New Password
                      </Label>
                      <Input id="confirmPassword" type={showPassword ? "text" : "password"} className="font-sans" />
                    </div>

                    <Button className="bg-primary hover:bg-primary/90">
                      <Shield className="w-4 h-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
