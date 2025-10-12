import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Calendar,
    Droplet,
    Heart,
    MapPin,
    Phone,
    User,
    Baby,
    Activity,
    Ruler,
    AlertCircle,
    Mail,
    CreditCard,
    Clock,
} from 'lucide-react';

interface RiwayatMedis {
    id: number;
    user_id: number;
    golongan_darah: string;
    rhesus: string;
    jumlah_keguguran: number;
    riwayat_alergi: string;
    created_at: string;
    updated_at: string;
}

interface UserData {
    id: number;
    faskes_id: number | null;
    provinsi_id: number;
    kota_id: number;
    kecamatan_id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    nik: string;
    tanggal_lahir: string;
    kelamin: string;
    no_telp: string;
    role: string;
    profile_pic_url: string | null;
    status_user: string;
    tanggal_meninggal: string | null;
    alamat: string;
    created_at: string;
    updated_at: string;
    riwayat_medis?: RiwayatMedis;
}

interface Pregnant {
    id: number;
    user_id: number;
    kehamilan_ke: number;
    hpht: string;
    hpl: string;
    tinggi_badan_awal: string;
    jumlah_janin: number;
    status: string;
    created_at: string;
    updated_at: string;
    user: UserData;
}

interface Props {
    pregnant: Pregnant;
}

export function PatientKehamilanProfileHeader({ pregnant }: Props) {
    const user = pregnant.user;
    const riwayatMedis = user.riwayat_medis;

    // Hitung usia ibu
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

    // Hitung usia kehamilan dalam minggu
    const calcPregnancyWeeks = (hpht: string) => {
        const hphtDate = new Date(hpht);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - hphtDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(diffDays / 7);
        const days = diffDays % 7;
        return { weeks, days };
    };

    const age = calcAge(user.tanggal_lahir);
    const pregnancyAge = calcPregnancyWeeks(pregnant.hpht);

    // Format tanggal
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Status badge color
    const getStatusBadgeColor = (status: string) => {
        return status === 'Aktif'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800';
    };

    return (
        <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
                <div className="flex flex-col gap-6 sm:flex-row">
                    {/* Foto / Inisial Ibu */}
                    <div className="flex-shrink-0">
                        {user.profile_pic_url ? (
                            <img
                                src={`/storage/${user.profile_pic_url}`}
                                alt={user.name}
                                className="h-24 w-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-pink-100 text-xl font-bold text-pink-700">
                                {user.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Info Ibu Hamil */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-3">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {user.name}
                                </h2>
                                <Badge className="bg-pink-100 text-pink-800">
                                    <User className="mr-1 h-3 w-3" />
                                    Ibu Hamil
                                </Badge>
                                <Badge variant="outline" className="bg-blue-50">
                                    <Baby className="mr-1 h-3 w-3" />
                                    Kehamilan ke-{pregnant.kehamilan_ke}
                                </Badge>
                                <Badge className={getStatusBadgeColor(pregnant.status)}>
                                    <Activity className="mr-1 h-3 w-3" />
                                    {pregnant.status}
                                </Badge>
                            </div>

                            {/* Info dasar ibu */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    {age} Tahun
                                </span>
                                <span className="flex items-center gap-1">
                                    <Heart className="h-4 w-4" />
                                    {user.kelamin === 'P' ? 'Perempuan' : 'Laki-laki'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Usia Kehamilan: {pregnancyAge.weeks} Minggu{' '}
                                    {pregnancyAge.days} Hari
                                </span>
                                {riwayatMedis?.golongan_darah && (
                                    <span className="flex items-center gap-1">
                                        <Droplet className="h-4 w-4" />
                                        {riwayatMedis.golongan_darah}
                                        {riwayatMedis.rhesus}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Info lengkap dalam grid */}
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            {/* Data Pribadi */}
                            <div>
                                <h3 className="mb-2 font-semibold text-gray-900">
                                    Data Pribadi
                                </h3>
                                <div className="space-y-1.5 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="h-3.5 w-3.5 flex-shrink-0" />
                                        <span className="break-all">NIK: {user.nik}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                                        <span>Lahir: {formatDate(user.tanggal_lahir)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                                        <span>{user.no_telp}</span>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                                        <span>{user.alamat}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Informasi Kehamilan */}
                            <div>
                                <h3 className="mb-2 font-semibold text-gray-900">
                                    Informasi Kehamilan
                                </h3>
                                <div className="space-y-1.5 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                                        <span>HPHT: {formatDate(pregnant.hpht)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                                        <span>HPL: {formatDate(pregnant.hpl)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Baby className="h-3.5 w-3.5 flex-shrink-0" />
                                        <span>Jumlah Janin: {pregnant.jumlah_janin}</span>
                                    </div>

                                </div>
                            </div>

                            {/* Riwayat Medis */}
                            <div>
                                <h3 className="mb-2 font-semibold text-gray-900">
                                    Riwayat Medis
                                </h3>
                                {riwayatMedis ? (
                                    <div className="space-y-1.5 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Droplet className="h-3.5 w-3.5 flex-shrink-0" />
                                            <span>
                                                Golongan Darah: {riwayatMedis.golongan_darah}
                                                {riwayatMedis.rhesus}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                                            <span>
                                                Jumlah Keguguran: {riwayatMedis.jumlah_keguguran}
                                            </span>
                                        </div>
                                        {riwayatMedis.riwayat_alergi && (
                                            <div className="flex items-start gap-2">
                                                <Heart className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                                                <span>
                                                    Alergi: {riwayatMedis.riwayat_alergi}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        Belum ada riwayat medis
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
