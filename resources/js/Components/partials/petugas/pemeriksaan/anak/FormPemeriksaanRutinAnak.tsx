import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { ChangeEvent, FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    child: {
        id: number;
        nama: string;
    };
    // petugasFaskesId: number;
}

export default function FormPemeriksaanRutinAnak({ child }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        anak_id: child.id,
        // petugas_faskes_id: petugasFaskesId,
        jenis_kunjungan: 'Rutin',
        tanggal_pemeriksaan: new Date().toISOString().split('T')[0],
        usia_saat_periksa_bulan: 0,

        // Antropometri
        berat_badan_kg: '',
        tinggi_badan_cm: '',
        lingkar_kepala_cm: '',
        cara_ukur_tinggi: '',

        // Tanda Vital
        suhu_tubuh_celsius: '',
        frekuensi_napas_per_menit: '',
        frekuensi_jantung_per_menit: '',
        saturasi_oksigen_persen: '',

        // Perkembangan
        perkembangan_motorik: '',
        perkembangan_kognitif: '',
        perkembangan_emosional: '',
        catatan_pemeriksaan: '',

        // Riwayat Sakit (object tunggal)
        riwayat_sakit: {
            tanggal_sakit: '',
            diagnosis: '',
            gejala: '',
            tindakan_pengobatan: '',
            catatan: '',
        },

        media_pemeriksaan_anak: [] as File[],
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData('media_pemeriksaan_anak', Array.from(e.target.files));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post(route('petugas.store.pemeriksaanAnak'), {
            onSuccess: () => {
                alert('✅ Pemeriksaan anak berhasil disimpan!');
                reset();
            },
            onError: (err) => {
                console.error('Error saat menyimpan:', err);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* ======== Pemeriksaan Anak ======== */}
            <Card className="border-2">
                <CardHeader>
                    <CardTitle className="text-lg">
                        Pemeriksaan Anak - {child.nama}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Row 1: Berat & Tinggi */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="weight">Berat Badan (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                step="0.1"
                                value={data.berat_badan_kg}
                                onChange={(e) =>
                                    setData('berat_badan_kg', e.target.value)
                                }
                            />
                            {errors.berat_badan_kg && (
                                <p className="text-xs text-red-500">
                                    {errors.berat_badan_kg}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="height">Tinggi Badan (cm)</Label>
                            <Input
                                id="height"
                                type="number"
                                step="0.1"
                                value={data.tinggi_badan_cm}
                                onChange={(e) =>
                                    setData('tinggi_badan_cm', e.target.value)
                                }
                            />
                            {errors.tinggi_badan_cm && (
                                <p className="text-xs text-red-500">
                                    {errors.tinggi_badan_cm}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Row 2: Lingkar Kepala & Cara Ukur */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="head">Lingkar Kepala (cm)</Label>
                            <Input
                                id="head"
                                type="number"
                                step="0.1"
                                value={data.lingkar_kepala_cm}
                                onChange={(e) =>
                                    setData('lingkar_kepala_cm', e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="measure">Cara Pengukuran</Label>
                            <select
                                id="measure"
                                className="flex w-full px-3 py-1 text-base bg-transparent border rounded-md shadow-sm outline-none border-input h-9 focus-visible:ring-2"
                                value={data.cara_ukur_tinggi}
                                onChange={(e) =>
                                    setData('cara_ukur_tinggi', e.target.value)
                                }
                            >
                                <option value="">Pilih</option>
                                <option value="Berbaring">Berbaring</option>
                                <option value="Berdiri">Berdiri</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 3: Vital Signs */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="temp">Suhu Tubuh (°C)</Label>
                            <Input
                                id="temp"
                                type="number"
                                step="0.1"
                                value={data.suhu_tubuh_celsius}
                                onChange={(e) =>
                                    setData('suhu_tubuh_celsius', e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="breath">Frekuensi Nafas</Label>
                            <Input
                                id="breath"
                                type="number"
                                value={data.frekuensi_napas_per_menit}
                                onChange={(e) =>
                                    setData(
                                        'frekuensi_napas_per_menit',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>

                    {/* Row 4 */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="heart">Frekuensi Jantung</Label>
                            <Input
                                id="heart"
                                type="number"
                                value={data.frekuensi_jantung_per_menit}
                                onChange={(e) =>
                                    setData(
                                        'frekuensi_jantung_per_menit',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="ox">Saturasi Oksigen (%)</Label>
                            <Input
                                id="ox"
                                type="number"
                                value={data.saturasi_oksigen_persen}
                                onChange={(e) =>
                                    setData(
                                        'saturasi_oksigen_persen',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>

                    {/* Perkembangan */}
                    <div className="space-y-2">
                        <Label>Perkembangan Motorik</Label>
                        <Textarea
                            rows={2}
                            value={data.perkembangan_motorik}
                            onChange={(e) =>
                                setData('perkembangan_motorik', e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Perkembangan Kognitif</Label>
                        <Textarea
                            rows={2}
                            value={data.perkembangan_kognitif}
                            onChange={(e) =>
                                setData('perkembangan_kognitif', e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Perkembangan Emosional</Label>
                        <Textarea
                            rows={2}
                            value={data.perkembangan_emosional}
                            onChange={(e) =>
                                setData('perkembangan_emosional', e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Catatan Pemeriksaan</Label>
                        <Textarea
                            rows={3}
                            value={data.catatan_pemeriksaan}
                            onChange={(e) =>
                                setData('catatan_pemeriksaan', e.target.value)
                            }
                        />
                    </div>
                </CardContent>
            </Card>

            {/* ======== Riwayat Sakit Anak ======== */}
            <Card className="border-2">
                <CardHeader>
                    <CardTitle className="text-lg">Riwayat Sakit Anak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Tanggal Sakit</Label>
                        <Input
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

                    <div>
                        <Label>Diagnosis</Label>
                        <Input
                            placeholder="Masukkan diagnosis"
                            value={data.riwayat_sakit.diagnosis}
                            onChange={(e) =>
                                setData('riwayat_sakit', {
                                    ...data.riwayat_sakit,
                                    diagnosis: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <Label>Gejala</Label>
                        <Textarea
                            placeholder="Contoh: demam, batuk..."
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

                    <div>
                        <Label>Tindakan Pengobatan</Label>
                        <Textarea
                            placeholder="Obat atau tindakan medis yang diberikan..."
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

                    <div>
                        <Label>Catatan</Label>
                        <Textarea
                            placeholder="Tambahkan catatan tambahan..."
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

            <Card>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="media">Upload Media Pemeriksaan</Label>
                        <Input
                            id="media"
                            type="file"
                            multiple
                            accept=".jpg,.jpeg,.png,.mp4,.pdf,.doc,.docx"
                            onChange={handleFileChange}
                        />
                        {errors['media_pemeriksaan_anak'] && (
                            <p className="text-xs text-red-500">
                                {errors['media_pemeriksaan_anak']}
                            </p>
                        )}
                        {errors['media_pemeriksaan_anak.*'] && (
                            <p className="text-xs text-red-500">
                                {errors['media_pemeriksaan_anak.*']}
                            </p>
                        )}
                        {data.media_pemeriksaan_anak.length > 0 && (
                            <p className="text-sm text-gray-500">
                                {data.media_pemeriksaan_anak.length} file dipilih
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>



            {/* Submit Button */}
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
