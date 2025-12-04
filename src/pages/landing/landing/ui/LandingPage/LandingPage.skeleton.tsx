import { AboutQuestionsBlockSkeleton } from '@/widgets/Landing/AboutQuestionsBlock';
import { BannerBlockSkeleton } from '@/widgets/Landing/BannerBlock';
import { CollectionBlockSkeleton } from '@/widgets/Landing/CollectionBlock';
import { HistoryBlockSkeleton } from '@/widgets/Landing/HistoryBlock';
import { InterviewTrainerBlockSkeleton } from '@/widgets/Landing/InterviewTrainerBlock';
import { SpecializationBlockSkeleton } from '@/widgets/Landing/SpecialityBlock';

export const LandingPageSkeleton = () => {
	return (
		<div data-testid={'LandingPageSkeleton'}>
			<BannerBlockSkeleton />
			<SpecializationBlockSkeleton />
			<AboutQuestionsBlockSkeleton />
			<InterviewTrainerBlockSkeleton />
			<CollectionBlockSkeleton />
			<HistoryBlockSkeleton />
		</div>
	);
};
