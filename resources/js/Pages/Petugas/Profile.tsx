'use client';

import { Badge } from '@/Components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Switch } from '@/Components/ui/switch';
import { Textarea } from '@/Components/ui/textarea';
import PetugasLayout from '@/Layouts/PetugasLayout';
import {
    Award,
    Bell,
    Calendar,
    Camera,
    Edit3,
    Eye,
    EyeOff,
    Mail,
    MapPin,
    Phone,
    Save,
    Shield,
    User,
} from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [profileData, setProfileData] = useState({
        firstName: 'Dr. Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@healthclinic.com',
        phone: '+1 (555) 123-4567',
        address: '123 Medical Center Dr, Healthcare City, HC 12345',
        dateOfBirth: '1985-03-15',
        licenseNumber: 'MD123456789',
        specialization: 'General Practice',
        experience: '8 years',
        bio: 'Dedicated healthcare professional with extensive experience in general practice and patient care. Committed to providing compassionate and comprehensive medical services.',
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
        appointmentReminders: true,
        systemUpdates: true,
        marketingEmails: false,
    });

    const [security, setSecurity] = useState({
        twoFactorAuth: true,
        sessionTimeout: '30',
        loginAlerts: true,
    });

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: User },
        { id: 'professional', label: 'Professional', icon: Award },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    const handleSave = () => {
        setIsEditing(false);
        console.log('[v0] Profile data saved:', profileData);
    };

    const handleInputChange = (field: string, value: string) => {
        setProfileData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleNotificationChange = (field: string, value: boolean) => {
        setNotifications((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSecurityChange = (field: string, value: string | boolean) => {
        setSecurity((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Enhanced Tab Button Component with better visual feedback
    const TabButton = ({
        tab,
        isActive,
        onClick,
    }: {
        tab: { id: string; label: string; icon: any };
        isActive: boolean;
        onClick: (id: string) => void;
    }) => {
        const IconComponent = tab.icon;
        return (
            <button
                onClick={() => onClick(tab.id)}
                className={`relative flex min-h-[44px] items-center justify-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                        ? 'text-primary-foreground bg-primary shadow-sm ring-2 ring-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
            >
                <IconComponent className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="hidden truncate sm:inline">{tab.label}</span>
                <span className="truncate sm:hidden">
                    {tab.label.split(' ')[0]}
                </span>

                {/* Active indicator */}
                {isActive && (
                    <div className="bg-primary-foreground absolute bottom-1 left-1/2 h-0.5 w-1/3 -translate-x-1/2 transform rounded-full" />
                )}
            </button>
        );
    };

    const renderPersonalTab = () => (
        <Card>
            <CardHeader>
                <CardTitle className="font-sans">
                    Personal Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-12 w-12 text-primary" />
                        </div>
                        {isEditing && (
                            <Button
                                size="sm"
                                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                            >
                                <Camera className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    <div>
                        <h3 className="font-sans text-lg font-semibold text-gray-900">
                            {profileData.firstName} {profileData.lastName}
                        </h3>
                        <p className="font-sans text-gray-600">
                            {profileData.specialization}
                        </p>
                        <Badge className="mt-1 bg-green-100 text-green-800">
                            Active
                        </Badge>
                    </div>
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="firstName" className="font-sans">
                            First Name
                        </Label>
                        <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) =>
                                handleInputChange('firstName', e.target.value)
                            }
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
                            onChange={(e) =>
                                handleInputChange('lastName', e.target.value)
                            }
                            disabled={!isEditing}
                            className="font-sans"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="font-sans">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                value={profileData.email}
                                onChange={(e) =>
                                    handleInputChange('email', e.target.value)
                                }
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
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="phone"
                                value={profileData.phone}
                                onChange={(e) =>
                                    handleInputChange('phone', e.target.value)
                                }
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
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="dateOfBirth"
                                type="date"
                                value={profileData.dateOfBirth}
                                onChange={(e) =>
                                    handleInputChange(
                                        'dateOfBirth',
                                        e.target.value,
                                    )
                                }
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
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="address"
                            value={profileData.address}
                            onChange={(e) =>
                                handleInputChange('address', e.target.value)
                            }
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
                        onChange={(e) =>
                            handleInputChange('bio', e.target.value)
                        }
                        disabled={!isEditing}
                        rows={4}
                        className="font-sans"
                    />
                </div>
            </CardContent>
        </Card>
    );

    const renderProfessionalTab = () => (
        <Card>
            <CardHeader>
                <CardTitle className="font-sans">
                    Professional Credentials
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="licenseNumber" className="font-sans">
                            Medical License Number
                        </Label>
                        <div className="relative">
                            <Award className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="licenseNumber"
                                value={profileData.licenseNumber}
                                onChange={(e) =>
                                    handleInputChange(
                                        'licenseNumber',
                                        e.target.value,
                                    )
                                }
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
                            onChange={(e) =>
                                handleInputChange(
                                    'specialization',
                                    e.target.value,
                                )
                            }
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
                            onChange={(e) =>
                                handleInputChange('experience', e.target.value)
                            }
                            disabled={!isEditing}
                            className="font-sans"
                        />
                    </div>
                </div>

                {/* Certifications */}
                <div className="space-y-4">
                    <Label className="font-sans">Certifications</Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-lg border border-gray-200 p-4">
                            <div className="mb-2 flex items-center justify-between">
                                <h4 className="font-sans font-medium text-gray-900">
                                    Board Certification
                                </h4>
                                <Badge className="bg-green-100 text-green-800">
                                    Valid
                                </Badge>
                            </div>
                            <p className="font-sans text-sm text-gray-600">
                                American Board of Family Medicine
                            </p>
                            <p className="font-sans text-xs text-gray-500">
                                Expires: Dec 2025
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">
                            <div className="mb-2 flex items-center justify-between">
                                <h4 className="font-sans font-medium text-gray-900">
                                    CPR Certification
                                </h4>
                                <Badge className="bg-green-100 text-green-800">
                                    Valid
                                </Badge>
                            </div>
                            <p className="font-sans text-sm text-gray-600">
                                American Heart Association
                            </p>
                            <p className="font-sans text-xs text-gray-500">
                                Expires: Mar 2024
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const renderNotificationsTab = () => (
        <Card>
            <CardHeader>
                <CardTitle className="font-sans">
                    Notification Preferences
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                        <div
                            key={key}
                            className="flex items-center justify-between"
                        >
                            <div className="space-y-1">
                                <Label className="font-sans capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </Label>
                                <p className="font-sans text-sm text-gray-600">
                                    {key === 'emailNotifications' &&
                                        'Receive notifications via email'}
                                    {key === 'smsNotifications' &&
                                        'Receive notifications via text message'}
                                    {key === 'appointmentReminders' &&
                                        'Get reminders for upcoming appointments'}
                                    {key === 'systemUpdates' &&
                                        'Notifications about system maintenance and updates'}
                                    {key === 'marketingEmails' &&
                                        'Receive promotional and marketing content'}
                                </p>
                            </div>
                            <Switch
                                checked={value}
                                onCheckedChange={(checked) =>
                                    handleNotificationChange(key, checked)
                                }
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    const renderSecurityTab = () => (
        <Card>
            <CardHeader>
                <CardTitle className="font-sans">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Label className="font-sans">
                                Two-Factor Authentication
                            </Label>
                            <p className="font-sans text-sm text-gray-600">
                                Add an extra layer of security to your account
                            </p>
                        </div>
                        <Switch
                            checked={security.twoFactorAuth}
                            onCheckedChange={(checked) =>
                                handleSecurityChange('twoFactorAuth', checked)
                            }
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Label className="font-sans">Login Alerts</Label>
                            <p className="font-sans text-sm text-gray-600">
                                Get notified when someone logs into your account
                            </p>
                        </div>
                        <Switch
                            checked={security.loginAlerts}
                            onCheckedChange={(checked) =>
                                handleSecurityChange('loginAlerts', checked)
                            }
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
                            onChange={(e) =>
                                handleSecurityChange(
                                    'sessionTimeout',
                                    e.target.value,
                                )
                            }
                            className="max-w-32 font-sans"
                        />
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <h3 className="mb-4 font-sans text-lg font-semibold text-gray-900">
                        Change Password
                    </h3>
                    <div className="max-w-md space-y-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="currentPassword"
                                className="font-sans"
                            >
                                Current Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="currentPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    className="pr-10 font-sans"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
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
                            <Input
                                id="newPassword"
                                type={showPassword ? 'text' : 'password'}
                                className="font-sans"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="confirmPassword"
                                className="font-sans"
                            >
                                Confirm New Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                className="font-sans"
                            />
                        </div>

                        <Button className="bg-primary hover:bg-primary/90">
                            <Shield className="mr-2 h-4 w-4" />
                            Update Password
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <PetugasLayout user={null}>
            <div className="px-4 py-6 pb-20 lg:px-8 lg:pb-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="font-sans text-2xl font-bold text-gray-900">
                            My Profile
                        </h1>
                        <p className="font-sans text-gray-600">
                            Manage your personal information and settings
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {isEditing ? (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    className="bg-primary hover:bg-primary/90"
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={() => setIsEditing(true)}
                                className="bg-primary hover:bg-primary/90"
                            >
                                <Edit3 className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Mobile Select Dropdown (visible on small screens) */}
                    <div className="block lg:hidden">
                        <Label className="mb-2 block font-sans text-sm font-medium">
                            Settings Section
                        </Label>
                        <Select value={activeTab} onValueChange={setActiveTab}>
                            <SelectTrigger className="w-full">
                                <SelectValue>
                                    <div className="flex items-center">
                                        {(() => {
                                            const currentTab = tabs.find(
                                                (tab) => tab.id === activeTab,
                                            );
                                            if (currentTab) {
                                                const IconComponent =
                                                    currentTab.icon;
                                                return (
                                                    <>
                                                        <IconComponent className="mr-2 h-4 w-4" />
                                                        {currentTab.label}
                                                    </>
                                                );
                                            }
                                            return 'Select a section';
                                        })()}
                                    </div>
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {tabs.map((tab) => {
                                    const IconComponent = tab.icon;
                                    return (
                                        <SelectItem key={tab.id} value={tab.id}>
                                            <div className="flex items-center">
                                                <IconComponent className="mr-2 h-4 w-4" />
                                                {tab.label}
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Desktop Tab Navigation (hidden on small screens) */}
                    <div className="hidden lg:block">
                        <div className="bg-muted flex space-x-1 rounded-lg p-1">
                            {tabs.map((tab) => (
                                <TabButton
                                    key={tab.id}
                                    tab={tab}
                                    isActive={activeTab === tab.id}
                                    onClick={setActiveTab}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                        {activeTab === 'personal' && renderPersonalTab()}
                        {activeTab === 'professional' &&
                            renderProfessionalTab()}
                        {activeTab === 'notifications' &&
                            renderNotificationsTab()}
                        {activeTab === 'security' && renderSecurityTab()}
                    </div>
                </div>
            </div>
        </PetugasLayout>
    );
}
