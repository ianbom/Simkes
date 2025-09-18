import FoodRecomendationSection from '@/Components/partials/pasien/panduan/FoodRecomendationSection';
import GuideDropdownSection from '@/Components/partials/pasien/panduan/GuideDropdown';
import HeroGuideSection from '@/Components/partials/pasien/panduan/HeroGuideSection';
const guides = [
    {
        question: 'Panduan Lengkap untuk Bunda Hamil',
        answer: 'Sebelum memulai kehamilan, Bunda bisa mempersiapkan diri dengan pola makan bergizi, menjaga berat badan ideal, olahraga ringan, serta melakukan pemeriksaan kesehatan. Jangan lupa juga untuk mengonsumsi asam folat agar siap menyambut kehamilan.',
    },
    {
        question: 'Trimester Satu (0–12 Minggu)',
        answer: 'Di awal kehamilan, tubuh Bunda sedang beradaptasi. Morning sickness, perubahan hormon, dan rasa lelah adalah hal yang wajar. Fokus pada istirahat cukup, makanan bergizi, serta rutin memeriksakan kandungan. Hindari stres berlebih dan jaga kebahagiaan Bunda.',
    },
    {
        question: 'Trimester Dua (13–27 Minggu)',
        answer: 'Masa ini biasanya jadi periode paling nyaman. Perut mulai terlihat membesar, dan Bunda bisa merasakan gerakan pertama si Kecil. Tetap jaga nutrisi dengan protein, kalsium, dan zat besi, serta lakukan olahraga ringan seperti senam hamil.',
    },
    {
        question: 'Trimester Tiga (28–40 Minggu)',
        answer: 'Tubuh semakin berat dan mudah lelah. Saatnya Bunda lebih fokus mempersiapkan persalinan, mulai dari perlengkapan bayi, rencana melahirkan, hingga dukungan keluarga. Jangan lupa terus cek kehamilan dan perhatikan tanda-tanda menjelang lahir.',
    },
    {
        question: 'Persalinan',
        answer: 'Momen yang ditunggu akhirnya tiba. Bunda bisa memilih metode persalinan sesuai kondisi, baik normal maupun caesar, dengan arahan dokter atau bidan. Pastikan faskes yang dipilih nyaman, dan jangan lupa siapkan mental serta dukungan pasangan agar persalinan berjalan lancar.',
    },
];
const PregnancyGuidePage = () => {
    return (
        <>
            <HeroGuideSection
                title="Panduan Lengkap untuk Bunda Hamil"
                description="akan menemani setiap langkah kehamilan Bunda, dari trimester pertama hingga persiapan melahirkan, dengan tips praktis dan informasi terpercaya."
                buttonText="Pelajari Sekarang"
                buttonLink="/panduan/hamil"
                image="/assets/images/kehamilan-guide.png"
            />{' '}
            <GuideDropdownSection
                heading="Seputar Kehamilan"
                description="Temukan materi dan jawaban atas pertanyaan Anda tentang kehamilan."
                guides={guides}
            />
            <FoodRecomendationSection />
        </>
    );
};

export default PregnancyGuidePage;
