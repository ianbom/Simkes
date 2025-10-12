import ProfilePage from '@/Components/features/pasien/profil/ProfilePage';
import PasienLayout from '@/Layouts/PasienLayout';
export default function ProfilePageRoute({ user, provinsi, kota, kecamatan, riwayatMedis }) {

    console.log(user);

    return (
        <PasienLayout currentPage="dashboard" user={user}>
            <ProfilePage user={user} provinsi={provinsi} kota={kota} kecamatan={kecamatan} riwayatMedis={riwayatMedis}/>
        </PasienLayout>
    );
}
