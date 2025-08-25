import DescriptionSection from '@/Components/partials/pasien/dashboard/DescriptionSection';
import FeatureSection from '@/Components/partials/pasien/dashboard/FeatureSection';
import HeroSection from '@/Components/partials/pasien/dashboard/HeroSection';
import StoryFeedSection from '@/Components/partials/pasien/dashboard/StoryFeedSection';

const DashboardPasienPage = () => {
    return (
        <>
            <HeroSection />
            <FeatureSection />
            <DescriptionSection />
            <StoryFeedSection />
        </>
    );
};

export default DashboardPasienPage;
