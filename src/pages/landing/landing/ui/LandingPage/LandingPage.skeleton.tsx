import { AboutQuestionsBlockSkeleton } from '../AboutQuestionsBlock/AboutQuestionsBlock.skeleton';
import { BannerBlockSkeleton } from '../BannerBlock/BannerBlock.skeleton';
import { CollectionBlockSkeleton } from '../CollectionBlock/CollectionBlock.skeleton';
import { HistoryBlockSkeleton } from '../HistoryBlock/HistoryBlock.skeleton';
import { InterviewTrainerBlockSkeleton } from '../InterviewTrainerBlock/InterviewTrainerBlock.skeleton';
import { SpecializationBlockSkeleton } from '../SpecializationBlock/SpecializationBlock.skeleton';

export const LandingPageSkeleton = () => {
	return (
		<div data-testid="LandingPageSkeleton">
			<BannerBlockSkeleton />
			<SpecializationBlockSkeleton />
			<AboutQuestionsBlockSkeleton />
			<InterviewTrainerBlockSkeleton />
			<CollectionBlockSkeleton />
			<HistoryBlockSkeleton />
		</div>
	);
};
