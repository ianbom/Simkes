'use client';
import { PatientProfileHeader } from '@/Components/partials/petugas/pemeriksaan/PatientProfileHeader';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Textarea } from '@/Components/ui/textarea';
import {
    Activity,
    Clock,
    FileText,
    History,
    Stethoscope,
    TrendingUp,
    Upload,
    X,
} from 'lucide-react';
import { useState } from 'react';

const mockPatient = {
    id: '1217979',
    name: 'Sarah Johnson',
    age: 3,
    kelamin: 'P',
    patientId: 'P-2024-001',
    phone: '+1234567890',
    address: 'Surabaya, Jawa Timur, Indonesia',
    emergencyContact: 'John Johnson - +1234567891',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    currentMedications: ['Prenatal vitamins', 'Folic acid'],
    lastVisit: '2024-01-15',
    photo: '/assets/images/profile-8.jpeg',
    appointmentType: 'ANC',
    appointmentTime: '09:00 AM',
    chiefComplaint: 'Routine prenatal checkup',
};

const ChildCheckupPage = () => {
    const [patient] = useState(mockPatient);
    const [activeTab, setActiveTab] = useState('checkup');
    const [checkupType, setCheckupType] = useState('routine');
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles((prev) => [...prev, ...files]);
    };

    const removeFile = (index) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="px-4 py-6 pb-20 lg:px-8 lg:pb-6">
            {/* Header */}
            <div className="mb-6">
                <div className="mb-4 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <h1 className="font-heading text-foreground text-2xl font-bold">
                            Ruang Pemeriksaan Offline{' '}
                        </h1>
                    </div>
                </div>
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {patient.appointmentTime}
                    </span>
                    <Badge variant="outline">{patient.appointmentType}</Badge>
                    <span>Room 1</span>
                </div>
            </div>

            {/* Patient Profile Header */}
            <PatientProfileHeader patient={patient} patientType="child" />

            {/* Tabs Section */}
            <div className="mt-8">
                {/* Mobile: Dropdown */}
                <div className="mb-4 block md:hidden">
                    <Select value={activeTab} onValueChange={setActiveTab}>
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="checkup" className="bg-white">
                                <div className="flex items-center gap-2">
                                    <Stethoscope className="h-4 w-4" />
                                    <span>Checkup</span>
                                </div>
                            </SelectItem>
                            <SelectItem
                                value="medical-history"
                                className="bg-white"
                            >
                                <div className="flex items-center gap-2">
                                    <History className="h-4 w-4" />
                                    <span>Riwayat Sakit</span>
                                </div>
                            </SelectItem>
                            <SelectItem
                                value="child-development"
                                className="bg-white"
                            >
                                <div className="flex items-center gap-2">
                                    <Activity className="h-4 w-4" />
                                    <span>Riwayat Perkembangan Anak</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="charts" className="bg-white">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />
                                    <span>Grafik</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Desktop: Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <TabsList className="bg-muted/50 hidden w-full justify-start rounded-lg border bg-white px-3 py-7 md:inline-flex">
                        <TabsTrigger
                            value="checkup"
                            className="data-[state=inactive]:text-muted-foreground flex items-center gap-2 px-4 py-4 text-base font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <Stethoscope className="h-5 w-5" />
                            Checkup
                        </TabsTrigger>
                        <TabsTrigger
                            value="medical-history"
                            className="data-[state=inactive]:text-muted-foreground flex items-center gap-2 px-4 py-4 text-base font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <History className="h-5 w-5" />
                            Riwayat Sakit
                        </TabsTrigger>
                        <TabsTrigger
                            value="child-development"
                            className="data-[state=inactive]:text-muted-foreground flex items-center gap-2 px-4 py-4 text-base font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <Activity className="h-5 w-5" />
                            Riwayat Tumbuh Kembang
                        </TabsTrigger>
                        <TabsTrigger
                            value="charts"
                            className="data-[state=inactive]:text-muted-foreground flex items-center gap-2 px-4 py-4 text-base font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <TrendingUp className="h-5 w-5" />
                            Grafik
                        </TabsTrigger>
                    </TabsList>

                    {/* Checkup Tab */}
                    <TabsContent value="checkup" className="mt-6 bg-white">
                        <Card>
                            <CardHeader>
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="h-5 w-5" />
                                            Formulir Pemeriksaan
                                        </CardTitle>
                                        <CardDescription>
                                            Lengkapi formulir pemeriksaan pasien{' '}
                                            {patient.name}
                                        </CardDescription>
                                    </div>
                                    <Select
                                        value={checkupType}
                                        onValueChange={setCheckupType}
                                    >
                                        <SelectTrigger className="w-full sm:w-[220px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem
                                                value="routine"
                                                className="bg-white"
                                            >
                                                Checkup Rutin (Kontrol)
                                            </SelectItem>
                                            <SelectItem
                                                value="symptoms"
                                                className="bg-white"
                                            >
                                                Checkup Sakit (Darurat)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {/* Checkup Type Info Banner */}
                                    {checkupType === 'routine' ? (
                                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
                                            <h3 className="text-foreground mb-2 flex items-center gap-2 font-medium">
                                                <Stethoscope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                Checkup Rutin
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
                                                Pemeriksaan rutin untuk memantau
                                                kondisi kesehatan pasien secara
                                                berkala
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-950">
                                            <h3 className="text-foreground mb-2 flex items-center gap-2 font-medium">
                                                <Activity className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                                Checkup Gejala Sakit
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
                                                Pemeriksaan untuk mendiagnosis
                                                dan menangani keluhan atau
                                                gejala sakit
                                            </p>
                                        </div>
                                    )}
                                    {checkupType === 'routine' ? (
                                        <>
                                            {/* Form 1: Pemeriksaan Anak */}
                                            <Card className="border-2">
                                                <CardHeader>
                                                    <CardTitle className="text-lg">
                                                        Pemeriksaan Anak
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    {/* Row 1: Berat & Tinggi */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Berat Badan (kg)"
                                                            isRequired
                                                            id="weight"
                                                            name="weight"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan berat badan"
                                                        />
                                                        <Input
                                                            label="Tinggi Badan (cm)"
                                                            isRequired
                                                            id="height"
                                                            name="height"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan tinggi badan"
                                                        />
                                                    </div>

                                                    {/* Row 2: Lingkar Kepala & Cara Pengukuran */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Lingkar Kepala (cm)"
                                                            isRequired
                                                            id="head-circumference"
                                                            name="headCircumference"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan lingkar kepala"
                                                        />
                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor="measurement-method"
                                                                isRequired
                                                            >
                                                                Cara Pengukuran
                                                            </Label>
                                                            <select
                                                                id="measurement-method"
                                                                name="measurementMethod"
                                                                className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm outline-none focus-visible:ring-2"
                                                                required
                                                            >
                                                                <option value="">
                                                                    Pilih cara
                                                                    pengukuran
                                                                </option>
                                                                <option value="Berbaring">
                                                                    Berbaring
                                                                </option>
                                                                <option value="Berdiri">
                                                                    Berdiri
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {/* Row 3: Suhu & Frekuensi Nafas */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Suhu Tubuh (°C)"
                                                            id="temperature"
                                                            name="temperature"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan suhu tubuh"
                                                        />
                                                        <Input
                                                            label="Frekuensi Nafas (x/menit)"
                                                            isRequired
                                                            id="respiratory-rate"
                                                            name="respiratoryRate"
                                                            type="number"
                                                            placeholder="Masukkan frekuensi nafas"
                                                        />
                                                    </div>

                                                    {/* Row 4: Frekuensi Jantung & Saturasi Oksigen */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Frekuensi Jantung (x/menit)"
                                                            isRequired
                                                            id="heart-rate"
                                                            name="heartRate"
                                                            type="number"
                                                            placeholder="Masukkan frekuensi jantung"
                                                        />
                                                        <Input
                                                            label="Saturasi Oksigen (%)"
                                                            isRequired
                                                            id="oxygen-saturation"
                                                            name="oxygenSaturation"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan saturasi oksigen"
                                                        />
                                                    </div>

                                                    {/* Perkembangan - Full Width */}
                                                    <Textarea
                                                        label="Perkembangan Motorik"
                                                        isRequired
                                                        id="motor-development"
                                                        name="motorDevelopment"
                                                        placeholder="Tuliskan perkembangan motorik anak..."
                                                        rows={2}
                                                    />

                                                    <Textarea
                                                        label="Perkembangan Kognitif"
                                                        isRequired
                                                        id="cognitive-development"
                                                        name="cognitiveDevelopment"
                                                        placeholder="Tuliskan perkembangan kognitif anak..."
                                                        rows={2}
                                                    />

                                                    <Textarea
                                                        label="Perkembangan Emosional"
                                                        isRequired
                                                        id="emotional-development"
                                                        name="emotionalDevelopment"
                                                        placeholder="Tuliskan perkembangan emosional anak..."
                                                        rows={2}
                                                    />

                                                    <Textarea
                                                        label="Catatan Pemeriksaan"
                                                        isRequired
                                                        id="notes"
                                                        name="notes"
                                                        placeholder="Catatan tambahan pemeriksaan..."
                                                        rows={3}
                                                    />
                                                </CardContent>
                                            </Card>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                {/* Form 2: Riwayat Imunisasi Anak */}
                                                <Card className="border-2">
                                                    <CardHeader>
                                                        <CardTitle className="text-lg">
                                                            Riwayat Imunisasi
                                                            Anak
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor="vaccine-type"
                                                                isRequired
                                                            >
                                                                Jenis Vaksin
                                                            </Label>
                                                            <Select>
                                                                <SelectTrigger id="vaccine-type">
                                                                    <SelectValue placeholder="Pilih jenis vaksin" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="bcg">
                                                                        BCG
                                                                    </SelectItem>
                                                                    <SelectItem value="hepatitis-b">
                                                                        Hepatitis
                                                                        B
                                                                    </SelectItem>
                                                                    <SelectItem value="polio">
                                                                        Polio
                                                                    </SelectItem>
                                                                    <SelectItem value="dpt">
                                                                        DPT
                                                                    </SelectItem>
                                                                    <SelectItem value="campak">
                                                                        Campak
                                                                    </SelectItem>
                                                                    <SelectItem value="mmr">
                                                                        MMR
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor="vaccine-date"
                                                                isRequired
                                                            >
                                                                Tanggal
                                                                Imunisasi
                                                            </Label>
                                                            <Input
                                                                id="vaccine-date"
                                                                type="date"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="vaccine-notes">
                                                                Catatan
                                                                (Opsional)
                                                            </Label>
                                                            <Textarea
                                                                id="vaccine-notes"
                                                                placeholder="Reaksi atau catatan lainnya..."
                                                                rows={3}
                                                            />
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                {/* Form 3: Riwayat Sakit Anak */}
                                                <Card className="border-2">
                                                    <CardHeader>
                                                        <CardTitle className="text-lg">
                                                            Riwayat Sakit Anak
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor="symptoms"
                                                                isRequired
                                                            >
                                                                Gejala
                                                            </Label>
                                                            <Textarea
                                                                id="symptoms"
                                                                placeholder="Demam, batuk, pilek, dll..."
                                                                rows={2}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor="duration"
                                                                isRequired
                                                            >
                                                                Diagnosis
                                                            </Label>
                                                            <Input
                                                                id="duration"
                                                                placeholder="Diagnosis sakit"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor="vaccine-date"
                                                                isRequired
                                                            >
                                                                Tanggal Sakit
                                                            </Label>
                                                            <Input
                                                                id="vaccine-date"
                                                                type="date"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor="treatment"
                                                                isRequired
                                                            >
                                                                Tindakan
                                                                Pengobatan
                                                            </Label>
                                                            <Textarea
                                                                id="treatment"
                                                                placeholder="Obat yang diberikan, tindakan medis..."
                                                                rows={3}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="treatment">
                                                                Catatan
                                                                (Opsional)
                                                            </Label>
                                                            <Textarea
                                                                id="treatment"
                                                                placeholder="Obat yang diberikan, tindakan medis..."
                                                                rows={3}
                                                            />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                            {/* Form 4: Media Pemeriksaan Anak */}
                                            <Card className="border-2">
                                                <CardHeader>
                                                    <CardTitle className="text-lg">
                                                        Media Pemeriksaan Anak
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label isRequired>
                                                            Upload File
                                                        </Label>
                                                        <div className="flex items-center gap-2">
                                                            <Input
                                                                id="file-upload"
                                                                type="file"
                                                                multiple
                                                                accept="image/*,.pdf,.doc,.docx"
                                                                onChange={
                                                                    handleFileUpload
                                                                }
                                                                className="hidden"
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() =>
                                                                    document
                                                                        .getElementById(
                                                                            'file-upload',
                                                                        )
                                                                        .click()
                                                                }
                                                                className="w-full"
                                                            >
                                                                <Upload className="mr-2 h-4 w-4" />
                                                                Pilih File
                                                            </Button>
                                                        </div>
                                                        <p className="text-muted-foreground text-xs">
                                                            Format: JPG, PNG,
                                                            PDF, DOC (Maks. 5MB
                                                            per file)
                                                        </p>
                                                    </div>

                                                    {uploadedFiles.length >
                                                        0 && (
                                                        <div className="space-y-2">
                                                            <Label>
                                                                File yang
                                                                diupload (
                                                                {
                                                                    uploadedFiles.length
                                                                }
                                                                )
                                                            </Label>
                                                            <div className="max-h-[200px] space-y-2 overflow-y-auto rounded-lg border p-3">
                                                                {uploadedFiles.map(
                                                                    (
                                                                        file,
                                                                        index,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="bg-muted flex items-center justify-between rounded-md p-2"
                                                                        >
                                                                            <div className="flex items-center gap-2 overflow-hidden">
                                                                                <FileText className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                                                                                <span className="truncate text-sm">
                                                                                    {
                                                                                        file.name
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                onClick={() =>
                                                                                    removeFile(
                                                                                        index,
                                                                                    )
                                                                                }
                                                                                className="h-6 w-6 flex-shrink-0 p-0"
                                                                            >
                                                                                <X className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="space-y-2">
                                                        <Label htmlFor="media-notes">
                                                            Deskripsi (Opsional)
                                                        </Label>
                                                        <Textarea
                                                            id="media-notes"
                                                            placeholder="Deskripsi atau catatan tentang file yang diupload..."
                                                            rows={4}
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </>
                                    ) : (
                                        // Symptoms: 2 forms in grid, 1 full width below
                                        <>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <Card className="border-2">
                                                    <CardHeader>
                                                        <CardTitle className="text-lg">
                                                            Pemeriksaan Anak
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Input
                                                                label="Berat Badan (kg)"
                                                                isRequired
                                                                id="weight"
                                                                type="number"
                                                                placeholder="Masukkan berat badan"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Input
                                                                label="Suhu Tubuh (°C)"
                                                                isRequired
                                                                id="temperature"
                                                                type="number"
                                                                step="0.1"
                                                                placeholder="Masukkan suhu tubuh"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Input
                                                                id="temperature"
                                                                type="number"
                                                                label="Frekuensi Nafas
                                                            (x/menit)"
                                                                isRequired
                                                                step="0.1"
                                                                placeholder="Masukkan suhu tubuh"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Input
                                                                label="Frekuensi Jantung
                                                            (x/menit)"
                                                                id="temperature"
                                                                type="number"
                                                                isRequired
                                                                step="0.1"
                                                                placeholder="Masukkan suhu tubuh"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Input
                                                                label="Saturasi Oksigen (x%)"
                                                                isRequired
                                                                id="temperature"
                                                                type="number"
                                                                step="0.1"
                                                                placeholder="Masukkan suhu tubuh"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Textarea
                                                                label="Catatan Pemeriksaan"
                                                                isRequired
                                                                id="notes"
                                                                placeholder="Catatan tambahan..."
                                                                rows={3}
                                                            />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                                {/* Form 1: Pemeriksaan Anak */}

                                                {/* Form 2: Riwayat Sakit Anak */}
                                                <Card className="border-2">
                                                    <CardHeader>
                                                        <CardTitle className="text-lg">
                                                            Riwayat Sakit Anak
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor="symptoms"
                                                                isRequired
                                                            >
                                                                Gejala
                                                            </Label>
                                                            <Textarea
                                                                id="symptoms"
                                                                placeholder="Demam, batuk, pilek, dll..."
                                                                rows={2}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor="duration"
                                                                isRequired
                                                            >
                                                                Diagnosis
                                                            </Label>
                                                            <Input
                                                                id="duration"
                                                                placeholder="Diagnosis sakit"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor="vaccine-date"
                                                                isRequired
                                                            >
                                                                Tanggal Sakit
                                                            </Label>
                                                            <Input
                                                                id="vaccine-date"
                                                                type="date"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor="treatment"
                                                                isRequired
                                                            >
                                                                Tindakan
                                                                Pengobatan
                                                            </Label>
                                                            <Textarea
                                                                id="treatment"
                                                                placeholder="Obat yang diberikan, tindakan medis..."
                                                                rows={3}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="treatment">
                                                                Catatan
                                                                (Opsional)
                                                            </Label>
                                                            <Textarea
                                                                id="treatment"
                                                                placeholder="Obat yang diberikan, tindakan medis..."
                                                                rows={3}
                                                            />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>

                                            {/* Form 3: Media Pemeriksaan Anak - Full Width */}
                                            <Card className="border-2">
                                                <CardHeader>
                                                    <CardTitle className="text-lg">
                                                        Media Pemeriksaan Anak
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label>
                                                            Upload File
                                                        </Label>
                                                        <div className="flex items-center gap-2">
                                                            <Input
                                                                id="file-upload-symptoms"
                                                                type="file"
                                                                multiple
                                                                accept="image/*,.pdf,.doc,.docx"
                                                                onChange={
                                                                    handleFileUpload
                                                                }
                                                                className="hidden"
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() =>
                                                                    document
                                                                        .getElementById(
                                                                            'file-upload-symptoms',
                                                                        )
                                                                        .click()
                                                                }
                                                                className="w-full"
                                                            >
                                                                <Upload className="mr-2 h-4 w-4" />
                                                                Pilih File
                                                            </Button>
                                                        </div>
                                                        <p className="text-muted-foreground text-xs">
                                                            Format: JPG, PNG,
                                                            PDF, DOC (Maks. 5MB
                                                            per file)
                                                        </p>
                                                    </div>

                                                    {uploadedFiles.length >
                                                        0 && (
                                                        <div className="space-y-2">
                                                            <Label>
                                                                File yang
                                                                diupload (
                                                                {
                                                                    uploadedFiles.length
                                                                }
                                                                )
                                                            </Label>
                                                            <div className="max-h-[200px] space-y-2 overflow-y-auto rounded-lg border p-3">
                                                                {uploadedFiles.map(
                                                                    (
                                                                        file,
                                                                        index,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="bg-muted flex items-center justify-between rounded-md p-2"
                                                                        >
                                                                            <div className="flex items-center gap-2 overflow-hidden">
                                                                                <FileText className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                                                                                <span className="truncate text-sm">
                                                                                    {
                                                                                        file.name
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                onClick={() =>
                                                                                    removeFile(
                                                                                        index,
                                                                                    )
                                                                                }
                                                                                className="h-6 w-6 flex-shrink-0 p-0"
                                                                            >
                                                                                <X className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="space-y-2">
                                                        <Label htmlFor="media-notes-symptoms">
                                                            Deskripsi (Opsional)
                                                        </Label>
                                                        <Textarea
                                                            id="media-notes-symptoms"
                                                            placeholder="Deskripsi atau catatan tentang file yang diupload..."
                                                            rows={4}
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                                        <Button className="bg-secondary text-white sm:w-auto">
                                            <Stethoscope className="mr-2 h-4 w-4" />
                                            Simpan Pemeriksaan
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Medical History Tab */}
                    <TabsContent
                        value="medical-history"
                        className="mt-6 bg-white"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Riwayat Sakit</CardTitle>
                                <CardDescription>
                                    History of patient's medical conditions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Medical history content will be displayed
                                    here.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Child Development Tab */}
                    <TabsContent
                        value="child-development"
                        className="mt-6 bg-white"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Riwayat Perkembangan Anak</CardTitle>
                                <CardDescription>
                                    Child development tracking and milestones
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Child development history will be displayed
                                    here.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Charts Tab */}
                    <TabsContent value="charts" className="mt-6 bg-white">
                        <Card>
                            <CardHeader>
                                <CardTitle>Grafik</CardTitle>
                                <CardDescription>
                                    Visual charts and growth tracking
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Charts and graphs will be displayed here.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default ChildCheckupPage;
