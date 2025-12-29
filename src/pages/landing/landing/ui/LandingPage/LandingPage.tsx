import { AboutQuestionsBlock } from '@/widgets/Landing/AboutQuestionsBlock';
import { BannerBlock } from '@/widgets/Landing/BannerBlock';
import { CollectionBlock } from '@/widgets/Landing/CollectionBlock';
import { HistoryBlock } from '@/widgets/Landing/HistoryBlock';
import { InterviewTrainerBlock } from '@/widgets/Landing/InterviewTrainerBlock';
import { SpecializationBlock } from '@/widgets/Landing/SpecialityBlock';

const LandingPage = () => {
	return (
		<>
			<BannerBlock />
			<SpecializationBlock />
			<AboutQuestionsBlock />
			<InterviewTrainerBlock />
			<CollectionBlock />
			<HistoryBlock />
		</>
	);
};

export default LandingPage;
