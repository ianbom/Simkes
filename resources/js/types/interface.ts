import { Kecamatan, Kota, Provinsi } from './area/interface';
export interface User {
    id: number;
    faskes_id: number;
    provinsi_id: number;
    kota_id: number;
    kecamatan_id: number;
    name: string;
    email: string;
    nik: string;
    tanggal_lahir: string;
    kelamin: 'L' | 'P';
    no_telp: string;
    role: 'Warga' | 'Petugas Faskes' | 'Admin Faskes' | 'Superadmin';
    profile_pic_url?: string;
    status_user: 'Aktif' | 'Nonaktif' | 'Meninggal';
    tanggal_meningal?: string;
    alamat?: string;
    created_at: string;
    email_verified_at?: string;
    password?: string;
    kota?: Kota;
    kecamatan?: Kecamatan;
    provinsi?: Provinsi;
    updated_at: string;
}
export interface Kelahiran {
    id: number;
    tanggal_lahir: string;
    berat_lahir: number;
    panjang_lahir: number;
}
export interface Kehamilan {
    id: number;
    user_id: number;
    kehamilan_ke: number;
    hpht: string;
    hpl: string;
    tinggi_badan_awal: string;
    jumlah_janin: number;
    status: 'Aktif' | 'Selesai' | 'Keguguran';
    created_at: string;
    updated_at: string;
    user?: User;
    janin?: DataJanin[];
}
export interface OrangTua {
    id: number;
    name: string;
    email: string;
}

export interface Anak {
    id: number;
    nama: string;
    kelamin: string;
    kelahiran?: Kelahiran;
    tanggal_lahir: string;
    kondisi?: string;
    orangTua?: OrangTua;
    status_hidup?: 'Hidup' | 'Meninggal';
    tanggal_meninggal?: string;
    berat_lahir_gram?: number;
}

export interface Faskes {
    id: number;
    nama: string;
    tipe_faskes: string;
}

export interface Petugas {
    id: number;
    name: string;
    email: string;
    faskes?: Faskes;
}
interface DataJanin {
    id: number;
    pemeriksaan_anc_id: number;
    kehamilan_id: number;
    urutan_janin: number;
    denyut_jantung_janin: number;
    posisi_janin: string;
    pergerakan_janin: string;
    taksiran_berat_janin: number;
    panjang_janin_cm: string;
    indeks_cairan_ketuban?: string;
    usg_bpd_mm?: number;
    usg_hc_mm?: number;
    usg_ac_mm?: number;
    usg_fl_mm?: number;
    created_at: string;
}

export interface PemeriksaanAnak {
    id: number;
    anak_id: number;
    petugas_faskes_id: number;
    jenis_kunjungan: 'Rutin' | 'Sakit';
    tanggal_pemeriksaan: string;
    usia_saat_periksa_bulan: number;
    berat_badan_kg: number;
    tinggi_badan_cm: number;
    lingkar_kepala_cm: number;
    cara_ukur_tinggi?: 'Berbaring' | 'Berdiri';
    suhu_tubuh_celsius: number;
    frekuensi_napas_per_menit?: number;
    frekuensi_jantung_per_menit?: number;
    saturasi_oksigen_persen?: number;
    perkembangan_motorik: string;
    perkembangan_kognitif: string;
    perkembangan_emosional: string;
    catatan_pemeriksaan?: string;
    created_at: string;
    updated_at: string;
    petugas: Petugas;
    anak: Anak;
}
export interface HasilLab {
    id: number;
    pemeriksaan_anc_id: number;
    nama_tes: string;
    hasil: string;
    satuan?: string;
    status: 'Normal' | 'Kurang Normal' | 'Tidak Normal' | 'Perlu Tindak Lanjut';
    created_at: string;
    updated_at: string;
}
interface MediaPemeriksaan {
    id: number;
    pemeriksaan_anc_id: number;
    file_url: string;
    created_at: string;
    updated_at: string;
}
export interface PemeriksaanAnc {
    id: number;
    kehamilan_id: number;
    petugas_faskes_id: number;
    jenis_pemeriksaan: 'Rutin' | 'Sakit';
    tanggal_checkup: string;
    berat_badan: string;
    tekanan_darah_sistolik: number;
    tekanan_darah_diastolik: number;
    lila: string;
    tinggi_fundus: string;
    status_bengkak_kaki: 'Tidak Ada' | 'Ringan' | 'Berat';
    keluhan?: string;
    suhu_tubuh_celsius?: number;
    frekuensi_napas_per_menit?: number;
    frekuensi_jantung_per_menit?: number;
    catatan_petugas?: string;
    deteksi_resiko?: string;
    saran_kunjungan_berikutnya?: string;
    created_at: string;
    updated_at: string;
    petugas: Petugas;
    kehamilan: Kehamilan;
    hasilLab?: HasilLab[];
    dataJanin?: DataJanin[];
    media?: MediaPemeriksaan[];
}

export interface RiwayatSakitAnak {
    id: number;
    anak_id: number;
    pemeriksaan_anak_id: number;
    tanggal_sakit: string;
    diagnosis: string;
    gejala: string;
    tindakan_pengobatan: string;
    catatan: string;
    anak: Anak;
    pemeriksaan?: PemeriksaanAnak;
    created_at: string;
    updated_at: string;
}

export interface RiwayatSakitKehamilan {
    id: number;
    kehamilan_id: number;
    pemeriksaan_anc_id: number;
    tanggal_diagnosis: string;
    diagnosis: string;
    gejala: string;
    tindakan_pengobatan: string;
    status_penyakit: 'Aktif' | 'Sembuh' | 'Terkontrol';
    created_at: string;
    updated_at: string;
    kehamilan: Kehamilan;
    pemeriksaan?: PemeriksaanAnc;
}
