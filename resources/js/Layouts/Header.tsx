import React from 'react';
import { Bell, LogOut, Menu, Stethoscope } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { mockUser } from '@/Components/data/mockData';
import { useIsMobile } from '@/hooks/use-mobile';

export const Header: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Mobile: Logo + Menu, Desktop: User Info */}
        <div className="flex items-center gap-4">
          {isMobile && (
            <>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Sehati</h1>
                </div>
              </div>
            </>
          )}

          {!isMobile && (
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={mockUser.profilePhoto} alt={mockUser.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-foreground">{mockUser.name}</h2>
                <p className="text-sm text-muted-foreground capitalize">{mockUser.specialization}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right side: Notifications + Profile/Logout */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
            >
              3
            </Badge>
          </Button>

          {/* Mobile: User Avatar, Desktop: Logout */}
          {isMobile ? (
            <Avatar className="w-8 h-8">
              <AvatarImage src={mockUser.profilePhoto} alt={mockUser.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button variant="ghost" size="sm" className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
