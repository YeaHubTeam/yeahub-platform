import { InterviewBlock } from '@/widgets/Landing/InterviewBlock';
import { InterviewModeBlock } from '@/widgets/Landing/InterviewModeBlock';
import { PlatformInterfaceBlock } from '@/widgets/Landing/PlatformInterfaceBlock';
import { ProgressBlock } from '@/widgets/Landing/ProgressBlock';
import { TrainingBlock } from '@/widgets/Landing/TrainingBlock';

const MainPage = () => {
	return (
		<>
			<InterviewBlock />
			<TrainingBlock />
			<PlatformInterfaceBlock />
			<InterviewModeBlock />
			<ProgressBlock />
		</>
	);
};

export default MainPage;
