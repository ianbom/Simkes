import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Bell, ChevronDown, LogOut, Menu, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function Header({ onMenuClick, user }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [notifications] = useState(3);
    const profileRef = useRef(null);

    // 🔹 State untuk tanggal sekarang
    const [today, setToday] = useState('');

    useEffect(() => {
        const now = new Date();
        // contoh format: Rabu, 20 Agustus 2025
        const formatted = now.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setToday(formatted);

        function handleClickOutside(event) {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setIsProfileOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="fixed left-0 right-0 top-0 z-50 bg-white px-4 py-3 shadow-sm lg:left-72 lg:px-6">
            <div className="flex items-center justify-between">
                {/* Left side - Menu + Logo + Date */}
                <div className="flex items-center gap-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="lg:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    <div className="flex items-center gap-x-2 lg:hidden">
                        <img
                            src="/assets/images/simkesia-logo.png"
                            alt="Logo"
                            className="h-8 w-8"
                        />
                        <h1 className="font-heading text-lg font-bold text-primary">
                            Simkesia
                        </h1>
                    </div>

                    {/* 🔹 Tambahan: Tanggal sekarang */}
                    <span className="hidden text-sm font-medium text-gray-600 lg:block">
                        {today}
                    </span>
                </div>

                {/* Right side - Notifications + Profile */}
                <div className="flex items-center gap-x-3">
                    {/* Notifications */}
                    <Button variant="ghost" size="sm" className="relative">
                        <Bell className="h-5 w-5" />
                        {notifications > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {notifications > 9 ? '9+' : notifications}
                            </span>
                        )}
                    </Button>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-x-2 px-3"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                                <User className="h-4 w-4 text-white" />
                            </div>
                            <div className="hidden text-left md:block">
                                <p className="text-sm font-medium text-gray-900">
                                    {user?.name || 'Argya Dwi'}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {user?.role || 'Dokter'}
                                </p>
                            </div>
                            <ChevronDown
                                className={cn(
                                    'h-4 w-4 transition-transform duration-200',
                                    isProfileOpen && 'rotate-180',
                                )}
                            />
                        </Button>

                        {isProfileOpen && (
                            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg bg-white shadow-lg">
                                <div className="px-4 py-3">
                                    <p className="text-sm font-medium text-gray-900">
                                        {user?.name || 'Dr. John Doe'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {user?.email || 'john.doe@simkesia.com'}
                                    </p>
                                </div>

                                <div className="py-1">
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <User className="h-4 w-4" />
                                        Profil Saya
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <User className="h-4 w-4" />
                                        Riwayat Checkup Rutin
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <User className="h-4 w-4" />
                                        Riwayat Checkup Sakit{' '}
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <User className="h-4 w-4" />
                                        Riwayat Konsultasi Online{' '}
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <User className="h-4 w-4" />
                                        Perkembangan Anak
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <User className="h-4 w-4" />
                                        Perkembangan Kehamilan
                                    </Link>
                                </div>

                                <div className="py-1">
                                    <button
                                        className="flex w-full items-center gap-x-3 px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            // Handle logout logic here
                                        }}
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Keluar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
