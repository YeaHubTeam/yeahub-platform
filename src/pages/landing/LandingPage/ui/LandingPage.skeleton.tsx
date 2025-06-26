import { AboutQuestionsBlockSkeleton } from '@/widgets/Landing/AboutQuestionsBlock';
import { BannerBlockSkeleton } from '@/widgets/Landing/BannerBlock';
import { InterviewTrainerBlockSkeleton } from '@/widgets/Landing/InterviewTrainerBlock';
import { SpecializationBlockSkeleton } from '@/widgets/Landing/SpecialityBlock';

export const LandingPageSkeleton = () => {
	return (
		<>
			<BannerBlockSkeleton />
			<SpecializationBlockSkeleton />
			<AboutQuestionsBlockSkeleton />
			<InterviewTrainerBlockSkeleton />
		</>
	);
};
