import VideoConferenceCard from '@/Components/partials/pasien/konsultasi/VideoCard';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface Doctor {
    id: number;
    name: string;
    specialty: string;
    image: string;
    status: 'online' | 'offline';
}

export default function ConsultPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

    // Dummy doctors data
    const doctors: Doctor[] = [
        {
            id: 1,
            name: 'Dokter Nila Arzani',
            specialty: 'Spesialis Anak (Sp.A)',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
            status: 'online',
        },
        {
            id: 2,
            name: 'Dokter Lusafia',
            specialty: 'Dokter Umum',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
            status: 'offline',
        },
    ];

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleStartCall = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="grid h-[calc(100vh-8rem)] grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Sidebar - Doctor List */}
                    <div className="overflow-y-auto rounded-2xl bg-white p-6 shadow-lg lg:col-span-3">
                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Cari Dokter"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        </div>

                        {/* Section Title */}
                        <h2 className="mb-4 text-lg font-bold text-gray-800">
                            Konsultasi Online
                        </h2>

                        {/* Doctor List */}
                        <div className="space-y-3">
                            {filteredDoctors.map((doctor) => (
                                <div
                                    key={doctor.id}
                                    onClick={() => handleStartCall(doctor)}
                                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
                                >
                                    {/* Doctor Avatar */}
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                        {/* Status Indicator */}
                                        <div
                                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                                                doctor.status === 'online'
                                                    ? 'bg-green-500'
                                                    : 'bg-gray-400'
                                            }`}
                                        ></div>
                                    </div>

                                    {/* Doctor Info */}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate text-sm font-semibold text-gray-800">
                                            {doctor.name}
                                        </h3>
                                        <p className="truncate text-xs text-blue-500">
                                            {doctor.specialty}
                                        </p>
                                    </div>

                                    {/* Status Badge */}
                                    <div>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs ${
                                                doctor.status === 'online'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            {doctor.status === 'online'
                                                ? 'Online'
                                                : 'Offline'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredDoctors.length === 0 && (
                            <div className="py-8 text-center">
                                <p className="text-gray-500">
                                    Dokter tidak ditemukan
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Main Content - Video Conference */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-lg lg:col-span-9">
                        {selectedDoctor ? (
                            <VideoConferenceCard
                                doctorName={selectedDoctor.name}
                                doctorImage={selectedDoctor.image}
                                patientImage="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
                                isCallActive={true}
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
                                <div className="text-center">
                                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
                                        <svg
                                            className="h-12 w-12 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-800">
                                        Pilih Dokter untuk Memulai Konsultasi
                                    </h3>
                                    <p className="text-gray-500">
                                        Klik dokter yang tersedia di sidebar
                                        untuk memulai video call
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
