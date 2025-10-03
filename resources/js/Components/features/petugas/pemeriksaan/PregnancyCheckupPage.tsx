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
    Plus,
    Stethoscope,
    TrendingUp,
    Upload,
    X,
} from 'lucide-react';
import { useState } from 'react';

const mockPatient = {
    id: '1217979',
    name: 'Hamil Sarah Johnson',
    age: 32,
    isPregnant: true,
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
    pregnancyWeek: '12',
    chiefComplaint: 'Routine prenatal checkup',
};
interface LabTest {
    id: string;
    namaTes: string;
    hasilLab: string;
    satuan: string;
    status: string;
}
const PregnancyCheckupPage = () => {
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
    const [labTests, setLabTests] = useState<LabTest[]>([
        { id: '1', namaTes: '', hasilLab: '', satuan: '', status: '' },
    ]);

    const addLabTest = () => {
        const newId = (labTests.length + 1).toString();
        setLabTests([
            ...labTests,
            {
                id: newId,
                namaTes: '',
                hasilLab: '',
                satuan: '',
                status: '',
            },
        ]);
    };

    const removeLabTest = (id: string) => {
        if (labTests.length > 1) {
            setLabTests(labTests.filter((test) => test.id !== id));
        }
    };

    const updateLabTest = (id: string, field: keyof LabTest, value: string) => {
        setLabTests(
            labTests.map((test) =>
                test.id === id ? { ...test, [field]: value } : test,
            ),
        );
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
            <PatientProfileHeader patient={patient} patientType="pregnancy" />

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
                                    <span>Riwayat Perkembangan Janin</span>
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
                            Riwayat Perkembangan Janin
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
                                            {/* Form 1: Pemeriksaan ANC */}
                                            <Card className="border-2">
                                                <CardHeader>
                                                    <CardTitle className="text-lg">
                                                        Pemeriksaan ANC
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    {/* Tekanan Darah */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Tekanan Darah Sistolik (mmHg)"
                                                            isRequired
                                                            id="tekanan_darah_sistolik"
                                                            name="tekanan_darah_sistolik"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan tekanan darah sistolik"
                                                        />
                                                        <Input
                                                            label="Tekanan Darah Diastolik (mmHg)"
                                                            isRequired
                                                            id="tekanan_darah_diastolik"
                                                            name="tekanan_darah_diastolik"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan tekanan darah diastolik"
                                                        />
                                                    </div>

                                                    {/* Berat Badan & LiLA */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Berat Badan (kg)"
                                                            isRequired
                                                            id="berat_badan"
                                                            name="berat_badan"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan berat badan"
                                                        />
                                                        <Input
                                                            label="LiLA(lingkar Lengan Atas)"
                                                            isRequired
                                                            id="lila"
                                                            name="lila"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan lingkar lengan atas"
                                                        />
                                                    </div>

                                                    {/* Tinggi Fundus & Status Kaki */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="TInggi Fundus (cm)"
                                                            id="tinggi_fundus"
                                                            name="tinggi_fundus"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan tinggi fundus"
                                                        />
                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor="measurement-method"
                                                                isRequired
                                                            >
                                                                Status Bengkak
                                                                Kaki
                                                            </Label>
                                                            <select
                                                                id="status_bengkak_kaki"
                                                                name="status_bengkak_kaki"
                                                                className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm outline-none focus-visible:ring-2"
                                                                required
                                                            >
                                                                <option value="">
                                                                    Pilih Status
                                                                    Bengkak Kaki
                                                                </option>
                                                                <option value="Tidak Ada">
                                                                    Tidak Ada
                                                                </option>
                                                                <option value="Ringan">
                                                                    Ringan
                                                                </option>
                                                                <option value="Berat">
                                                                    Berat
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {/* Suhu Tubuh */}
                                                    <Input
                                                        label="Suhu Tubuh (°C)"
                                                        isRequired
                                                        id="suhu_tubuh_celcius"
                                                        name="suhu_tubuh_celcius"
                                                        type="number"
                                                        placeholder="Masukkan suhu tubuh dalam celcius"
                                                    />
                                                    {/* Frekuensi Jantung & Saturasi Oksigen */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Frekuensi Nafas (x/menit)"
                                                            isRequired
                                                            id="frekuensi_nafas_per_menit"
                                                            name="frekuensi_nafas_per_menit"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan frekuensi nafas per menit"
                                                        />
                                                        <Input
                                                            label="Frekuensi Jantung (x/menit)"
                                                            isRequired
                                                            id="frekuensi_jantung_per_menit"
                                                            name="frekuensi_jantung_per_menit"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan frekuensi jantung per menit"
                                                        />
                                                    </div>

                                                    <Textarea
                                                        label="Keluhan Gejala"
                                                        id="keluhan"
                                                        name="keluhan"
                                                        placeholder="Tuliskan keluhan pasien..."
                                                        rows={2}
                                                    />
                                                    <Textarea
                                                        label="Catatan Petugas (Opsional)"
                                                        id="catatan_petugas"
                                                        name="catatan_petugas"
                                                        placeholder="Tuliskan catatan petugas..."
                                                        rows={2}
                                                    />
                                                    <Textarea
                                                        label="Deteksi Resiko (Opsional)"
                                                        id="deteksi_resiko"
                                                        name="deteksi_resiko"
                                                        placeholder="Tuliskan deteksi resiko..."
                                                        rows={3}
                                                    />
                                                    <div className="space-y-2">
                                                        <Label
                                                            htmlFor="saran_kunjungan_berikutnya"
                                                            isRequired
                                                        >
                                                            Rekomendasi
                                                            Kunjungan Berikutnya
                                                        </Label>
                                                        <Input
                                                            id="saran_kunjungan_berikutnya"
                                                            type="date"
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                {/* Form 2: Riwayat Imunisasi */}
                                                <Card className="border-2">
                                                    <CardHeader>
                                                        <CardTitle className="text-lg">
                                                            Riwayat Imunisasi
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="jenis_vaksin">
                                                                Jenis Vaksin
                                                                (Opsional)
                                                            </Label>
                                                            <Select>
                                                                <SelectTrigger id="jenis_vaksin">
                                                                    <SelectValue placeholder="Pilih jenis vaksin" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="TT-1">
                                                                        TT-1
                                                                    </SelectItem>
                                                                    <SelectItem value="TT-2">
                                                                        TT-2
                                                                    </SelectItem>
                                                                    <SelectItem value="TT-3">
                                                                        TT-3
                                                                    </SelectItem>
                                                                    <SelectItem value="TT-4">
                                                                        TT-4
                                                                    </SelectItem>
                                                                    <SelectItem value="TT-5">
                                                                        TT-5
                                                                    </SelectItem>
                                                                    <SelectItem value="Tdap">
                                                                        Tdap
                                                                    </SelectItem>
                                                                    <SelectItem value="Influenza">
                                                                        Influenza
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="tanggal_pemberian (Opsional)">
                                                                Tanggal Vaksin
                                                                (Opsional)
                                                            </Label>
                                                            <Input
                                                                id="tanggal_pemberian"
                                                                type="date"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="catatan_petugas">
                                                                Catatan Petugas
                                                                (Opsional)
                                                            </Label>
                                                            <Textarea
                                                                id="catatan_petugas"
                                                                placeholder="Reaksi atau catatan lainnya..."
                                                                rows={3}
                                                            />
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                {/* Form 3: Riwayat Sakit */}
                                                <Card className="border-2">
                                                    <CardHeader>
                                                        <CardTitle className="text-lg">
                                                            Riwayat Sakit
                                                            Kehamilan
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="tanggal_diagnosis">
                                                                    Tanggal
                                                                    Diagnosis
                                                                    Sakit
                                                                    (Opsional)
                                                                </Label>
                                                                <Input
                                                                    id="tanggal_diagnosis"
                                                                    type="date"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="status_penyakit">
                                                                    Status
                                                                    Penyakit
                                                                </Label>
                                                                <Select>
                                                                    <SelectTrigger id="status_penyakit">
                                                                        <SelectValue placeholder="Pilih status penyakit" />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-white">
                                                                        <SelectItem value="Aktif">
                                                                            Aktif
                                                                        </SelectItem>
                                                                        <SelectItem value="Terkontrol">
                                                                            Terkontrol
                                                                        </SelectItem>
                                                                        <SelectItem value="Sembuh">
                                                                            Sembuh
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="gejala">
                                                                Gejala
                                                                (Opsional)
                                                            </Label>
                                                            <Textarea
                                                                id="gejala"
                                                                placeholder="Demam, batuk, pilek, dll..."
                                                                rows={2}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="diagnosis">
                                                                Diagnosis
                                                                (Opsional)
                                                            </Label>
                                                            <Input
                                                                id="diagnosis"
                                                                placeholder="Diagnosis sakit"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="tindakan_pengobatan">
                                                                Tindakan
                                                                Pengobatan
                                                                (Opsional)
                                                            </Label>
                                                            <Textarea
                                                                id="tindakan_pengobatan"
                                                                placeholder="Obat yang diberikan, tindakan medis..."
                                                                rows={3}
                                                            />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                            {/* Form 4: Data Janin */}
                                            <Card className="border-2">
                                                <CardHeader>
                                                    <CardTitle className="text-lg">
                                                        Data Janin
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    {/* Urutan Janin & Denyut Jantung Janin */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Urutan Janin"
                                                            isRequired
                                                            id="urutan_janin"
                                                            name="urutan_janin"
                                                            type="number"
                                                            placeholder="Masukkan urutan janin"
                                                        />
                                                        <Input
                                                            label="Denyut Jantung Janin"
                                                            isRequired
                                                            id="denyut_jantung_janin"
                                                            name="denyut_jantung_janin"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan denyut jantung janin"
                                                        />
                                                    </div>

                                                    {/* Posisi Janin & Taksiran Berat */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Perkiraan Berat Janin (kg)"
                                                            isRequired
                                                            id="taksiran_berat_janin"
                                                            name="taksiran_berat_janin"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan perkiraan berat janin"
                                                        />
                                                        <div className="space-y-2">
                                                            <Label htmlFor="posisi_janin">
                                                                Posisi Janin
                                                            </Label>
                                                            <Select>
                                                                <SelectTrigger id="posisi_janin">
                                                                    <SelectValue placeholder="Pilih posisi janin" />
                                                                </SelectTrigger>
                                                                <SelectContent className="bg-white">
                                                                    <SelectItem value="Kepala">
                                                                        Kepala
                                                                    </SelectItem>
                                                                    <SelectItem value="Sungsang">
                                                                        Sungsang
                                                                    </SelectItem>
                                                                    <SelectItem value="Lintang">
                                                                        Lintang
                                                                    </SelectItem>
                                                                    <SelectItem value="Belum Terdefinisi">
                                                                        Belum
                                                                        Terdefinisi
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <Textarea
                                                        label="Posisi Deskriptif Janin"
                                                        id="posisi_deskriptif"
                                                        name="posisi_deskriptif"
                                                        placeholder="Tuliskan posisi deskriptif janin..."
                                                        rows={2}
                                                    />
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="pergerakan_janin">
                                                                Pergerakan Janin
                                                            </Label>
                                                            <Select>
                                                                <SelectTrigger id="pergerakan_janin">
                                                                    <SelectValue placeholder="Pilih pegerakan janin" />
                                                                </SelectTrigger>
                                                                <SelectContent className="bg-white">
                                                                    <SelectItem value="Aktif">
                                                                        Aktif
                                                                    </SelectItem>
                                                                    <SelectItem value="Berkurang">
                                                                        Berkurang
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <Input
                                                            label="Indeks Cairan Ketuban (AFI)"
                                                            isRequired
                                                            id="indeks_cairan_ketuban"
                                                            name="indeks_cairan_ketuban"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan indeks cairan ketuban"
                                                        />
                                                    </div>

                                                    {/* Tinggi Fundus & Status Kaki */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="USG Biparietal (BPD)"
                                                            id="usg_bpd_mm"
                                                            name="usg_bpd_mm"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan hasil usg biparietal (mm)"
                                                        />
                                                        <Input
                                                            label="USG Head Circumference (HC)"
                                                            id="usg_hc_mm"
                                                            name="usg_hc_mm"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Nasukkan hasil usg head circumference (mm)"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="USG Abdominal Circumference (AC)"
                                                            id="usg_ac_mm"
                                                            name="usg_ac_mm"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan hasil usg abdominal circumference (mm)"
                                                        />
                                                        <Input
                                                            label="USG Femur Length (FL)"
                                                            id="usg_fl_mm"
                                                            name="usg_fl_mm"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Nasukkan hasil usg femur length (mm)"
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div className="space-y-4">
                                                    {labTests.map(
                                                        (test, index) => (
                                                            <Card
                                                                key={test.id}
                                                                className="relative border-2"
                                                            >
                                                                <CardHeader className="flex flex-row items-center justify-between">
                                                                    <CardTitle className="text-lg">
                                                                        Hasil
                                                                        Lab{' '}
                                                                        {index +
                                                                            1}
                                                                    </CardTitle>
                                                                    {labTests.length >
                                                                        1 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                removeLabTest(
                                                                                    test.id,
                                                                                )
                                                                            }
                                                                            className="flex items-center gap-1 text-sm text-red-600 transition-colors hover:text-red-700"
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                            Hapus
                                                                        </button>
                                                                    )}
                                                                </CardHeader>
                                                                <CardContent className="space-y-4">
                                                                    <div className="space-y-2">
                                                                        <Label
                                                                            htmlFor={`nama_tes_${test.id}`}
                                                                            isRequired
                                                                        >
                                                                            Nama
                                                                            Tes
                                                                            Lab
                                                                        </Label>
                                                                        <Select
                                                                            value={
                                                                                test.namaTes
                                                                            }
                                                                            onValueChange={(
                                                                                value,
                                                                            ) =>
                                                                                updateLabTest(
                                                                                    test.id,
                                                                                    'namaTes',
                                                                                    value,
                                                                                )
                                                                            }
                                                                        >
                                                                            <SelectTrigger
                                                                                id={`nama_tes_${test.id}`}
                                                                                className="w-full"
                                                                            >
                                                                                <SelectValue placeholder="Pilih Tes Lab" />
                                                                            </SelectTrigger>
                                                                            <SelectContent className="bg-white">
                                                                                <SelectItem value="Hb">
                                                                                    Hb
                                                                                </SelectItem>
                                                                                <SelectItem value="Protein Urin">
                                                                                    Protein
                                                                                    Urin
                                                                                </SelectItem>
                                                                                <SelectItem value="Gula Darah">
                                                                                    Gula
                                                                                    Darah
                                                                                </SelectItem>
                                                                                <SelectItem value="HIV">
                                                                                    HIV
                                                                                </SelectItem>
                                                                                <SelectItem value="HBsAG">
                                                                                    HBsAG
                                                                                </SelectItem>
                                                                                <SelectItem value="Sifilis">
                                                                                    Sifilis
                                                                                </SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>

                                                                    <Textarea
                                                                        label="Hasil Lab"
                                                                        isRequired
                                                                        id={`hasil_lab_${test.id}`}
                                                                        value={
                                                                            test.hasilLab
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            updateLabTest(
                                                                                test.id,
                                                                                'hasilLab',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                        placeholder="Masukkan hasil lab..."
                                                                        rows={3}
                                                                    />

                                                                    <Textarea
                                                                        label="Satuan"
                                                                        isRequired
                                                                        id={`satuan_${test.id}`}
                                                                        value={
                                                                            test.satuan
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            updateLabTest(
                                                                                test.id,
                                                                                'satuan',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                        placeholder="Satuan hasil lab..."
                                                                        rows={2}
                                                                    />

                                                                    <div className="space-y-2">
                                                                        <Label
                                                                            htmlFor={`status_${test.id}`}
                                                                            isRequired
                                                                        >
                                                                            Status
                                                                            Hasil
                                                                            Lab
                                                                        </Label>
                                                                        <Select
                                                                            value={
                                                                                test.status
                                                                            }
                                                                            onValueChange={(
                                                                                value,
                                                                            ) =>
                                                                                updateLabTest(
                                                                                    test.id,
                                                                                    'status',
                                                                                    value,
                                                                                )
                                                                            }
                                                                        >
                                                                            <SelectTrigger
                                                                                id={`status_${test.id}`}
                                                                                className="w-full"
                                                                            >
                                                                                <SelectValue placeholder="Pilih Status Hasil Lab" />
                                                                            </SelectTrigger>
                                                                            <SelectContent className="bg-white">
                                                                                <SelectItem value="Normal">
                                                                                    Normal
                                                                                </SelectItem>
                                                                                <SelectItem value="Tidak Normal">
                                                                                    Tidak
                                                                                    Normal
                                                                                </SelectItem>
                                                                                <SelectItem value="Perlu Tindak Lanjut">
                                                                                    Perlu
                                                                                    Tindak
                                                                                    Lanjut
                                                                                </SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        ),
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={addLabTest}
                                                        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                        Tambah Uji Lab
                                                    </button>
                                                </div>
                                                {/* Form 5: Media Pemeriksaan Anak */}
                                                <Card className="border-2">
                                                    <CardHeader>
                                                        <CardTitle className="text-lg">
                                                            Media Pemeriksaan
                                                            Anak
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
                                                                Format: JPG,
                                                                PNG, PDF, DOC
                                                                (Maks. 5MB per
                                                                file)
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
                                                                Deskripsi
                                                                (Opsional)
                                                            </Label>
                                                            <Textarea
                                                                id="media-notes"
                                                                placeholder="Deskripsi atau catatan tentang file yang diupload..."
                                                                rows={4}
                                                            />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Form 1: Pemeriksaan ANC */}
                                            <Card className="border-2">
                                                <CardHeader>
                                                    <CardTitle className="text-lg">
                                                        Pemeriksaan ANC
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    {/* Tekanan Darah */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Tekanan Darah Sistolik (mmHg)"
                                                            isRequired
                                                            id="tekanan_darah_sistolik"
                                                            name="tekanan_darah_sistolik"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan tekanan darah sistolik"
                                                        />
                                                        <Input
                                                            label="Tekanan Darah Diastolik (mmHg)"
                                                            isRequired
                                                            id="tekanan_darah_diastolik"
                                                            name="tekanan_darah_diastolik"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan tekanan darah diastolik"
                                                        />
                                                    </div>

                                                    {/* Berat Badan & LiLA */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Berat Badan (kg)"
                                                            isRequired
                                                            id="berat_badan"
                                                            name="berat_badan"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan berat badan"
                                                        />
                                                        <Input
                                                            label="LiLA(lingkar Lengan Atas)"
                                                            isRequired
                                                            id="lila"
                                                            name="lila"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan lingkar lengan atas"
                                                        />
                                                    </div>

                                                    {/* Tinggi Fundus & Status Kaki */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="TInggi Fundus (cm)"
                                                            id="tinggi_fundus"
                                                            name="tinggi_fundus"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan tinggi fundus"
                                                        />
                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor="measurement-method"
                                                                isRequired
                                                            >
                                                                Status Bengkak
                                                                Kaki
                                                            </Label>
                                                            <select
                                                                id="status_bengkak_kaki"
                                                                name="status_bengkak_kaki"
                                                                className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm outline-none focus-visible:ring-2"
                                                                required
                                                            >
                                                                <option value="">
                                                                    Pilih Status
                                                                    Bengkak Kaki
                                                                </option>
                                                                <option value="Tidak Ada">
                                                                    Tidak Ada
                                                                </option>
                                                                <option value="Ringan">
                                                                    Ringan
                                                                </option>
                                                                <option value="Berat">
                                                                    Berat
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {/* Suhu Tubuh */}
                                                    <Input
                                                        label="Suhu Tubuh (°C)"
                                                        isRequired
                                                        id="suhu_tubuh_celcius"
                                                        name="suhu_tubuh_celcius"
                                                        type="number"
                                                        placeholder="Masukkan suhu tubuh dalam celcius"
                                                    />
                                                    {/* Frekuensi Jantung & Saturasi Oksigen */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Frekuensi Nafas (x/menit)"
                                                            isRequired
                                                            id="frekuensi_nafas_per_menit"
                                                            name="frekuensi_nafas_per_menit"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan frekuensi nafas per menit"
                                                        />
                                                        <Input
                                                            label="Frekuensi Jantung (x/menit)"
                                                            isRequired
                                                            id="frekuensi_jantung_per_menit"
                                                            name="frekuensi_jantung_per_menit"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan frekuensi jantung per menit"
                                                        />
                                                    </div>

                                                    <Textarea
                                                        label="Keluhan Gejala"
                                                        id="keluhan"
                                                        name="keluhan"
                                                        placeholder="Tuliskan keluhan pasien..."
                                                        rows={2}
                                                    />
                                                    <Textarea
                                                        label="Catatan Petugas (Opsional)"
                                                        id="catatan_petugas"
                                                        name="catatan_petugas"
                                                        placeholder="Tuliskan catatan petugas..."
                                                        rows={2}
                                                    />
                                                    <Textarea
                                                        label="Deteksi Resiko (Opsional)"
                                                        id="deteksi_resiko"
                                                        name="deteksi_resiko"
                                                        placeholder="Tuliskan deteksi resiko..."
                                                        rows={3}
                                                    />
                                                    <div className="space-y-2">
                                                        <Label
                                                            htmlFor="saran_kunjungan_berikutnya"
                                                            isRequired
                                                        >
                                                            Rekomendasi
                                                            Kunjungan Berikutnya
                                                        </Label>
                                                        <Input
                                                            id="saran_kunjungan_berikutnya"
                                                            type="date"
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                {/* Form 2: Riwayat Imunisasi */}

                                                {/* Form 3: Riwayat Sakit */}
                                                <Card className="border-2">
                                                    <CardHeader>
                                                        <CardTitle className="text-lg">
                                                            Riwayat Sakit
                                                            Kehamilan
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="tanggal_diagnosis">
                                                                    Tanggal
                                                                    Diagnosis
                                                                    Sakit
                                                                    (Opsional)
                                                                </Label>
                                                                <Input
                                                                    id="tanggal_diagnosis"
                                                                    type="date"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="status_penyakit">
                                                                    Status
                                                                    Penyakit
                                                                </Label>
                                                                <Select>
                                                                    <SelectTrigger id="status_penyakit">
                                                                        <SelectValue placeholder="Pilih status penyakit" />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-white">
                                                                        <SelectItem value="Aktif">
                                                                            Aktif
                                                                        </SelectItem>
                                                                        <SelectItem value="Terkontrol">
                                                                            Terkontrol
                                                                        </SelectItem>
                                                                        <SelectItem value="Sembuh">
                                                                            Sembuh
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="gejala">
                                                                Gejala
                                                                (Opsional)
                                                            </Label>
                                                            <Textarea
                                                                id="gejala"
                                                                placeholder="Demam, batuk, pilek, dll..."
                                                                rows={2}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="diagnosis">
                                                                Diagnosis
                                                                (Opsional)
                                                            </Label>
                                                            <Input
                                                                id="diagnosis"
                                                                placeholder="Diagnosis sakit"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="tindakan_pengobatan">
                                                                Tindakan
                                                                Pengobatan
                                                                (Opsional)
                                                            </Label>
                                                            <Textarea
                                                                id="tindakan_pengobatan"
                                                                placeholder="Obat yang diberikan, tindakan medis..."
                                                                rows={3}
                                                            />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                                <div className="space-y-4">
                                                    {labTests.map(
                                                        (test, index) => (
                                                            <Card
                                                                key={test.id}
                                                                className="relative border-2"
                                                            >
                                                                <CardHeader className="flex flex-row items-center justify-between">
                                                                    <CardTitle className="text-lg">
                                                                        Hasil
                                                                        Lab{' '}
                                                                        {index +
                                                                            1}
                                                                    </CardTitle>
                                                                    {labTests.length >
                                                                        1 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                removeLabTest(
                                                                                    test.id,
                                                                                )
                                                                            }
                                                                            className="flex items-center gap-1 text-sm text-red-600 transition-colors hover:text-red-700"
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                            Hapus
                                                                        </button>
                                                                    )}
                                                                </CardHeader>
                                                                <CardContent className="space-y-4">
                                                                    <div className="space-y-2">
                                                                        <Label
                                                                            htmlFor={`nama_tes_${test.id}`}
                                                                            isRequired
                                                                        >
                                                                            Nama
                                                                            Tes
                                                                            Lab
                                                                        </Label>
                                                                        <Select
                                                                            value={
                                                                                test.namaTes
                                                                            }
                                                                            onValueChange={(
                                                                                value,
                                                                            ) =>
                                                                                updateLabTest(
                                                                                    test.id,
                                                                                    'namaTes',
                                                                                    value,
                                                                                )
                                                                            }
                                                                        >
                                                                            <SelectTrigger
                                                                                id={`nama_tes_${test.id}`}
                                                                                className="w-full"
                                                                            >
                                                                                <SelectValue placeholder="Pilih Tes Lab" />
                                                                            </SelectTrigger>
                                                                            <SelectContent className="bg-white">
                                                                                <SelectItem value="Hb">
                                                                                    Hb
                                                                                </SelectItem>
                                                                                <SelectItem value="Protein Urin">
                                                                                    Protein
                                                                                    Urin
                                                                                </SelectItem>
                                                                                <SelectItem value="Gula Darah">
                                                                                    Gula
                                                                                    Darah
                                                                                </SelectItem>
                                                                                <SelectItem value="HIV">
                                                                                    HIV
                                                                                </SelectItem>
                                                                                <SelectItem value="HBsAG">
                                                                                    HBsAG
                                                                                </SelectItem>
                                                                                <SelectItem value="Sifilis">
                                                                                    Sifilis
                                                                                </SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>

                                                                    <Textarea
                                                                        label="Hasil Lab"
                                                                        isRequired
                                                                        id={`hasil_lab_${test.id}`}
                                                                        value={
                                                                            test.hasilLab
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            updateLabTest(
                                                                                test.id,
                                                                                'hasilLab',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                        placeholder="Masukkan hasil lab..."
                                                                        rows={3}
                                                                    />

                                                                    <Textarea
                                                                        label="Satuan"
                                                                        isRequired
                                                                        id={`satuan_${test.id}`}
                                                                        value={
                                                                            test.satuan
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            updateLabTest(
                                                                                test.id,
                                                                                'satuan',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                        placeholder="Satuan hasil lab..."
                                                                        rows={2}
                                                                    />

                                                                    <div className="space-y-2">
                                                                        <Label
                                                                            htmlFor={`status_${test.id}`}
                                                                            isRequired
                                                                        >
                                                                            Status
                                                                            Hasil
                                                                            Lab
                                                                        </Label>
                                                                        <Select
                                                                            value={
                                                                                test.status
                                                                            }
                                                                            onValueChange={(
                                                                                value,
                                                                            ) =>
                                                                                updateLabTest(
                                                                                    test.id,
                                                                                    'status',
                                                                                    value,
                                                                                )
                                                                            }
                                                                        >
                                                                            <SelectTrigger
                                                                                id={`status_${test.id}`}
                                                                                className="w-full"
                                                                            >
                                                                                <SelectValue placeholder="Pilih Status Hasil Lab" />
                                                                            </SelectTrigger>
                                                                            <SelectContent className="bg-white">
                                                                                <SelectItem value="Normal">
                                                                                    Normal
                                                                                </SelectItem>
                                                                                <SelectItem value="Tidak Normal">
                                                                                    Tidak
                                                                                    Normal
                                                                                </SelectItem>
                                                                                <SelectItem value="Perlu Tindak Lanjut">
                                                                                    Perlu
                                                                                    Tindak
                                                                                    Lanjut
                                                                                </SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        ),
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={addLabTest}
                                                        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                        Tambah Uji Lab
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Form 4: Data Janin */}
                                            <Card className="border-2">
                                                <CardHeader>
                                                    <CardTitle className="text-lg">
                                                        Data Janin
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    {/* Urutan Janin & Denyut Jantung Janin */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Urutan Janin"
                                                            isRequired
                                                            id="urutan_janin"
                                                            name="urutan_janin"
                                                            type="number"
                                                            placeholder="Masukkan urutan janin"
                                                        />
                                                        <Input
                                                            label="Denyut Jantung Janin"
                                                            isRequired
                                                            id="denyut_jantung_janin"
                                                            name="denyut_jantung_janin"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan denyut jantung janin"
                                                        />
                                                    </div>

                                                    {/* Posisi Janin & Taksiran Berat */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Perkiraan Berat Janin (kg)"
                                                            isRequired
                                                            id="taksiran_berat_janin"
                                                            name="taksiran_berat_janin"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan perkiraan berat janin"
                                                        />
                                                        <div className="space-y-2">
                                                            <Label htmlFor="posisi_janin">
                                                                Posisi Janin
                                                            </Label>
                                                            <Select>
                                                                <SelectTrigger id="posisi_janin">
                                                                    <SelectValue placeholder="Pilih posisi janin" />
                                                                </SelectTrigger>
                                                                <SelectContent className="bg-white">
                                                                    <SelectItem value="Kepala">
                                                                        Kepala
                                                                    </SelectItem>
                                                                    <SelectItem value="Sungsang">
                                                                        Sungsang
                                                                    </SelectItem>
                                                                    <SelectItem value="Lintang">
                                                                        Lintang
                                                                    </SelectItem>
                                                                    <SelectItem value="Belum Terdefinisi">
                                                                        Belum
                                                                        Terdefinisi
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <Textarea
                                                        label="Posisi Deskriptif Janin"
                                                        id="posisi_deskriptif"
                                                        name="posisi_deskriptif"
                                                        placeholder="Tuliskan posisi deskriptif janin..."
                                                        rows={2}
                                                    />
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="pergerakan_janin">
                                                                Pergerakan Janin
                                                            </Label>
                                                            <Select>
                                                                <SelectTrigger id="pergerakan_janin">
                                                                    <SelectValue placeholder="Pilih pegerakan janin" />
                                                                </SelectTrigger>
                                                                <SelectContent className="bg-white">
                                                                    <SelectItem value="Aktif">
                                                                        Aktif
                                                                    </SelectItem>
                                                                    <SelectItem value="Berkurang">
                                                                        Berkurang
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <Input
                                                            label="Indeks Cairan Ketuban (AFI)"
                                                            isRequired
                                                            id="indeks_cairan_ketuban"
                                                            name="indeks_cairan_ketuban"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan indeks cairan ketuban"
                                                        />
                                                    </div>

                                                    {/* Tinggi Fundus & Status Kaki */}
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="USG Biparietal (BPD)"
                                                            id="usg_bpd_mm"
                                                            name="usg_bpd_mm"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan hasil usg biparietal (mm)"
                                                        />
                                                        <Input
                                                            label="USG Head Circumference (HC)"
                                                            id="usg_hc_mm"
                                                            name="usg_hc_mm"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Nasukkan hasil usg head circumference (mm)"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="USG Abdominal Circumference (AC)"
                                                            id="usg_ac_mm"
                                                            name="usg_ac_mm"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Masukkan hasil usg abdominal circumference (mm)"
                                                        />
                                                        <Input
                                                            label="USG Femur Length (FL)"
                                                            id="usg_fl_mm"
                                                            name="usg_fl_mm"
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="Nasukkan hasil usg femur length (mm)"
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            {/* Form 5: Media Pemeriksaan Anak */}
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
                                <CardTitle>
                                    Riwayat Perkembangan Janin
                                </CardTitle>
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

export default PregnancyCheckupPage;
