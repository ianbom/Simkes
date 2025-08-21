// Mock data for development
import {
    Appointment,
    Examination,
    OnlineConsultation,
    Patient,
    User,
} from '@/types';

export const mockUser: User = {
    id: '1',
    name: 'Dr. Sarah Wijaya',
    email: 'sarah.wijaya@sehati.id',
    role: 'doctor',
    profilePhoto: '/api/placeholder/150/150',
    specialization: 'General Practice',
    license_number: 'DOC-2024-001',
    phone: '+62812-3456-7890',
};

export const mockPatients: Patient[] = [
    {
        id: '1',
        name: 'Ibu Siti Nurhaliza',
        nik: '3201234567890123',
        age: 28,
        gender: 'female',
        blood_type: 'O+',
        allergies: ['Penicillin'],
        profile_photo: '/api/placeholder/100/100',
        phone: '+62812-1111-1111',
        address: 'Jl. Merdeka No. 123, Jakarta',
        emergency_contact: '+62812-2222-2222',
    },
    {
        id: '2',
        name: 'Anak Ahmad Fauzi',
        nik: '3201234567890124',
        age: 5,
        gender: 'male',
        blood_type: 'A+',
        allergies: [],
        profile_photo: '/api/placeholder/100/100',
        phone: '+62812-3333-3333',
        address: 'Jl. Sudirman No. 456, Jakarta',
        emergency_contact: '+62812-4444-4444',
    },
    {
        id: '3',
        name: 'Bapak Joko Widodo',
        nik: '3201234567890125',
        age: 45,
        gender: 'male',
        blood_type: 'B+',
        allergies: ['Aspirin'],
        profile_photo: '/api/placeholder/100/100',
        phone: '+62812-5555-5555',
        address: 'Jl. Thamrin No. 789, Jakarta',
        emergency_contact: '+62812-6666-6666',
    },
];

export const mockAppointments: Appointment[] = [
    {
        id: '1',
        patient_id: '1',
        patient: mockPatients[0],
        officer_id: '1',
        appointment_time: '2024-01-19T09:00:00Z',
        type: 'routine',
        status: 'scheduled',
        notes: 'Pemeriksaan rutin kehamilan trimester 2',
        created_at: '2024-01-18T10:00:00Z',
    },
    {
        id: '2',
        patient_id: '2',
        patient: mockPatients[1],
        officer_id: '1',
        appointment_time: '2024-01-19T10:30:00Z',
        type: 'sick',
        status: 'scheduled',
        notes: 'Anak demam dan batuk sejak 2 hari',
        created_at: '2024-01-18T11:00:00Z',
    },
    {
        id: '3',
        patient_id: '3',
        patient: mockPatients[2],
        officer_id: '1',
        appointment_time: '2024-01-19T14:00:00Z',
        type: 'online_consultation',
        status: 'scheduled',
        notes: 'Konsultasi follow-up diabetes',
        created_at: '2024-01-18T12:00:00Z',
    },
];

export const mockExaminations: Examination[] = [
    {
        id: '1',
        patient_id: '1',
        officer_id: '1',
        appointment_id: '1',
        type: 'routine',
        patient_type: 'pregnant',
        examination_date: '2024-01-15T09:00:00Z',
        weight: 65,
        height: 160,
        blood_pressure: '120/80',
        temperature: 36.5,
        gestational_age: 24,
        fundal_height: 24,
        fetal_heart_rate: 140,
        lab_results: 'HB: 11.5 g/dL, Glukosa: 85 mg/dL',
        diagnosis: 'Kehamilan normal trimester 2',
        recommendations: 'Lanjutkan vitamin prenatal, kontrol rutin 4 minggu',
        next_visit: '2024-02-15',
        created_at: '2024-01-15T09:00:00Z',
        updated_at: '2024-01-15T09:30:00Z',
    },
];

export const mockConsultations: OnlineConsultation[] = [
    {
        id: '1',
        patient_id: '3',
        patient: mockPatients[2],
        officer_id: '1',
        scheduled_time: '2024-01-19T14:00:00Z',
        status: 'scheduled',
        created_at: '2024-01-18T12:00:00Z',
    },
];

// Helper functions
export const getTodayAppointments = (): Appointment[] => {
    const today = new Date().toDateString();
    return mockAppointments.filter(
        (apt) => new Date(apt.appointment_time).toDateString() === today,
    );
};

export const getPatientById = (id: string): Patient | undefined => {
    return mockPatients.find((patient) => patient.id === id);
};

export const searchPatients = (query: string): Patient[] => {
    const searchTerm = query.toLowerCase();
    return mockPatients.filter(
        (patient) =>
            patient.name.toLowerCase().includes(searchTerm) ||
            patient.nik.includes(searchTerm),
    );
};
