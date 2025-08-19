import React from 'react';
import { User, Mail, Phone, Shield, Award, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockUser } from '@/data/mockData';

export const Profile: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profil</h1>
        <p className="text-muted-foreground">Informasi akun dan pengaturan</p>
      </div>

      {/* Profile Card */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Informasi Profil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={mockUser.profilePhoto} alt={mockUser.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                Ubah Foto
              </Button>
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nama Lengkap</label>
                  <p className="text-lg font-semibold text-foreground">{mockUser.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Spesialisasi</label>
                  <p className="text-lg text-foreground">{mockUser.specialization}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p className="text-lg text-foreground">{mockUser.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telepon</label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p className="text-lg text-foreground">{mockUser.phone}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">No. Lisensi</label>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <p className="text-lg text-foreground">{mockUser.license_number}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <Badge variant="info" className="mt-1">
                    {mockUser.role === 'doctor' ? 'Dokter' : mockUser.role === 'midwife' ? 'Bidan' : 'Perawat'}
                  </Badge>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="medical" className="mr-3">
                  Edit Profil
                </Button>
                <Button variant="outline">
                  Ganti Password
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-medical">
          <CardContent className="p-6 text-center">
            <Award className="w-12 h-12 mx-auto text-success mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1">156</div>
            <div className="text-sm text-muted-foreground">Pasien Dilayani</div>
            <div className="text-xs text-muted-foreground">Bulan ini</div>
          </CardContent>
        </Card>

        <Card className="card-medical">
          <CardContent className="p-6 text-center">
            <Shield className="w-12 h-12 mx-auto text-info mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1">94%</div>
            <div className="text-sm text-muted-foreground">Rating Kepuasan</div>
            <div className="text-xs text-muted-foreground">Rata-rata</div>
          </CardContent>
        </Card>

        <Card className="card-medical">
          <CardContent className="p-6 text-center">
            <MapPin className="w-12 h-12 mx-auto text-primary mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1">2.1</div>
            <div className="text-sm text-muted-foreground">Tahun Pengalaman</div>
            <div className="text-xs text-muted-foreground">Di Sehati</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Aktivitas Terkini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <p className="text-sm text-foreground">Menyelesaikan pemeriksaan Ibu Siti Nurhaliza</p>
              <span className="text-xs text-muted-foreground ml-auto">2 jam lalu</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-info rounded-full"></div>
              <p className="text-sm text-foreground">Konsultasi online dengan Bapak Joko Widodo</p>
              <span className="text-xs text-muted-foreground ml-auto">5 jam lalu</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <p className="text-sm text-foreground">Update jadwal ketersediaan</p>
              <span className="text-xs text-muted-foreground ml-auto">1 hari lalu</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;