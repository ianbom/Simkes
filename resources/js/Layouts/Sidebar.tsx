import React from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  History,
  User,
  Stethoscope
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    name: 'Dasbor',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Jadwal Saya',
    href: '/schedule',
    icon: Calendar
  },
  {
    name: 'Riwayat',
    href: '/history',
    icon: History
  },
  {
    name: 'Profil',
    href: '/profile',
    icon: User
  }
];

export const Sidebar: React.FC = () => {
//   const location = useLocation();

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border min-h-screen">
      {/* Logo & Brand */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">Sehati</h1>
            <p className="text-sm text-muted-foreground">Healthcare Officer</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <>
            </>
            // <NavLink
            //   key={item.name}
            //   to={item.href}
            //   className={cn(
            //     "flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground transition-[var(--transition-smooth)] group",
            //     isActive
            //       ? "bg-sidebar-accent text-sidebar-primary font-medium shadow-sm"
            //       : "hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
            //   )}
            // >
            //   <item.icon className={cn(
            //     "w-5 h-5 transition-colors",
            //     isActive ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-sidebar-primary"
            //   )} />
            //   <span className="font-medium">{item.name}</span>
            // </NavLink>
          );
        })}
      </nav>

      {/* Footer Info */}
      {/* <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-sidebar-accent/30 rounded-lg p-4">
          <p className="text-xs text-muted-foreground text-center">
            Sehati Healthcare System v1.0
          </p>
        </div>
      </div> */}
    </div>
  );
};
