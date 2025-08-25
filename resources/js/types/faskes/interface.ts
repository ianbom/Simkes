export type Faskes = {
    id: number;
    provinsi_id: number;
    kota_id: number;
    kecamatan_id: number;
    nama: string;
    tipe_faskes: 'Puskesmas' | 'Klinik' | 'RSIA' | 'RSUD' | 'Posyandu' | string;
    alamat: string | null;
    profile_pic_url: string | null;
    deskripsi: string | null;
    latitude: number;
    longitude: number;
    created_at: string;
    updated_at: string;
};
