import React from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  History,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    name: 'Dasbor',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Jadwal',
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

export const BottomNavigation: React.FC = () => {
//   const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <>
            </>
            // <NavLink
            //   key={item.name}
            //   to={item.href}
            //   className={cn(
            //     "flex-1 flex flex-col items-center justify-center py-3 px-2 transition-[var(--transition-smooth)]",
            //     isActive
            //       ? "text-primary bg-primary/5"
            //       : "text-muted-foreground hover:text-primary"
            //   )}
            // >
            //   <item.icon className={cn(
            //     "w-5 h-5 mb-1",
            //     isActive ? "text-primary" : "text-muted-foreground"
            //   )} />
            //   <span className={cn(
            //     "text-xs font-medium",
            //     isActive ? "text-primary" : "text-muted-foreground"
            //   )}>
            //     {item.name}
            //   </span>
            // </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
