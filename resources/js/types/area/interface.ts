export interface Provinsi {
    id: number;
    nama: string;
    kota?: Kota[];
    created_at?: string;
    updated_at?: string;
}

export interface Kota {
    id: number;
    provinsi_id: number;
    nama: string;
    kecamatan?: Kecamatan[];
    created_at: string;
    updated_at: string;
}

export interface Kecamatan {
    id: number;
    kota_id: number;
    nama: string;
    created_at?: string;
    updated_at?: string;
}
