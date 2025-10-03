import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Droplet, Heart, MapPin, Phone, User } from 'lucide-react';

interface Patient {
    id: string;
    name: string;
    age: number;
    kelamin: 'L' | 'P'; // L = Laki-laki, P = Perempuan
    patientId: string;
    phone: string;
    address: string;
    emergencyContact: string;
    isPregnant?: boolean;
    pregnancyWeek?: number;
    bloodType: string;
    allergies: string[];
    currentMedications: string[];
    lastVisit: string;
    photo?: string;
    appointmentType: string;
}

interface PregnancyPatientProfileHeaderProps {
    patient: Patient;
    patientType?: 'adult' | 'child' | 'pregnancy'; // Tipe pasien
}

export function PatientProfileHeader({
    patient,
    patientType = 'adult',
}: PatientProfileHeaderProps) {
    // Tentukan SVG icon gender berdasarkan kelamin
    const GenderIcon =
        patient.kelamin === 'L'
            ? () => (
                  <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                      <circle cx="10" cy="14" r="6" strokeWidth="2" />
                      <path
                          d="M14.5 4l4 4m0 0l-4 4m4-4h-6"
                          strokeWidth="2"
                          strokeLinecap="round"
                      />
                  </svg>
              )
            : () => (
                  <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                      <circle cx="12" cy="9" r="6" strokeWidth="2" />
                      <path
                          d="M12 15v7m-4-2l4 2 4-2"
                          strokeWidth="2"
                          strokeLinecap="round"
                      />
                  </svg>
              );
    const genderText = patient.kelamin === 'L' ? 'Laki-laki' : 'Perempuan';

    // Tentukan warna badge berdasarkan tipe pasien
    const getBadgeColor = () => {
        if (patientType === 'pregnancy' || patient.isPregnant) {
            return 'bg-pink-100 text-pink-800';
        }
        if (patientType === 'child') {
            return 'bg-blue-100 text-blue-800';
        }
        return 'bg-gray-100 text-gray-800';
    };

    return (
        <Card className="bg-white">
            <CardContent className="p-6">
                <div className="flex flex-col gap-6 sm:flex-row">
                    {/* Patient Photo */}
                    <div className="flex-shrink-0">
                        <div className="bg-muted h-24 w-24 overflow-hidden rounded-full">
                            {patient.photo ? (
                                <img
                                    src={patient.photo}
                                    alt={patient.name}
                                    className="h-full w-full rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-gray-700">
                                    {patient.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')
                                        .toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Patient Basic Info */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-3">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {patient.name}
                                </h2>

                                <span className="text-sm font-medium text-gray-600">
                                    ID: {patient.patientId}
                                </span>

                                {/* Badge untuk Kehamilan */}
                                {(patient.isPregnant ||
                                    patientType === 'pregnancy') && (
                                    <Badge className={getBadgeColor()}>
                                        <Heart className="mr-1 h-3 w-3" />
                                        Hamil{' '}
                                        {patient.pregnancyWeek &&
                                            `(${patient.pregnancyWeek} minggu)`}
                                    </Badge>
                                )}

                                {/* Badge untuk Anak */}
                                {patientType === 'child' && (
                                    <Badge className={getBadgeColor()}>
                                        <User className="mr-1 h-3 w-3" />
                                        Anak
                                    </Badge>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    {patient.age} Tahun
                                </span>
                                <span className="flex items-center gap-1">
                                    <GenderIcon />
                                    {genderText}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Droplet className="h-4 w-4" />
                                    {patient.bloodType}
                                </span>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <h3 className="mb-2 font-medium text-gray-900">
                                    Informasi Kontak
                                </h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-3 w-3" />
                                        <span>{patient.phone}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0" />
                                        <span>{patient.address}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-2 font-medium text-gray-900">
                                    Informasi Tambahan
                                </h3>
                                <div className="text-sm text-gray-600">
                                    <span>{patient.emergencyContact}</span>
                                </div>
                                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                        Kunjungan terakhir: {patient.lastVisit}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
