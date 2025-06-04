import { BannerBlockSkeleton } from '@/widgets/Landing/BannerBlock';
import { SpecializationBlockSkeleton } from '@/widgets/Landing/SpecialityBlock';

export const LandingPageSkeleton = () => {
	return (
		<>
			<BannerBlockSkeleton />
			<SpecializationBlockSkeleton />
		</>
	);
};
