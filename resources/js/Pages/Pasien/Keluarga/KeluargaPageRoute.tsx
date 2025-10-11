import KeluargaPage from "@/Components/features/pasien/keluarga/KeluargaPage";
import PasienLayout from "@/Layouts/PasienLayout";

export default function KeluargaPageRoute({keluarga, allAnggota, user}){


    return (
        <PasienLayout currentPage="keluarga" user={user} >

        <KeluargaPage keluarga={keluarga} allAnggota={allAnggota}/>

        </PasienLayout>
    )
}
