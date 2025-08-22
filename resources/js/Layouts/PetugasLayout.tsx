import { Header } from '@/Components/core/Header';
import { Navigation } from '@/Components/partials/Navigation';
import { useState } from 'react';
export default function PetugasLayout({ children, user }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <div className="bg-background min-h-screen">
            <Header onMenuClick={() => setIsMobileMenuOpen(true)} user={user} />
            <Navigation
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />{' '}
            <main className="pt-16 lg:pl-72">{children}</main>
        </div>
    );
}
