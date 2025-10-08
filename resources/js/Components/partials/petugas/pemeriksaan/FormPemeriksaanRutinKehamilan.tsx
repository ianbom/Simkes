import {
    Card,
    CardContent,
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
import { Textarea } from '@/Components/ui/textarea';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface LabTest {
    id: string;
    namaTes: string;
    hasilLab: string;
    satuan: string;
    status: string;
}

interface FormPemeriksaanAncProps {
    pregnant: any;
}

export default function FormPemeriksaanRutinKehamilan({ pregnant }: FormPemeriksaanAncProps) {
    console.log('form pregnant', pregnant);

    const { data, setData, post, processing, errors } = useForm({
        kehamilan_id: pregnant?.id || '',
        jenis_pemeriksaan: 'Rutin',
        tanggal_checkup: new Date().toISOString().split('T')[0],
        tekanan_darah_sistolik: '',
        tekanan_darah_diastolik: '',
        berat_badan: '',
        lila: '',
        tinggi_fundus: '',
        status_bengkak_kaki: '',
        suhu_tubuh_celsius: '',
        frekuensi_napas_per_menit: '',
        frekuensi_jantung_per_menit: '',
        keluhan: '',
        catatan_petugas: '',
        deteksi_resiko: '',
        saran_kunjungan_berikutnya: '',
        riwayat_sakit_kehamilan: {
            kehamilan_id: pregnant?.id || '',
            tanggal_diagnosis: '',
            status_penyakit: '',
            gejala: '',
            diagnosis: '',
            tindakan_pengobatan: '',
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('petugas.store.pemeriksaanAnc'), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Data berhasil disimpan');
            },
            onError: (errors) => {
                console.error('Error:', errors);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Card className="border-2">
                <CardHeader>
                    <CardTitle className="text-lg">
                        Pemeriksaan ANC
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Tekanan Darah */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="tekanan_darah_sistolik">
                                Tekanan Darah Sistolik (mmHg) *
                            </Label>
                            <Input
                                id="tekanan_darah_sistolik"
                                name="tekanan_darah_sistolik"
                                type="number"
                                step="0.1"
                                placeholder="Masukkan tekanan darah sistolik"
                                value={data.tekanan_darah_sistolik}
                                onChange={(e) => setData('tekanan_darah_sistolik', e.target.value)}
                                required
                            />
                            {errors.tekanan_darah_sistolik && (
                                <span className="text-red-500 text-sm">{errors.tekanan_darah_sistolik}</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tekanan_darah_diastolik">
                                Tekanan Darah Diastolik (mmHg) *
                            </Label>
                            <Input
                                id="tekanan_darah_diastolik"
                                name="tekanan_darah_diastolik"
                                type="number"
                                step="0.1"
                                placeholder="Masukkan tekanan darah diastolik"
                                value={data.tekanan_darah_diastolik}
                                onChange={(e) => setData('tekanan_darah_diastolik', e.target.value)}
                                required
                            />
                            {errors.tekanan_darah_diastolik && (
                                <span className="text-red-500 text-sm">{errors.tekanan_darah_diastolik}</span>
                            )}
                        </div>
                    </div>

                    {/* Berat Badan & LiLA */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="berat_badan">
                                Berat Badan (kg) *
                            </Label>
                            <Input
                                id="berat_badan"
                                name="berat_badan"
                                type="number"
                                step="0.1"
                                placeholder="Masukkan berat badan"
                                value={data.berat_badan}
                                onChange={(e) => setData('berat_badan', e.target.value)}
                                required
                            />
                            {errors.berat_badan && (
                                <span className="text-red-500 text-sm">{errors.berat_badan}</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lila">
                                LiLA (Lingkar Lengan Atas) *
                            </Label>
                            <Input
                                id="lila"
                                name="lila"
                                type="number"
                                step="0.1"
                                placeholder="Masukkan lingkar lengan atas"
                                value={data.lila}
                                onChange={(e) => setData('lila', e.target.value)}
                                required
                            />
                            {errors.lila && (
                                <span className="text-red-500 text-sm">{errors.lila}</span>
                            )}
                        </div>
                    </div>

                    {/* Tinggi Fundus & Status Kaki */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="tinggi_fundus">
                                Tinggi Fundus (cm)
                            </Label>
                            <Input
                                id="tinggi_fundus"
                                name="tinggi_fundus"
                                type="number"
                                step="0.1"
                                placeholder="Masukkan tinggi fundus"
                                value={data.tinggi_fundus}
                                onChange={(e) => setData('tinggi_fundus', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status_bengkak_kaki">
                                Status Bengkak Kaki *
                            </Label>
                            <select
                                id="status_bengkak_kaki"
                                name="status_bengkak_kaki"
                                className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm outline-none focus-visible:ring-2"
                                value={data.status_bengkak_kaki}
                                onChange={(e) => setData('status_bengkak_kaki', e.target.value)}
                                required
                            >
                                <option value="">Pilih Status Bengkak Kaki</option>
                                <option value="Tidak Ada">Tidak Ada</option>
                                <option value="Ringan">Ringan</option>
                                <option value="Berat">Berat</option>
                            </select>
                            {errors.status_bengkak_kaki && (
                                <span className="text-red-500 text-sm">{errors.status_bengkak_kaki}</span>
                            )}
                        </div>
                    </div>

                    {/* Suhu Tubuh */}
                    <div className="space-y-2">
                        <Label htmlFor="suhu_tubuh_celsius">
                            Suhu Tubuh (°C) *
                        </Label>
                        <Input
                            id="suhu_tubuh_celsius"
                            name="suhu_tubuh_celsius"
                            type="number"
                            step="0.1"
                            placeholder="Masukkan suhu tubuh dalam celcius"
                            value={data.suhu_tubuh_celsius}
                            onChange={(e) => setData('suhu_tubuh_celsius', e.target.value)}
                            required
                        />
                        {errors.suhu_tubuh_celsius && (
                            <span className="text-red-500 text-sm">{errors.suhu_tubuh_celsius}</span>
                        )}
                    </div>

                    {/* Frekuensi Nafas & Jantung */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="frekuensi_napas_per_menit">
                                Frekuensi Nafas (x/menit) *
                            </Label>
                            <Input
                                id="frekuensi_napas_per_menit"
                                name="frekuensi_napas_per_menit"
                                type="number"
                                step="0.1"
                                placeholder="Masukkan frekuensi nafas per menit"
                                value={data.frekuensi_napas_per_menit}
                                onChange={(e) => setData('frekuensi_napas_per_menit', e.target.value)}
                                required
                            />
                            {errors.frekuensi_napas_per_menit && (
                                <span className="text-red-500 text-sm">{errors.frekuensi_napas_per_menit}</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="frekuensi_jantung_per_menit">
                                Frekuensi Jantung (x/menit) *
                            </Label>
                            <Input
                                id="frekuensi_jantung_per_menit"
                                name="frekuensi_jantung_per_menit"
                                type="number"
                                step="0.1"
                                placeholder="Masukkan frekuensi jantung per menit"
                                value={data.frekuensi_jantung_per_menit}
                                onChange={(e) => setData('frekuensi_jantung_per_menit', e.target.value)}
                                required
                            />
                            {errors.frekuensi_jantung_per_menit && (
                                <span className="text-red-500 text-sm">{errors.frekuensi_jantung_per_menit}</span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="keluhan">Keluhan Gejala</Label>
                        <Textarea
                            id="keluhan"
                            name="keluhan"
                            placeholder="Tuliskan keluhan pasien..."
                            rows={2}
                            value={data.keluhan}
                            onChange={(e) => setData('keluhan', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="catatan_petugas">Catatan Petugas (Opsional)</Label>
                        <Textarea
                            id="catatan_petugas"
                            name="catatan_petugas"
                            placeholder="Tuliskan catatan petugas..."
                            rows={2}
                            value={data.catatan_petugas}
                            onChange={(e) => setData('catatan_petugas', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="deteksi_resiko">Deteksi Resiko (Opsional)</Label>
                        <Textarea
                            id="deteksi_resiko"
                            name="deteksi_resiko"
                            placeholder="Tuliskan deteksi resiko..."
                            rows={3}
                            value={data.deteksi_resiko}
                            onChange={(e) => setData('deteksi_resiko', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="saran_kunjungan_berikutnya">
                            Rekomendasi Kunjungan Berikutnya *
                        </Label>
                        <Input
                            id="saran_kunjungan_berikutnya"
                            name="saran_kunjungan_berikutnya"
                            type="date"
                            value={data.saran_kunjungan_berikutnya}
                            onChange={(e) => setData('saran_kunjungan_berikutnya', e.target.value)}
                            required
                        />
                        {errors.saran_kunjungan_berikutnya && (
                            <span className="text-red-500 text-sm">{errors.saran_kunjungan_berikutnya}</span>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Form Riwayat Sakit */}
            <Card className="border-2">
                <CardHeader>
                    <CardTitle className="text-lg">
                        Riwayat Sakit Kehamilan
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="tanggal_diagnosis">
                                Tanggal Diagnosis Sakit (Opsional)
                            </Label>
                            <Input
                                id="tanggal_diagnosis"
                                type="date"
                                value={data.riwayat_sakit_kehamilan.tanggal_diagnosis}
                                onChange={(e) => setData('riwayat_sakit_kehamilan', {
                                    ...data.riwayat_sakit_kehamilan,
                                    tanggal_diagnosis: e.target.value
                                })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status_penyakit">
                                Status Penyakit
                            </Label>
                            <select
                                id="status_penyakit"
                                className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm outline-none focus-visible:ring-2"
                                value={data.riwayat_sakit_kehamilan.status_penyakit}
                                onChange={(e) => setData('riwayat_sakit_kehamilan', {
                                    ...data.riwayat_sakit_kehamilan,
                                    status_penyakit: e.target.value
                                })}
                            >
                                <option value="">Pilih status penyakit</option>
                                <option value="Aktif">Aktif</option>
                                <option value="Terkontrol">Terkontrol</option>
                                <option value="Sembuh">Sembuh</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="gejala">
                            Gejala (Opsional)
                        </Label>
                        <Textarea
                            id="gejala"
                            placeholder="Demam, batuk, pilek, dll..."
                            rows={2}
                            value={data.riwayat_sakit_kehamilan.gejala}
                            onChange={(e) => setData('riwayat_sakit_kehamilan', {
                                ...data.riwayat_sakit_kehamilan,
                                gejala: e.target.value
                            })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="diagnosis">
                            Diagnosis (Opsional)
                        </Label>
                        <Input
                            id="diagnosis"
                            placeholder="Diagnosis sakit"
                            value={data.riwayat_sakit_kehamilan.diagnosis}
                            onChange={(e) => setData('riwayat_sakit_kehamilan', {
                                ...data.riwayat_sakit_kehamilan,
                                diagnosis: e.target.value
                            })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tindakan_pengobatan">
                            Tindakan Pengobatan (Opsional)
                        </Label>
                        <Textarea
                            id="tindakan_pengobatan"
                            placeholder="Obat yang diberikan, tindakan medis..."
                            rows={3}
                            value={data.riwayat_sakit_kehamilan.tindakan_pengobatan}
                            onChange={(e) => setData('riwayat_sakit_kehamilan', {
                                ...data.riwayat_sakit_kehamilan,
                                tindakan_pengobatan: e.target.value
                            })}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                >
                    Batal
                </Button>
                <Button
                    type="submit"
                    disabled={processing}
                >
                    {processing ? 'Menyimpan...' : 'Simpan Data'}
                </Button>
            </div>
        </form>
    );
}
