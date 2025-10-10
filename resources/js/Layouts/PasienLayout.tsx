import Footer from '@/Components/core/Footer';
import Navbar from '@/Components/core/Navbar';
import { PageProps } from '@/types';
import { User } from '@/types/user/interface';
import { getProfileMenuContent } from '@/utils/profileMenuContent';
import { showToast } from '@/utils/toast';
import { router, usePage } from '@inertiajs/react';
import { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'sonner';

interface Props {
    children: ReactNode;
    currentPage: string;
    user: User;
}
export default function PasienLayout({ children }: Props) {

     const { flash = {}, auth, child, pregnant } = usePage<PageProps>().props as any;
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    // const { auth } = usePage<PageProps>().props;
    const user = auth?.user;




    const navItems = [
        {
            id: 'pasien.homepage',
            label: 'Beranda',
            key: '/pasien/dashboard',
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
                    id: 'list-faskes',
                    label: 'List Faskes',
                    key: '/pasien/faskes',
                },
                {
                    id: 'map-faskes',
                    label: 'Map Faskes',
                    key: '/pasien/faskes-map',
                },
            ],
        },
        {
            id: 'pasien-bank-obat',
            label: 'Bank Obat',
            key: '/pasien/bank-obat',
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
                    key: '/pasien/panduan/ibu-hamil',
                },
                {
                    id: 'panduan-balita',
                    label: 'Panduan Balita',
                    key: '/pasien/panduan/balita',
                },
            ],
        },
        {
            id: 'konsultasi-online',
            label: 'Konsultasi Online',
            key: '/pasien/konsultasi',
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
        router.visit(page);
    };
    const handleProfileClick = () => {
        // Inertia.visit(route('profile.show'));
    };
    const handleLogoutClick = () => {
        // Inertia.post(route('logout'));
    };
    const currentPage = window.location.pathname;

    return (
        <div className="bg-background min-h-screen">
            <Navbar

                user={user}
                navItems={navItems}
                onNavigate={handleNavigate}
                currentPage={currentPage}
                onNotificationClick={() => setIsNotificationOpen(true)}
                profileMenuContent={getProfileMenuContent({
                pregnant,
                child,
                    user,
                    onProfileClick: handleProfileClick,
                    onLogoutClick: handleLogoutClick,
                })}
            />
            <main className="pt-16">{children}</main>
            <Toaster position="top-right" richColors closeButton />
            <Footer />
        </div>
    );
}
