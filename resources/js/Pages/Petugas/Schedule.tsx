import React from 'react';
import { Calendar, Clock, Plus, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Schedule: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Jadwal Saya</h1>
          <p className="text-muted-foreground">Kelola jadwal ketersediaan konsultasi online</p>
        </div>
        <Button variant="medical" className="gap-2">
          <Plus className="w-4 h-4" />
          Atur Ketersediaan
        </Button>
      </div>

      {/* Calendar View */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Jadwal Konsultasi Online
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-lg text-muted-foreground mb-2">Kalender akan ditampilkan di sini</p>
            <p className="text-sm text-muted-foreground">
              Implementasi kalender menggunakan library seperti react-big-calendar
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Consultations */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Konsultasi Mendatang
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mock consultation item */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Bapak Joko Widodo</p>
                  <p className="text-sm text-muted-foreground">Konsultasi follow-up diabetes</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Hari ini, 14:00</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="consultation">Terjadwal</Badge>
                <Button variant="outline" size="sm" className="mt-2">
                  Detail
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;