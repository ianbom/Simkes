import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { useState, FormEvent } from 'react';


interface Props {
    child: {
        id: number;
        nama: string;
    };
    petugasFaskesId: number;
}

export default function FormPemeriksaanRutinAnak({ child, petugasFaskesId }: Props) {
    const { data, setData, post, processing, reset, errors } = useForm({
        anak_id: child.id,
        // petugas_faskes_id: petugasFaskesId,
        jenis_kunjungan: 'Sakit',
        tanggal_pemeriksaan: new Date().toISOString().split('T')[0],
        usia_saat_periksa_bulan: 0,

        // Data Antropometri
        berat_badan_kg: '',
        tinggi_badan_cm: '',
        lingkar_kepala_cm: '',
        cara_ukur_tinggi: '',

        // Tanda Vital
        suhu_tubuh_celsius: '',
        frekuensi_napas_per_menit: '',
        frekuensi_jantung_per_menit: '',
        saturasi_oksigen_persen: '',

        // Catatan Pemeriksaan
        catatan_pemeriksaan: '',

        // Riwayat Sakit (object tunggal)
        riwayat_sakit: {
            tanggal_sakit: '',
            diagnosis: '',
            gejala: '',
            tindakan_pengobatan: '',
            catatan: '',
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('petugas.store.pemeriksaanAnak'), {
            onSuccess: () => {
                alert('✅ Pemeriksaan sakit anak berhasil disimpan!');
                reset();
            },
            onError: (err) => {
                console.error('❌ Gagal menyimpan:', err);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* ================= Pemeriksaan Anak ================= */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="text-lg">Pemeriksaan Anak</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Berat Badan */}
                        <div className="space-y-2">
                            <Label htmlFor="weight">Berat Badan (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                placeholder="Masukkan berat badan"
                                value={data.berat_badan_kg}
                                onChange={(e) => setData('berat_badan_kg', e.target.value)}
                            />
                            {errors.berat_badan_kg && (
                                <p className="text-red-500 text-xs">{errors.berat_badan_kg}</p>
                            )}
                        </div>

                        {/* Suhu Tubuh */}
                        <div className="space-y-2">
                            <Label htmlFor="temperature">Suhu Tubuh (°C)</Label>
                            <Input
                                id="temperature"
                                type="number"
                                step="0.1"
                                placeholder="Masukkan suhu tubuh"
                                value={data.suhu_tubuh_celsius}
                                onChange={(e) => setData('suhu_tubuh_celsius', e.target.value)}
                            />
                        </div>

                        {/* Frekuensi Nafas */}
                        <div className="space-y-2">
                            <Label htmlFor="respiratory">Frekuensi Nafas (x/menit)</Label>
                            <Input
                                id="respiratory"
                                type="number"
                                placeholder="Masukkan frekuensi nafas"
                                value={data.frekuensi_napas_per_menit}
                                onChange={(e) => setData('frekuensi_napas_per_menit', e.target.value)}
                            />
                        </div>

                        {/* Frekuensi Jantung */}
                        <div className="space-y-2">
                            <Label htmlFor="heart-rate">Frekuensi Jantung (x/menit)</Label>
                            <Input
                                id="heart-rate"
                                type="number"
                                placeholder="Masukkan frekuensi jantung"
                                value={data.frekuensi_jantung_per_menit}
                                onChange={(e) => setData('frekuensi_jantung_per_menit', e.target.value)}
                            />
                        </div>

                        {/* Saturasi Oksigen */}
                        <div className="space-y-2">
                            <Label htmlFor="oxygen">Saturasi Oksigen (%)</Label>
                            <Input
                                id="oxygen"
                                type="number"
                                step="0.1"
                                placeholder="Masukkan saturasi oksigen"
                                value={data.saturasi_oksigen_persen}
                                onChange={(e) => setData('saturasi_oksigen_persen', e.target.value)}
                            />
                        </div>

                        {/* Catatan Pemeriksaan */}
                        <div className="space-y-2">
                            <Label htmlFor="notes">Catatan Pemeriksaan</Label>
                            <Textarea
                                id="notes"
                                placeholder="Catatan tambahan..."
                                rows={3}
                                value={data.catatan_pemeriksaan}
                                onChange={(e) => setData('catatan_pemeriksaan', e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* ================= Riwayat Sakit Anak ================= */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="text-lg">Riwayat Sakit Anak</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Gejala */}
                        <div className="space-y-2">
                            <Label htmlFor="gejala">Gejala</Label>
                            <Textarea
                                id="gejala"
                                placeholder="Demam, batuk, pilek, dll..."
                                rows={2}
                                value={data.riwayat_sakit.gejala}
                                onChange={(e) =>
                                    setData('riwayat_sakit', {
                                        ...data.riwayat_sakit,
                                        gejala: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Diagnosis */}
                        <div className="space-y-2">
                            <Label htmlFor="diagnosis">Diagnosis</Label>
                            <Input
                                id="diagnosis"
                                placeholder="Diagnosis sakit"
                                value={data.riwayat_sakit.diagnosis}
                                onChange={(e) =>
                                    setData('riwayat_sakit', {
                                        ...data.riwayat_sakit,
                                        diagnosis: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Tanggal Sakit */}
                        <div className="space-y-2">
                            <Label htmlFor="sick-date">Tanggal Sakit</Label>
                            <Input
                                id="sick-date"
                                type="date"
                                value={data.riwayat_sakit.tanggal_sakit}
                                onChange={(e) =>
                                    setData('riwayat_sakit', {
                                        ...data.riwayat_sakit,
                                        tanggal_sakit: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Tindakan Pengobatan */}
                        <div className="space-y-2">
                            <Label htmlFor="treatment">Tindakan Pengobatan</Label>
                            <Textarea
                                id="treatment"
                                placeholder="Obat yang diberikan, tindakan medis..."
                                rows={3}
                                value={data.riwayat_sakit.tindakan_pengobatan}
                                onChange={(e) =>
                                    setData('riwayat_sakit', {
                                        ...data.riwayat_sakit,
                                        tindakan_pengobatan: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Catatan */}
                        <div className="space-y-2">
                            <Label htmlFor="notes-sick">Catatan (Opsional)</Label>
                            <Textarea
                                id="notes-sick"
                                placeholder="Catatan tambahan..."
                                rows={2}
                                value={data.riwayat_sakit.catatan}
                                onChange={(e) =>
                                    setData('riwayat_sakit', {
                                        ...data.riwayat_sakit,
                                        catatan: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ================= Tombol Aksi ================= */}
            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => reset()}>
                    Reset Form
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Simpan Pemeriksaan'}
                </Button>
            </div>
        </form>
    );
}
