import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { PatientCard } from '@/Components/PatientCard';
import { PatientSearch } from '@/Components/PatientSearch';
import { mockUser, getTodayAppointments } from '@/Components/data/mockData';
import { Appointment, Patient } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Layout } from '@/Layouts/Layout';

export const Dashboard: React.FC = () => {
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load today's appointments
    const appointments = getTodayAppointments();
    setTodayAppointments(appointments);
  }, []);

  const handleStartExamination = (appointmentId: string) => {
    const appointment = todayAppointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      toast({
        title: "Memulai Pemeriksaan",
        description: `Memulai pemeriksaan untuk ${appointment.patient.name}`,
      });

      // Update appointment status
      setTodayAppointments(prev =>
        prev.map(apt =>
          apt.id === appointmentId
            ? { ...apt, status: 'in_progress' as const}
            : apt
        )
      );
    }
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    toast({
      title: "Pasien Dipilih",
      description: `${patient.name} telah dipilih untuk pemeriksaan walk-in`,
    });
  };

  const currentTime = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Layout>
      <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Selamat Datang, {mockUser.name.split(' ')[1]}! 👋
            </h1>
            <p className="text-white/90 text-lg">
              {currentDate}
            </p>
            <p className="text-white/80">
              Siap melayani pasien hari ini • {currentTime}
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/20 rounded-lg p-3 text-center min-w-[80px]">
              <div className="text-2xl font-bold">{todayAppointments.length}</div>
              <div className="text-sm text-white/80">Antrian</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center min-w-[80px]">
              <div className="text-2xl font-bold">
                {todayAppointments.filter(apt => apt.status === 'completed').length}
              </div>
              <div className="text-sm text-white/80">Selesai</div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Search */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Cari Pasien Walk-in
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PatientSearch
            onPatientSelect={handlePatientSelect}
            className="mb-4"
          />
          {selectedPatient && (
            <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{selectedPatient.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPatient.age} tahun • NIK: {selectedPatient.nik}
                  </p>
                </div>
                <Button>
                  Mulai Pemeriksaan
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Today's Appointments */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Antrian Hari Ini
            </div>
            <div className="text-sm font-normal text-muted-foreground">
              {todayAppointments.length} janji temu
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todayAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground text-lg">Tidak ada janji temu hari ini</p>
              <p className="text-sm text-muted-foreground mt-1">
                Anda bisa fokus pada pasien walk-in atau istirahat
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <PatientCard
                  key={appointment.id}
                  appointment={appointment}
                  onStartExamination={handleStartExamination}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-medical">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto text-info mb-2" />
            <div className="text-2xl font-bold text-foreground">2.5</div>
            <div className="text-sm text-muted-foreground">Jam Rata-rata</div>
          </CardContent>
        </Card>

        <Card className="card-medical">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto text-success mb-2" />
            <div className="text-2xl font-bold text-foreground">156</div>
            <div className="text-sm text-muted-foreground">Pasien Bulan Ini</div>
          </CardContent>
        </Card>

        <Card className="card-medical">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-foreground">94%</div>
            <div className="text-sm text-muted-foreground">Kepuasan</div>
          </CardContent>
        </Card>

        <Card className="card-medical">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 mx-auto text-secondary mb-2" />
            <div className="text-2xl font-bold text-foreground">18</div>
            <div className="text-sm text-muted-foreground">Hari Kerja</div>
          </CardContent>
        </Card>
      </div>
    </div>
    </Layout>
  );
};

export default Dashboard;
