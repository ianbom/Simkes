import React from 'react';
import { History as HistoryIcon, FileText, Video, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const History: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Riwayat</h1>
        <p className="text-muted-foreground">Lihat riwayat pemeriksaan dan konsultasi yang telah dilakukan</p>
      </div>

      {/* History Tabs */}
      <Tabs defaultValue="checkups" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="checkups" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Riwayat Checkup
          </TabsTrigger>
          <TabsTrigger value="consultations" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Riwayat Konsultasi
          </TabsTrigger>
        </TabsList>

        {/* Checkup History */}
        <TabsContent value="checkups">
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Pemeriksaan Offline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock checkup history item */}
                <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/api/placeholder/100/100" alt="Patient" />
                    <AvatarFallback className="bg-accent text-accent-foreground">SN</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">Ibu Siti Nurhaliza</h3>
                        <p className="text-sm text-muted-foreground">28 tahun • Perempuan</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">15 Jan 2024, 09:00</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="routine">Rutin</Badge>
                        <p className="text-sm text-muted-foreground mt-1">ANC Trimester 2</p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-card rounded-lg border">
                      <p className="text-sm text-foreground">
                        <strong>Diagnosis:</strong> Kehamilan normal trimester 2
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        BB: 65kg, TD: 120/80, TFU: 24cm, DJJ: 140x/menit
                      </p>
                    </div>
                  </div>
                </div>

                {/* More mock items can be added here */}
                <div className="text-center py-8">
                  <HistoryIcon className="w-12 h-12 mx-auto text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground">Riwayat pemeriksaan lainnya akan muncul di sini</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Consultation History */}
        <TabsContent value="consultations">
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                Konsultasi Online
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock consultation history item */}
                <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/api/placeholder/100/100" alt="Patient" />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">JW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">Bapak Joko Widodo</h3>
                        <p className="text-sm text-muted-foreground">45 tahun • Laki-laki</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">12 Jan 2024, 14:00</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="consultation">Konsultasi</Badge>
                        <p className="text-sm text-muted-foreground mt-1">30 menit</p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-card rounded-lg border">
                      <p className="text-sm text-foreground">
                        <strong>Ringkasan:</strong> Follow-up kontrol diabetes melitus tipe 2
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong>Rekomendasi:</strong> Lanjutkan obat, kontrol gula darah rutin
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center py-8">
                  <Video className="w-12 h-12 mx-auto text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground">Riwayat konsultasi lainnya akan muncul di sini</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;