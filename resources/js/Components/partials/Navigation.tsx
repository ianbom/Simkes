import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import {
    Calendar,
    LayoutDashboard,
    Menu,
    SquareActivity,
    Stethoscope,
    Video,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const toggleNavigation = [
    {
        name: 'Riwayat Pemeriksaan Kehamilan',
        href: '/petugas/history/checkup-kehamilan',
        icon: SquareActivity,
    },
    {
        name: 'Riwayat Pemeriksaan Anak',
        href: '/petugas/history/checkup-anak',
        icon: Stethoscope,
    },
];
const navigation = [
    { name: 'Dashboard', href: '/petugas/dashboard', icon: LayoutDashboard },

    {
        name: 'Konsultasi Online',
        href: '/petugas/list-konsultasi',
        icon: Video,
    },
    {
        name: 'Jadwal Pemeriksaan',
        href: '/petugas/jadwal-ketersediaan',
        icon: Calendar,
    },
    {
        name: 'Riwayat Pemeriksaan Kehamilan',
        href: '/petugas/history/checkup-kehamilan',
        icon: SquareActivity,
    },
    {
        name: 'Riwayat Pemeriksaan Anak',
        href: '/petugas/history/checkup-anak',
        icon: Stethoscope,
    },
];

const bottomNavigation = [
    { name: 'Dashboard', href: '/petugas/dashboard', icon: LayoutDashboard },
    {
        name: 'Jadwal Pemeriksaan',
        href: '/petugas/jadwal-ketersediaan',
        icon: Calendar,
    },
    { name: 'Konsultasi Online', href: '/consultation', icon: Video },
];

export function Navigation({
    isMobileMenuOpen: externalMobileMenuOpen,
    setIsMobileMenuOpen: externalSetMobileMenuOpen,
}) {
    const { url } = usePage();
    // Use internal state if external props are not provided
    const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);

    const isMobileMenuOpen =
        externalMobileMenuOpen !== undefined
            ? externalMobileMenuOpen
            : internalMobileMenuOpen;

    const setIsMobileMenuOpen =
        externalSetMobileMenuOpen || setInternalMobileMenuOpen;

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [url, setIsMobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Mobile Header - Only show if not using external menu control */}
            {externalMobileMenuOpen === undefined && (
                <div className="lg:hidden">
                    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
                        <div className="flex items-center gap-x-2">
                            <img
                                src="/assets/images/simkesia-logo.png"
                                alt="Logo"
                                className="h-8 w-8"
                            />
                            <h1 className="font-heading text-lg font-bold text-primary">
                                Simkesia
                            </h1>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
                <div className="border-sidebar-border flex grow flex-col gap-y-5 overflow-y-auto border-r bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center gap-x-2">
                        <img
                            src="/assets/images/simkesia-logo.png"
                            alt="Logo"
                            className="h-8 w-8"
                        />
                        <h1 className="font-heading text-xl font-bold text-primary">
                            Simkesia
                        </h1>
                    </div>

                    <nav className="flex flex-1 flex-col">
                        <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-7"
                        >
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => {
                                        const isActive = url === item.href;
                                        return (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        isActive
                                                            ? 'bg-primary text-white'
                                                            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                                        'group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium leading-6 transition-colors',
                                                    )}
                                                >
                                                    <item.icon className="h-5 w-5 shrink-0" />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40 bg-black bg-opacity-25"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Sidebar */}
                    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl">
                        <div className="flex h-full flex-col">
                            {/* Header with close button */}
                            <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-6">
                                <div className="flex items-center gap-x-2">
                                    <img
                                        src="/assets/images/simkesia-logo.png"
                                        alt="Logo"
                                        className="h-8 w-8"
                                    />
                                    <h1 className="font-heading text-lg font-bold text-primary">
                                        Simkesia
                                    </h1>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Navigation */}
                            <nav className="flex-1 overflow-y-auto px-6 py-4">
                                <ul className="space-y-1">
                                    {toggleNavigation.map((item) => {
                                        const isActive = url === item.href;
                                        return (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        isActive
                                                            ? 'bg-primary text-white'
                                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                                                        'group flex items-center gap-x-3 rounded-md p-3 text-sm font-medium transition-colors',
                                                    )}
                                                >
                                                    <item.icon className="h-5 w-5 shrink-0" />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Navigation for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white lg:hidden">
                <nav className="grid w-full grid-cols-3">
                    {bottomNavigation.map((item) => {
                        const isActive = url === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    isActive
                                        ? 'font-medium text-primary'
                                        : 'text-gray-500 hover:text-primary',
                                    'flex flex-1 flex-col items-center justify-center py-2 text-xs transition-colors',
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        'mb-1 h-5 w-5',
                                        isActive
                                            ? 'text-primary'
                                            : 'text-gray-500',
                                    )}
                                />
                                <span className="truncate">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}
