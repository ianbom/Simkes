import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Stethoscope, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('sarah.wijaya@sehati.id');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang kembali di Sehati!",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Gagal",
          description: "Email atau password tidak valid",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[var(--shadow-primary)]">
            <Stethoscope className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Sehati</h1>
          <p className="text-white/80 text-lg">Healthcare Officer Portal</p>
        </div>

        {/* Login Card */}
        <Card className="card-medical">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-foreground">
              Masuk ke Akun Anda
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Masukkan kredensial untuk mengakses sistem
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@sehati.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 py-6 text-base border-2 focus:border-primary"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 py-6 text-base border-2 focus:border-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
                >
                  Lupa Password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                variant="medical"
                size="xl"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Memproses...
                  </div>
                ) : (
                  'Masuk'
                )}
              </Button>
            </form>

            {/* Demo Notice */}
            <div className="mt-6 p-4 bg-info/10 border border-info/20 rounded-lg">
              <p className="text-sm text-info-foreground text-center">
                <strong>Demo Mode:</strong> Gunakan kredensial yang sudah terisi untuk login
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-white/60 text-sm">
          <p>© 2024 Sehati Healthcare System</p>
          <p>Developed for Healthcare Officers</p>
        </div>
      </div>
    </div>
  );
};

export default Login;