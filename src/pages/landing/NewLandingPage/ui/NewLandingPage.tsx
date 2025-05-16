import { BannerBlock } from '@/widgets/NewLanding/BannerBlock';
import { HistoryBlock } from '@/widgets/NewLanding/HistoryBlock';
import { SpecializationBlock } from '@/widgets/NewLanding/SpecialityBlock';

const NewLandingPage = () => {
	return (
		<>
			<BannerBlock />
			<SpecializationBlock />
			<HistoryBlock />
		</>
	);
};

export default NewLandingPage;
