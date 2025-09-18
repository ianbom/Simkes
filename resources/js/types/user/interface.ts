export interface User {
    id: number;
    faskes_id: number | null;
    provinsi_id: number | null;
    kota_id: number | null;
    kecamatan_id: number | null;
    name: string;
    email: string;
    email_verified_at: string | null;
    password: string | null;
    nik: string | null;
    tanggal_lahir: string | null;
    kelamin: 'L' | 'P' | null;
    no_telp: string | null;
    role: 'Warga' | 'Petugas Faskes' | 'Admin Faskes' | 'Superadmin' | null;
    profile_pic_url: string | null;
    status_user: 'Aktif' | 'Nonaktif' | 'Meninggal' | null;
    tanggal_meningal: string | null;
    alamat: string | null;
    created_at: string | null;
    updated_at: string | null;

    kota: {
        name: string;
    };
    kecamatan: {
        name: string;
    };
    provisi: {
        name: string;
    };
}
