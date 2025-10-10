import { useState, useMemo } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

// TypeScript interfaces
interface Kehamilan {
    id: number;
    user_id: number;
    hpht: string;
    hpl: string;
    tinggi_badan_awal: string;
    user?: {
        name: string;
        tanggal_lahir: string;
    };
    janin?: Janin[];
}

interface Janin {
    id: number;
    pemeriksaan_anc_id: number;
    kehamilan_id: number;
    urutan_janin: number;
    denyut_jantung_janin: number;
    taksiran_berat_janin: number;
    panjang_janin_cm: string;
    posisi_janin: string;
    pergerakan_janin: string;
    created_at: string;
}

interface PemeriksaanAnc {
    id: number;
    kehamilan_id: number;
    tanggal_checkup: string;
    berat_badan: string;
    tinggi_fundus: string;
    frekuensi_jantung_per_menit: number;
    tekanan_darah_sistolik: number;
    tekanan_darah_diastolik: number;
    lila: string;
}

interface Props {
    pregnant: Kehamilan;
    growth: PemeriksaanAnc[];
    activeTrimester: Number;
}

const calculatePregnancyWeek = (hpht: string, checkupDate: string): number => {
    const hphtDate = new Date(hpht);
    const checkDate = new Date(checkupDate);
    const diffTime = checkDate.getTime() - hphtDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 7);
};

const generateFetalReferenceData = () => {
    const weeks = Array.from({ length: 40 }, (_, i) => i + 1);
    return weeks.map((week) => {
        let weight = 0;
        let length = 0;
        let heartRate = 0;

        if (week <= 8) {
            weight = week * 0.15;
        } else if (week <= 20) {
            weight = Math.pow(week - 8, 2.5) * 2;
        } else {
            weight = Math.pow(week - 8, 2.8) * 2.2;
        }

        if (week <= 12) {
            length = week * 0.8;
        } else if (week <= 28) {
            length = 5 + (week - 12) * 1.5;
        } else {
            length = 29 + (week - 28) * 1.0;
        }

        if (week <= 6) {
            heartRate = 80 + week * 15;
        } else if (week <= 9) {
            heartRate = 170 + (week - 6) * 5;
        } else if (week <= 14) {
            heartRate = 185 - (week - 9) * 2;
        } else {
            heartRate = 170 - (week - 14) * 2;
        }

        return {
            week,
            refWeight: parseFloat(weight.toFixed(1)),
            refLength: parseFloat(length.toFixed(1)),
            refHeartRate: Math.round(heartRate),
        };
    });
};


export default function GrafikIbuHamil({pregnant, growth, activeTrimester}: Props) {


        // Data Pemeriksaan ANC (Ibu)
        const ancMeasurements = useMemo(() => {
            return growth.map((item) => {
                const week = calculatePregnancyWeek(pregnant.hpht, item.tanggal_checkup);
                return {
                    week,
                    beratBadan: parseFloat(item.berat_badan),
                    tinggiFundus: parseFloat(item.tinggi_fundus),
                    tekananDarahSistolik: item.tekanan_darah_sistolik,
                    tekananDarahDiastolik: item.tekanan_darah_diastolik,
                    lila: parseFloat(item.lila),
                    frekuensiJantungIbu: item.frekuensi_jantung_per_menit,
                    date: item.tanggal_checkup,
                };
            }).sort((a, b) => a.week - b.week);
        }, [growth, pregnant.hpht]);

        const getFilteredAncData = () => {
            return ancMeasurements.filter((d) => {
                if (activeTrimester === 1) return d.week <= 13;
                if (activeTrimester === 2) return d.week >= 14 && d.week <= 27;
                return d.week >= 28;
            });
        };

        const filteredAncData = getFilteredAncData();

        const AncTooltip = ({ active, payload }: any) => {
            if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg">
                        <p className="mb-2 text-sm font-semibold text-gray-800">
                            Minggu Kehamilan: {data.week}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                            Tanggal: {new Date(data.date).toLocaleDateString('id-ID')}
                        </p>
                        <p className="text-sm text-blue-600">Berat Badan: {data.beratBadan} kg</p>
                        <p className="text-sm text-teal-600">Tinggi Fundus: {data.tinggiFundus} cm</p>
                        <p className="text-sm text-purple-600">LILA: {data.lila} cm</p>
                        <p className="text-sm text-red-600">
                            Tekanan Darah: {data.tekananDarahSistolik}/{data.tekananDarahDiastolik} mmHg
                        </p>
                    </div>
                );
            }
            return null;
        };


        const formatDate = (dateString: string) => {
            return new Date(dateString).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        };


    return (
        <div className="rounded-2xl bg-white p-8 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            📈 Grafik Pemeriksaan ANC (Ibu) - Trimester {activeTrimester}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {activeTrimester === 1 && 'Minggu 1-13'}
                            {activeTrimester === 2 && 'Minggu 14-27'}
                            {activeTrimester === 3 && 'Minggu 28-40'}
                        </p>
                    </div>

                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={filteredAncData}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 20,
                                bottom: 30,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                            <XAxis
                                dataKey="week"
                                label={{
                                    value: 'Minggu Kehamilan',
                                    position: 'insideBottom',
                                    offset: -10,
                                }}
                                tick={{ fontSize: 12 }}
                            />

                            <YAxis
                                yAxisId="left"
                                label={{
                                    value: 'Berat Badan (kg) / Tinggi Fundus (cm)',
                                    angle: -90,
                                    position: 'insideLeft',
                                }}
                                tick={{ fontSize: 12 }}
                            />

                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                label={{
                                    value: 'LILA (cm)',
                                    angle: 90,
                                    position: 'insideRight',
                                }}
                                tick={{ fontSize: 12 }}
                            />

                            <Tooltip content={<AncTooltip />} />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />

                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="beratBadan"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ r: 5, fill: '#3b82f6' }}
                                name="Berat Badan (kg)"
                                isAnimationActive={true}
                            />

                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="tinggiFundus"
                                stroke="#14b8a6"
                                strokeWidth={3}
                                dot={{ r: 5, fill: '#14b8a6' }}
                                name="Tinggi Fundus (cm)"
                                isAnimationActive={true}
                            />

                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="lila"
                                stroke="#a855f7"
                                strokeWidth={3}
                                dot={{ r: 5, fill: '#a855f7' }}
                                name="LILA (cm)"
                                isAnimationActive={true}
                            />
                        </LineChart>
                    </ResponsiveContainer>

                    {/* Tabel Riwayat Pemeriksaan ANC */}
                    {ancMeasurements.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          Riwayat Pemeriksaan ANC
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Minggu
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Tanggal
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Berat Badan
                                </th>
                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  LILA
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Tinggi Fundus
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Tekanan Darah
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                  Detail
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                  {growth.map((pemeriksaan: any, idx: number) => {
                                    const [openRows, setOpenRows] = useState<number[]>([]);

                                    const toggleRow = (index: number) => {
                                      setOpenRows((prev) =>
                                        prev.includes(index)
                                          ? prev.filter((i) => i !== index)
                                          : [...prev, index]
                                      );
                                    };

                                    const isOpen = openRows.includes(idx);

                                    const hasilLab = pemeriksaan.hasil_lab || [];
                                    const riwayatSakit = pemeriksaan.riwayat_sakit_kehamilan || [];
                                    const petugas = pemeriksaan.petugas;
                                    const faskes = petugas?.faskes;
                                    const weekNumber = calculatePregnancyWeek(pregnant.hpht, pemeriksaan.tanggal_checkup);

                                    return (
                                      <>
                                        <tr
                                          className="hover:bg-gray-50 transition cursor-pointer "
                                          onClick={() => toggleRow(idx)}
                                        >
                                        <td className="px-4 py-3 text-sm text-gray-900">
                                           Minggu {weekNumber}
                                          </td>
                                          <td className="px-4 py-3 text-sm text-gray-900">
                                            {new Date(pemeriksaan.tanggal_checkup).toLocaleDateString("id-ID")}
                                          </td>
                                          <td className="px-4 py-3 text-sm text-blue-600">
                                            {pemeriksaan.berat_badan} kg
                                          </td>
                                          <td className="px-4 py-3 text-sm text-green-600">
                                            {pemeriksaan.tinggi_fundus} cm
                                          </td>
                                          <td className="px-4 py-3 text-sm text-purple-600">
                                            {pemeriksaan.lila} cm
                                          </td>
                                          <td className="px-4 py-3 text-sm text-gray-900">
                                            {pemeriksaan.tekanan_darah_sistolik}/
                                            {pemeriksaan.tekanan_darah_diastolik} mmHg
                                          </td>
                                          <td className="px-4 py-3 text-center">
                                            <button
                                              type="button"
                                              className="text-blue-600 text-sm font-medium hover:underline focus:outline-none"
                                            >
                                              {isOpen ? "Tutup" : "Lihat"}
                                            </button>
                                          </td>
                                        </tr>

                                        {isOpen && (
                                          <tr>
                                            <td colSpan={6} className="bg-gray-50 px-6 py-4">
                                              <div className="space-y-6">
                                                {/* 🧍‍♀️ Data Pemeriksaan Ibu */}
                                                <div className="border rounded-lg bg-white shadow-sm p-4">
                                                  <h4 className="font-semibold text-gray-800 mb-2">
                                                    📋 Detail Pemeriksaan
                                                  </h4>
                                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm text-gray-700">
                                                    <p><strong>Jenis Pemeriksaan:</strong> {pemeriksaan.jenis_pemeriksaan}</p>
                                                    <p><strong>Berat Badan:</strong> {pemeriksaan.berat_badan} kg</p>
                                                    <p><strong>Tinggi Fundus:</strong> {pemeriksaan.tinggi_fundus} cm</p>
                                                    <p><strong>LILA:</strong> {pemeriksaan.lila} cm</p>
                                                    <p><strong>Tekanan Darah:</strong> {pemeriksaan.tekanan_darah_sistolik}/{pemeriksaan.tekanan_darah_diastolik} mmHg</p>
                                                    <p><strong>Suhu Tubuh:</strong> {pemeriksaan.suhu_tubuh_celsius} °C</p>
                                                    <p><strong>Frekuensi Napas:</strong> {pemeriksaan.frekuensi_napas_per_menit}x/menit</p>
                                                    <p><strong>Denyut Jantung:</strong> {pemeriksaan.frekuensi_jantung_per_menit} bpm</p>
                                                    <p><strong>Status Bengkak:</strong> {pemeriksaan.status_bengkak_kaki}</p>
                                                    <p><strong>Keluhan:</strong> {pemeriksaan.keluhan || '-'}</p>
                                                    <p><strong>Catatan Petugas:</strong> {pemeriksaan.catatan_petugas}</p>
                                                    <p><strong>Deteksi Risiko:</strong> {pemeriksaan.deteksi_resiko || '-'}</p>
                                                  </div>
                                                </div>

                                                {/* 🧪 Hasil Lab */}
                                                {hasilLab.length > 0 && (
                                                  <div className="border rounded-lg bg-white shadow-sm p-4">
                                                    <h4 className="font-semibold text-gray-800 mb-2">
                                                      🧪 Hasil Laboratorium
                                                    </h4>
                                                    <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                                                      <thead className="bg-gray-100">
                                                        <tr>
                                                          <th className="px-3 py-2 text-left">Nama Tes</th>
                                                          <th className="px-3 py-2 text-left">Hasil</th>
                                                          <th className="px-3 py-2 text-left">Satuan</th>
                                                          <th className="px-3 py-2 text-left">Status</th>
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        {hasilLab.map((lab: any, i: number) => (
                                                          <tr key={i} className="border-t hover:bg-gray-50">
                                                            <td className="px-3 py-2">{lab.nama_tes}</td>
                                                            <td className="px-3 py-2">{lab.hasil}</td>
                                                            <td className="px-3 py-2">{lab.satuan}</td>
                                                            <td
                                                              className={`px-3 py-2 font-medium ${
                                                                lab.status === "Normal"
                                                                  ? "text-green-600"
                                                                  : lab.status === "Perlu Tindak Lanjut"
                                                                  ? "text-orange-600"
                                                                  : "text-red-600"
                                                              }`}
                                                            >
                                                              {lab.status}
                                                            </td>
                                                          </tr>
                                                        ))}
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                )}

                                                {/* 🤒 Riwayat Sakit Kehamilan */}
                                                {riwayatSakit.length > 0 && (
                                                  <div className="border rounded-lg bg-white shadow-sm p-4">
                                                    <h4 className="font-semibold text-gray-800 mb-2">
                                                      🤒 Riwayat Sakit Kehamilan
                                                    </h4>
                                                    <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                                                      <thead className="bg-gray-100">
                                                        <tr>
                                                          <th className="px-3 py-2 text-left">Tanggal Diagnosis</th>
                                                          <th className="px-3 py-2 text-left">Diagnosis</th>
                                                          <th className="px-3 py-2 text-left">Gejala</th>
                                                          <th className="px-3 py-2 text-left">Tindakan</th>
                                                          <th className="px-3 py-2 text-left">Status</th>
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        {riwayatSakit.map((r: any, i: number) => (
                                                          <tr key={i} className="border-t hover:bg-gray-50">
                                                            <td className="px-3 py-2">
                                                              {new Date(r.tanggal_diagnosis).toLocaleDateString("id-ID")}
                                                            </td>
                                                            <td className="px-3 py-2">{r.diagnosis}</td>
                                                            <td className="px-3 py-2">{r.gejala}</td>
                                                            <td className="px-3 py-2">{r.tindakan_pengobatan}</td>
                                                            <td className="px-3 py-2">{r.status_penyakit}</td>
                                                          </tr>
                                                        ))}
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                )}

                                                {/* 🧑‍⚕️ Petugas dan Faskes */}
                                                {petugas && (
                                                  <div className="border rounded-lg bg-white shadow-sm p-4">
                                                    <h4 className="font-semibold text-gray-800 mb-2">
                                                      🏥 Petugas & Fasilitas Kesehatan
                                                    </h4>
                                                    <div className="text-sm text-gray-700 space-y-1">
                                                      <p><strong>Petugas:</strong> {petugas.name} ({petugas.role})</p>
                                                      <p><strong>Email:</strong> {petugas.email}</p>
                                                      <p><strong>Nomor Telepon:</strong> {petugas.no_telp}</p>
                                                      {faskes && (
                                                        <>
                                                          <p><strong>Faskes:</strong> {faskes.nama} ({faskes.tipe_faskes})</p>
                                                          <p><strong>Alamat:</strong> {faskes.alamat}</p>
                                                        </>
                                                      )}
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            </td>
                                          </tr>
                                        )}
                                      </>
                                    );
                                  })}
                                </tbody>

                          </table>
                        </div>
                      </div>
                    )}

                </div>
    )

}
