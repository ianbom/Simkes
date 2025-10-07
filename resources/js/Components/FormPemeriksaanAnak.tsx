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
import {  TabsContent } from '@/Components/ui/tabs';
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

 export default function FormPemeriksaanAnak() {


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
    )
 }


