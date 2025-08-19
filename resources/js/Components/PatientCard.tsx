import React from 'react';
import { Clock, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Appointment } from '@/types';
import { cn } from '@/lib/utils';

interface PatientCardProps {
  appointment: Appointment;
  onStartExamination?: (appointmentId: string) => void;
  className?: string;
}

const getVisitTypeBadgeVariant = (type: string) => {
  switch (type) {
    case 'routine':
      return 'routine';
    case 'sick':
      return 'sick';
    case 'online_consultation':
      return 'consultation';
    default:
      return 'default';
  }
};

const getVisitTypeLabel = (type: string) => {
  switch (type) {
    case 'routine':
      return 'Rutin';
    case 'sick':
      return 'Sakit';
    case 'online_consultation':
      return 'Konsultasi Online';
    default:
      return type;
  }
};

export const PatientCard: React.FC<PatientCardProps> = ({
  appointment,
  onStartExamination,
  className
}) => {
  const appointmentTime = new Date(appointment.appointment_time);
  const timeString = appointmentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleStartExamination = () => {
    if (onStartExamination) {
      onStartExamination(appointment.id);
    }
  };

  return (
    <div className={cn("card-medical p-4 space-y-4", className)}>
      {/* Patient Info Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={appointment.patient.profile_photo} alt={appointment.patient.name} />
            <AvatarFallback className="bg-accent text-accent-foreground font-medium">
              {appointment.patient.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{appointment.patient.name}</h3>
            <p className="text-sm text-muted-foreground">
              {appointment.patient.age} tahun • {appointment.patient.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
            </p>
            {appointment.patient.blood_type && (
              <p className="text-xs text-muted-foreground">
                Gol. Darah: {appointment.patient.blood_type}
              </p>
            )}
          </div>
        </div>
        <Badge variant={getVisitTypeBadgeVariant(appointment.type)}>
          {getVisitTypeLabel(appointment.type)}
        </Badge>
      </div>

      {/* Appointment Details */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{timeString}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{appointmentTime.toLocaleDateString('id-ID')}</span>
        </div>
      </div>

      {/* Notes */}
      {appointment.notes && (
        <div className="bg-muted/30 rounded-lg p-3">
          <p className="text-sm text-foreground">{appointment.notes}</p>
        </div>
      )}

      {/* Allergies Warning */}
      {appointment.patient.allergies && appointment.patient.allergies.length > 0 && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
          <p className="text-sm font-medium text-warning-foreground">
            ⚠️ Alergi: {appointment.patient.allergies.join(', ')}
          </p>
        </div>
      )}

      {/* Action Button */}
      <div className="pt-2">
        <Button 
          onClick={handleStartExamination}
          variant="medical" 
          className="w-full"
          size="lg"
        >
          {appointment.type === 'online_consultation' ? 'Mulai Sesi' : 'Mulai Pemeriksaan'}
        </Button>
      </div>
    </div>
  );
};