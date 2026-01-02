import { AboutQuestionsBlock } from '../AboutQuestionsBlock/AboutQuestionsBlock';
import { BannerBlock } from '../BannerBlock/BannerBlock';
import { CollectionBlock } from '../CollectionBlock/CollectionBlock';
import { HistoryBlock } from '../HistoryBlock/HistoryBlock';
import { InterviewTrainerBlock } from '../InterviewTrainerBlock/InterviewTrainerBlock';
import { SpecializationBlock } from '../SpecializationBlock/SpecializationBlock';

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
