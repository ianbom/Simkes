import Footer from '@/Components/core/Footer';
import Navbar from '@/Components/core/Navbar';
import NotificationSidebar from '@/Components/core/NotificationSidebar';
import { PageProps } from '@/types';
import { User } from '@/types/user/interface';
import { getProfileMenuContent } from '@/utils/profileMenuContent';
import { showToast } from '@/utils/toast';
import { usePage } from '@inertiajs/react';
import { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'sonner';
interface Props {
    children: ReactNode;
    currentPage: string;
    user: User;
}
export default function PasienLayout({ children, currentPage }: Props) {
    const { flash = {} } = usePage().props;
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;
    const navItems = [
        {
            id: 'pasien.homepage',
            label: 'Beranda',
            key: 'pasien.homepage',
            href: '/pasien/homepage',
            showOnMobile: true,
            showOnDesktop: true,
            hasDropdown: false,
        },
        {
            id: 'faskes',
            label: 'Faskes',
            key: 'faskes',
            showOnMobile: true,
            showOnDesktop: true,
            hasDropdown: true,
            dropdownItems: [
                {
                    id: 'faskes-a',
                    label: 'Faskes A',
                    key: 'faskes-a',
                },
                {
                    id: 'faskes-b',
                    label: 'Faskes B',
                    key: 'faskes-b',
                },
                {
                    id: 'faskes-c',
                    label: 'Faskes C',
                    key: 'faskes-c',
                },
            ],
        },
        {
            id: 'pasien-bank-obat',
            label: 'Bank Obat',
            key: 'bank-obat',
            showOnMobile: true,
            showOnDesktop: true,
            hasDropdown: false,
        },
        {
            id: 'panduan',
            label: 'Panduan',
            key: 'panduan',
            showOnMobile: true,
            showOnDesktop: true,
            hasDropdown: true,
            dropdownItems: [
                {
                    id: 'panduan-ibu-hamil',
                    label: 'Panduan Ibu Hamil',
                    key: 'panduan-ibu-hamil',
                },
                {
                    id: 'panduan-balita',
                    label: 'Panduan Balita',
                    key: 'panduan-balita',
                },
            ],
        },
        {
            id: 'konsultasi-online',
            label: 'Konsultasi Online',
            key: 'konsultasi-online',
            showOnMobile: true,
            showOnDesktop: true,
            hasDropdown: false,
        },
    ];
    useEffect(() => {
        console.log('Flash data di PasienLayout:', flash);
        showToast.handleFlash(flash);
    }, [flash]);
    const handleNavigate = (page: string) => {
        // Inertia.visit(`/${page}`);
    };
    const handleProfileClick = () => {
        // Inertia.visit(route('profile.show'));
    };
    const handleLogoutClick = () => {
        // Inertia.post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar
                user={user}
                navItems={navItems}
                onNavigate={handleNavigate}
                currentPage={currentPage}
                onNotificationClick={() => setIsNotificationOpen(true)}
                profileMenuContent={getProfileMenuContent({
                    user,
                    onProfileClick: handleProfileClick,
                    onLogoutClick: handleLogoutClick,
                })}
            />
            <main className="pt-16">{children}</main>
            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
            <Toaster position="top-right" richColors closeButton />
            <Footer />
        </div>
    );
}
