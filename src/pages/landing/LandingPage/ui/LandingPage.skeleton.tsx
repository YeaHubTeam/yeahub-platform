import { AboutQuestionsBlockSkeleton } from '@/widgets/Landing/AboutQuestionsBlock';
import { BannerBlockSkeleton } from '@/widgets/Landing/BannerBlock';
import { HistoryBlockSkeleton } from '@/widgets/Landing/HistoryBlock';
import { InterviewTrainerBlockSkeleton } from '@/widgets/Landing/InterviewTrainerBlock';
import { SpecializationBlockSkeleton } from '@/widgets/Landing/SpecialityBlock';

export const LandingPageSkeleton = () => {
	return (
		<>
			<BannerBlockSkeleton />
			<SpecializationBlockSkeleton />
			<AboutQuestionsBlockSkeleton />
			<InterviewTrainerBlockSkeleton />
			<HistoryBlockSkeleton />
		</>
	);
};
