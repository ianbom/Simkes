import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { TabsContent } from '@/Components/ui/tabs';
import { Activity, FileText, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import FormPemeriksaanRutinAnak from './FormPemeriksaanRutinAnak';
import FormPemeriksaanSakitAnak from './FormPemeriksaanSakitAnak';

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

export default function TabsPemeriksaanAnak({ child }) {
    const [patient] = useState(mockPatient);
    const [checkupType, setCheckupType] = useState('routine');

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
                                    Pemeriksaan rutin untuk memantau kondisi
                                    kesehatan pasien secara berkala
                                </p>
                            </div>
                        ) : (
                            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-950">
                                <h3 className="text-foreground mb-2 flex items-center gap-2 font-medium">
                                    <Activity className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    Checkup Gejala Sakit
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    Pemeriksaan untuk mendiagnosis dan menangani
                                    keluhan atau gejala sakit
                                </p>
                            </div>
                        )}
                        {checkupType === 'routine' ? (
                            <FormPemeriksaanRutinAnak child={child} />
                        ) : (
                            <FormPemeriksaanSakitAnak child={child} />
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
    );
}
