import ProfilePage from '@/Components/features/pasien/profil/ProfilePage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function ProfilePageRoute({ user }) {
    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <ProfilePage user={user} />
        </PasienLayout>
    );
}
