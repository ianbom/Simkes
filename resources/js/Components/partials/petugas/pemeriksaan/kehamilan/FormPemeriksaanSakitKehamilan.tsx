import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface FormPemeriksaanAncProps {
    pregnant: any;
}

export default function FormPemeriksaanSakitKehamilan({
    pregnant,
}: FormPemeriksaanAncProps) {
    const { data, setData, post, processing, errors } = useForm({
        kehamilan_id: pregnant?.id || '',
        petugas_faskes_id: '',
        jenis_pemeriksaan: 'Sakit',
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
            pemeriksaan_anc_id: '',
            tanggal_diagnosis: '',
            status_penyakit: '',
            gejala: '',
            diagnosis: '',
            tindakan_pengobatan: '',
        },
        data_janin: [
            {
                kehamilan_id: pregnant?.id || '',
                urutan_janin: 1,
                posisi_deskriptif: '',
                denyut_jantung_janin: '',
                posisi_janin: '',
                pergerakan_janin: '',
                taksiran_berat_janin: '',
                panjang_janin_cm: '',
            },
        ],
        media_pemeriksaan: [],
        hasil_lab: [],
    });

    const addDataJanin = () => {
        setData('data_janin', [
            ...data.data_janin,
            {
                urutan_janin: data.data_janin.length + 1,
                posisi_deskriptif: '',
                denyut_jantung_janin: '',
                posisi_janin: '',
                pergerakan_janin: '',
                taksiran_berat_janin: '',
                panjang_janin_cm: '',
            },
        ]);
    };

    const removeDataJanin = (index: number) => {
        const newDataJanin = data.data_janin.filter((_, i) => i !== index);
        setData('data_janin', newDataJanin);
    };

    const updateDataJanin = (index: number, field: string, value: any) => {
        const newDataJanin = [...data.data_janin];
        newDataJanin[index] = { ...newDataJanin[index], [field]: value };
        setData('data_janin', newDataJanin);
    };

    const addHasilLab = () => {
        setData('hasil_lab', [
            ...data.hasil_lab,
            {
                nama_tes: '',
                hasil: '',
                satuan: '',
                status: '',
            },
        ]);
    };

    const removeHasilLab = (index: number) => {
        const newHasilLab = data.hasil_lab.filter((_, i) => i !== index);
        setData('hasil_lab', newHasilLab);
    };

    const updateHasilLab = (index: number, field: string, value: any) => {
        const newHasilLab = [...data.hasil_lab];
        newHasilLab[index] = { ...newHasilLab[index], [field]: value };
        setData('hasil_lab', newHasilLab);
    };

    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setUploadedFiles((prev) => [...prev, ...files]);

            const formattedFiles = files.map((file) => ({ file_url: file }));
            setData('media_pemeriksaan', [
                ...data.media_pemeriksaan,
                ...formattedFiles,
            ]);
        }
    };

    const removeFile = (index: number) => {
        const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
        const updatedData = data.media_pemeriksaan.filter(
            (_, i) => i !== index,
        );
        setUploadedFiles(updatedFiles);
        setData('media_pemeriksaan', updatedData);
    };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('petugas.store.pemeriksaanAnc'), {
        preserveScroll: true,
        onSuccess: () => {
            alert('✅ Data pemeriksaan berhasil disimpan!');
            reset(); 
        },
        onError: (errors) => {
            console.error('❌ Terjadi kesalahan:', errors);
            alert('❌ Gagal menyimpan data. Periksa kembali input Anda.');
        },
    });
};


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Card className="border-2">
                <CardHeader>
                    <CardTitle className="text-lg">Pemeriksaan ANC</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Tekanan Darah */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="tekanan_darah_sistolik">
                                Tekanan Darah Sistolik (mmHg)
                            </Label>
                            <Input
                                id="tekanan_darah_sistolik"
                                type="number"
                                placeholder="Masukkan tekanan darah sistolik"
                                value={data.tekanan_darah_sistolik}
                                onChange={(e) =>
                                    setData(
                                        'tekanan_darah_sistolik',
                                        e.target.value,
                                    )
                                }
                            />
                            {errors.tekanan_darah_sistolik && (
                                <span className="text-sm text-red-500">
                                    {errors.tekanan_darah_sistolik}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tekanan_darah_diastolik">
                                Tekanan Darah Diastolik (mmHg)
                            </Label>
                            <Input
                                id="tekanan_darah_diastolik"
                                type="number"
                                placeholder="Masukkan tekanan darah diastolik"
                                value={data.tekanan_darah_diastolik}
                                onChange={(e) =>
                                    setData(
                                        'tekanan_darah_diastolik',
                                        e.target.value,
                                    )
                                }
                            />
                            {errors.tekanan_darah_diastolik && (
                                <span className="text-sm text-red-500">
                                    {errors.tekanan_darah_diastolik}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Berat Badan & LiLA */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="berat_badan">
                                Berat Badan (kg)
                            </Label>
                            <Input
                                id="berat_badan"
                                type="number"
                                step="0.01"
                                placeholder="Masukkan berat badan"
                                value={data.berat_badan}
                                onChange={(e) =>
                                    setData('berat_badan', e.target.value)
                                }
                            />
                            {errors.berat_badan && (
                                <span className="text-sm text-red-500">
                                    {errors.berat_badan}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lila">
                                LiLA (Lingkar Lengan Atas) cm
                            </Label>
                            <Input
                                id="lila"
                                type="number"
                                step="0.1"
                                placeholder="Masukkan lingkar lengan atas"
                                value={data.lila}
                                onChange={(e) =>
                                    setData('lila', e.target.value)
                                }
                            />
                            {errors.lila && (
                                <span className="text-sm text-red-500">
                                    {errors.lila}
                                </span>
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
                                type="number"
                                step="0.1"
                                placeholder="Masukkan tinggi fundus"
                                value={data.tinggi_fundus}
                                onChange={(e) =>
                                    setData('tinggi_fundus', e.target.value)
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status_bengkak_kaki">
                                Status Bengkak Kaki
                            </Label>
                            <select
                                id="status_bengkak_kaki"
                                className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm outline-none focus-visible:ring-2"
                                value={data.status_bengkak_kaki}
                                onChange={(e) =>
                                    setData(
                                        'status_bengkak_kaki',
                                        e.target.value,
                                    )
                                }
                            >
                                <option value="">
                                    Pilih Status Bengkak Kaki
                                </option>
                                <option value="Tidak Ada">Tidak Ada</option>
                                <option value="Ringan">Ringan</option>
                                <option value="Berat">Berat</option>
                            </select>
                            {errors.status_bengkak_kaki && (
                                <span className="text-sm text-red-500">
                                    {errors.status_bengkak_kaki}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Suhu Tubuh */}
                    <div className="space-y-2">
                        <Label htmlFor="suhu_tubuh_celsius">
                            Suhu Tubuh (°C)
                        </Label>
                        <Input
                            id="suhu_tubuh_celsius"
                            type="number"
                            step="0.1"
                            placeholder="Masukkan suhu tubuh dalam celcius"
                            value={data.suhu_tubuh_celsius}
                            onChange={(e) =>
                                setData('suhu_tubuh_celsius', e.target.value)
                            }
                        />
                        {errors.suhu_tubuh_celsius && (
                            <span className="text-sm text-red-500">
                                {errors.suhu_tubuh_celsius}
                            </span>
                        )}
                    </div>

                    {/* Frekuensi Nafas & Jantung */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="frekuensi_napas_per_menit">
                                Frekuensi Nafas (x/menit)
                            </Label>
                            <Input
                                id="frekuensi_napas_per_menit"
                                type="number"
                                placeholder="Masukkan frekuensi nafas per menit"
                                value={data.frekuensi_napas_per_menit}
                                onChange={(e) =>
                                    setData(
                                        'frekuensi_napas_per_menit',
                                        e.target.value,
                                    )
                                }
                            />
                            {errors.frekuensi_napas_per_menit && (
                                <span className="text-sm text-red-500">
                                    {errors.frekuensi_napas_per_menit}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="frekuensi_jantung_per_menit">
                                Frekuensi Jantung (x/menit)
                            </Label>
                            <Input
                                id="frekuensi_jantung_per_menit"
                                type="number"
                                placeholder="Masukkan frekuensi jantung per menit"
                                value={data.frekuensi_jantung_per_menit}
                                onChange={(e) =>
                                    setData(
                                        'frekuensi_jantung_per_menit',
                                        e.target.value,
                                    )
                                }
                            />
                            {errors.frekuensi_jantung_per_menit && (
                                <span className="text-sm text-red-500">
                                    {errors.frekuensi_jantung_per_menit}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="keluhan">Keluhan Gejala</Label>
                        <Textarea
                            id="keluhan"
                            placeholder="Tuliskan keluhan pasien..."
                            rows={2}
                            value={data.keluhan}
                            onChange={(e) => setData('keluhan', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="catatan_petugas">Catatan Petugas</Label>
                        <Textarea
                            id="catatan_petugas"
                            placeholder="Tuliskan catatan petugas..."
                            rows={2}
                            value={data.catatan_petugas}
                            onChange={(e) =>
                                setData('catatan_petugas', e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="deteksi_resiko">Deteksi Resiko</Label>
                        <Textarea
                            id="deteksi_resiko"
                            placeholder="Tuliskan deteksi resiko..."
                            rows={3}
                            value={data.deteksi_resiko}
                            onChange={(e) =>
                                setData('deteksi_resiko', e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="saran_kunjungan_berikutnya">
                            Rekomendasi Kunjungan Berikutnya
                        </Label>
                        <Input
                            id="saran_kunjungan_berikutnya"
                            type="date"
                            value={data.saran_kunjungan_berikutnya}
                            onChange={(e) =>
                                setData(
                                    'saran_kunjungan_berikutnya',
                                    e.target.value,
                                )
                            }
                        />
                        {errors.saran_kunjungan_berikutnya && (
                            <span className="text-sm text-red-500">
                                {errors.saran_kunjungan_berikutnya}
                            </span>
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
                                Tanggal Diagnosis Sakit
                            </Label>
                            <Input
                                id="tanggal_diagnosis"
                                type="date"
                                value={
                                    data.riwayat_sakit_kehamilan
                                        .tanggal_diagnosis
                                }
                                onChange={(e) =>
                                    setData('riwayat_sakit_kehamilan', {
                                        ...data.riwayat_sakit_kehamilan,
                                        tanggal_diagnosis: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status_penyakit">
                                Status Penyakit
                            </Label>
                            <select
                                id="status_penyakit"
                                className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm outline-none focus-visible:ring-2"
                                value={
                                    data.riwayat_sakit_kehamilan.status_penyakit
                                }
                                onChange={(e) =>
                                    setData('riwayat_sakit_kehamilan', {
                                        ...data.riwayat_sakit_kehamilan,
                                        status_penyakit: e.target.value,
                                    })
                                }
                            >
                                <option value="">Pilih status penyakit</option>
                                <option value="Aktif">Aktif</option>
                                <option value="Terkontrol">Terkontrol</option>
                                <option value="Sembuh">Sembuh</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="gejala">Gejala</Label>
                        <Textarea
                            id="gejala"
                            placeholder="Demam, batuk, pilek, dll..."
                            rows={2}
                            value={data.riwayat_sakit_kehamilan.gejala}
                            onChange={(e) =>
                                setData('riwayat_sakit_kehamilan', {
                                    ...data.riwayat_sakit_kehamilan,
                                    gejala: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="diagnosis">Diagnosis</Label>
                        <Input
                            id="diagnosis"
                            placeholder="Diagnosis sakit"
                            value={data.riwayat_sakit_kehamilan.diagnosis}
                            onChange={(e) =>
                                setData('riwayat_sakit_kehamilan', {
                                    ...data.riwayat_sakit_kehamilan,
                                    diagnosis: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tindakan_pengobatan">
                            Tindakan Pengobatan
                        </Label>
                        <Textarea
                            id="tindakan_pengobatan"
                            placeholder="Obat yang diberikan, tindakan medis..."
                            rows={3}
                            value={
                                data.riwayat_sakit_kehamilan.tindakan_pengobatan
                            }
                            onChange={(e) =>
                                setData('riwayat_sakit_kehamilan', {
                                    ...data.riwayat_sakit_kehamilan,
                                    tindakan_pengobatan: e.target.value,
                                })
                            }
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Data Janin */}
            <Card className="border-2">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Data Janin</CardTitle>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addDataJanin}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Janin
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {data.data_janin.map((janin, index) => (
                        <div
                            key={index}
                            className="relative space-y-4 rounded-lg border p-4"
                        >
                            {data.data_janin.length > 1 && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute right-2 top-2"
                                    onClick={() => removeDataJanin(index)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}

                            <h4 className="font-medium">Janin {index + 1}</h4>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Posisi Janin</Label>
                                    <select
                                        className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm outline-none focus-visible:ring-2"
                                        value={janin.posisi_janin}
                                        onChange={(e) =>
                                            updateDataJanin(
                                                index,
                                                'posisi_janin',
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="">
                                            Pilih posisi janin
                                        </option>
                                        <option value="Kepala">Kepala</option>
                                        <option value="Sungsang">
                                            Sungsang
                                        </option>
                                        <option value="Lintang">Lintang</option>
                                        <option value="Belum Terdefinisi">
                                            Belum Terdefinisi
                                        </option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Posisi Deskriptif</Label>
                                    <Input
                                        placeholder="Deskripsi posisi janin"
                                        value={janin.posisi_deskriptif}
                                        onChange={(e) =>
                                            updateDataJanin(
                                                index,
                                                'posisi_deskriptif',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Denyut Jantung Janin (bpm)</Label>
                                    <Input
                                        type="number"
                                        placeholder="Masukkan denyut jantung"
                                        value={janin.denyut_jantung_janin}
                                        onChange={(e) =>
                                            updateDataJanin(
                                                index,
                                                'denyut_jantung_janin',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Pergerakan Janin</Label>
                                    <select
                                        className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm outline-none focus-visible:ring-2"
                                        value={janin.pergerakan_janin}
                                        onChange={(e) =>
                                            updateDataJanin(
                                                index,
                                                'pergerakan_janin',
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="">
                                            Pilih pergerakan janin
                                        </option>
                                        <option value="Aktif">Aktif</option>
                                        <option value="Berkurang">
                                            Berkurang
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Taksiran Berat Janin (gram)</Label>
                                    <Input
                                        type="number"
                                        placeholder="Masukkan taksiran berat"
                                        value={janin.taksiran_berat_janin}
                                        onChange={(e) =>
                                            updateDataJanin(
                                                index,
                                                'taksiran_berat_janin',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Panjang Janin (cm)</Label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        placeholder="Masukkan panjang janin"
                                        value={janin.panjang_janin_cm}
                                        onChange={(e) =>
                                            updateDataJanin(
                                                index,
                                                'panjang_janin_cm',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Hasil Lab */}
            <Card className="border-2">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                            Hasil Laboratorium
                        </CardTitle>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addHasilLab}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Hasil Lab
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {data.hasil_lab.length === 0 ? (
                        <p className="py-4 text-center text-sm text-gray-500">
                            Belum ada hasil lab. Klik tombol "Tambah Hasil Lab"
                            untuk menambahkan.
                        </p>
                    ) : (
                        data.hasil_lab.map((lab, index) => (
                            <div
                                key={index}
                                className="relative space-y-4 rounded-lg border p-4"
                            >
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute right-2 top-2"
                                    onClick={() => removeHasilLab(index)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Nama Tes</Label>
                                        <Input
                                            placeholder="Contoh: Hemoglobin"
                                            value={lab.nama_tes}
                                            onChange={(e) =>
                                                updateHasilLab(
                                                    index,
                                                    'nama_tes',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Hasil</Label>
                                        <Input
                                            placeholder="Contoh: 12.5"
                                            value={lab.hasil}
                                            onChange={(e) =>
                                                updateHasilLab(
                                                    index,
                                                    'hasil',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Satuan</Label>
                                        <Input
                                            placeholder="Contoh: g/dL"
                                            value={lab.satuan}
                                            onChange={(e) =>
                                                updateHasilLab(
                                                    index,
                                                    'satuan',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Status</Label>
                                        <select
                                            className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm outline-none focus-visible:ring-2"
                                            value={lab.status}
                                            onChange={(e) =>
                                                updateHasilLab(
                                                    index,
                                                    'status',
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="">
                                                Pilih Status
                                            </option>
                                            <option value="Normal">
                                                Normal
                                            </option>
                                            <option value="Kurang Normal">
                                                Kurang Normal
                                            </option>
                                            <option value="Tidak Normal">
                                                Tidak Normal
                                            </option>
                                            <option value="Perlu Tindak Lanjut">
                                                Perlu Tindak Lanjut
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            {/* Media Pemeriksaan */}

            <Card className="border-2">
                <CardHeader>
                    <CardTitle className="text-lg">Media Pemeriksaan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="file_upload">
                            Upload File (bisa banyak):
                        </Label>
                        <Input
                            id="file_upload"
                            type="file"
                            multiple
                            accept="image/*,application/pdf,video/*"
                            onChange={handleFileChange}
                        />
                        <p className="text-sm text-gray-500">
                            Format: Gambar, PDF, atau Video
                        </p>
                    </div>

                    {uploadedFiles.length > 0 && (
                        <div className="mt-3 space-y-2">
                            <Label>File yang akan diupload:</Label>
                            <ul className="space-y-1">
                                {uploadedFiles.map((file, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between rounded border px-3 py-1"
                                    >
                                        <span className="w-64 truncate text-sm">
                                            📄 {file.name}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeFile(index)}
                                        >
                                            Hapus
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
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
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Simpan Data'}
                </Button>
            </div>
        </form>
    );
}
