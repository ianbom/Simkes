// Healthcare Officer Interface Types

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'midwife' | 'nurse';
  profilePhoto?: string;
  specialization?: string;
  license_number: string;
  phone: string;
}

export interface Patient {
  id: string;
  name: string;
  nik: string;
  age: number;
  gender: 'male' | 'female';
  blood_type?: string;
  allergies?: string[];
  profile_photo?: string;
  phone: string;
  address: string;
  emergency_contact?: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  patient: Patient;
  officer_id: string;
  appointment_time: string;
  type: 'routine' | 'sick' | 'online_consultation';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
}

export interface Examination {
  id: string;
  patient_id: string;
  officer_id: string;
  appointment_id?: string;
  type: 'routine' | 'sick';
  patient_type: 'pregnant' | 'child' | 'general';
  examination_date: string;
  
  // General vital signs
  weight?: number;
  height?: number;
  blood_pressure?: string;
  temperature?: number;
  heart_rate?: number;
  
  // For pregnant women (ANC)
  gestational_age?: number;
  fundal_height?: number;
  fetal_heart_rate?: number;
  lab_results?: string;
  ultrasound_url?: string;
  
  // For children
  head_circumference?: number;
  developmental_screening?: string;
  vaccination_status?: string;
  
  diagnosis?: string;
  prescription?: string;
  recommendations?: string;
  next_visit?: string;
  
  created_at: string;
  updated_at: string;
}

export interface OnlineConsultation {
  id: string;
  patient_id: string;
  patient: Patient;
  officer_id: string;
  scheduled_time: string;
  actual_start_time?: string;
  actual_end_time?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  consultation_summary?: string;
  officer_recommendations?: string;
  created_at: string;
}

export interface Schedule {
  id: string;
  officer_id: string;
  day_of_week: number; // 0-6 (Sunday-Saturday)
  start_time: string;
  end_time: string;
  is_available: boolean;
  slot_duration: number; // in minutes
  created_at: string;
}

export type VisitType = 'routine' | 'sick' | 'online_consultation';
export type PatientType = 'pregnant' | 'child' | 'general';
export type AppointmentStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';