import { Header } from '@/Components/core/Header';
import { Navigation } from '@/Components/partials/Navigation';
import { User } from '@/types/user/interface';
import { ReactNode, useState } from 'react';
interface Props {
    children: ReactNode;
    user: User;
}
export default function PetugasLayout({ children, user }: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
            <Header onMenuClick={() => setIsMobileMenuOpen(true)} user={user} />
            <Navigation
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />{' '}
            <main className="pt-16 lg:pl-72">{children}</main>
        </div>
    );
}
