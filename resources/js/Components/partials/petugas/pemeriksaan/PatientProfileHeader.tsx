import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import {
    Calendar,
    Droplet,
    Heart,
    MapPin,
    Phone,
    User,
    Venus,
    Mars,
} from 'lucide-react';

interface Child {
    id: number;
    nama: string;
    kelamin: 'L' | 'P';
    tanggal_lahir: string;
    tanggal_meninggal?: string | null;
    berat_lahir_gram?: number;
    panjang_lahir_cm?: string;
    lingkar_kepala_cm?: string;
    urutan_kelahiran?: number;
    kondisi?: string;
    orang_tua?: {
        id: number;
        name: string;
        no_telp: string;
        alamat: string;
    };
}

interface PatientProfileHeaderProps {
    child: Child;
    patientType?: 'child';
}

export function PatientProfileHeader({
    child,
    patientType = 'child',
}: PatientProfileHeaderProps) {
    // Icon gender
    const GenderIcon =
        child.kelamin === 'L'
            ? () => <Mars className="h-4 w-4" />
            : () => <Venus className="h-4 w-4" />;
    const genderText = child.kelamin === 'L' ? 'Laki-laki' : 'Perempuan';

    // Warna badge
    const getBadgeColor = () => 'bg-blue-100 text-blue-800';

    // Hitung usia anak (tahun)
    const calcAge = (tanggalLahir: string) => {
        const birth = new Date(tanggalLahir);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const age = calcAge(child.tanggal_lahir);

    return (
        <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
                <div className="flex flex-col gap-6 sm:flex-row">
                    {/* Foto / Inisial Anak */}
                    <div className="flex-shrink-0">
                        <div className="bg-muted h-24 w-24 overflow-hidden rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
                            {child.nama
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()}
                        </div>
                    </div>

                    {/* Info Anak */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-3">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {child.nama}
                                </h2>
                                <Badge className={getBadgeColor()}>
                                    <User className="mr-1 h-3 w-3" />
                                    Anak
                                </Badge>
                            </div>

                            {/* Info dasar anak */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    {age} Tahun
                                </span>
                                <span className="flex items-center gap-1">
                                    <GenderIcon />
                                    {genderText}
                                </span>
                                {child.berat_lahir_gram && (
                                    <span className="flex items-center gap-1">
                                        <Droplet className="h-4 w-4" />
                                        {child.berat_lahir_gram} gr
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Info kontak dan tambahan */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Kontak Orang Tua */}
                            <div>
                                <h3 className="mb-2 font-medium text-gray-900">
                                    Informasi Orang Tua
                                </h3>
                                {child.orang_tua ? (
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <User className="h-3 w-3" />
                                            <span>{child.orang_tua.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-3 w-3" />
                                            <span>{child.orang_tua.no_telp}</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0" />
                                            <span>{child.orang_tua.alamat}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        Data orang tua tidak tersedia.
                                    </p>
                                )}
                            </div>

                            {/* Informasi Tambahan */}
                            <div>
                                <h3 className="mb-2 font-medium text-gray-900">
                                    Informasi Tambahan
                                </h3>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-3 w-3" />
                                        <span>
                                            Tanggal Lahir:{' '}
                                            {new Date(
                                                child.tanggal_lahir
                                            ).toLocaleDateString('id-ID')}
                                        </span>
                                    </div>
                                    {child.kondisi && (
                                        <div className="flex items-center gap-2">
                                            <Heart className="h-3 w-3" />
                                            <span>Kondisi: {child.kondisi}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
