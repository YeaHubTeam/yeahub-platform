import { Footer } from '@/widgets/Landing/Footer';
import { Header } from '@/widgets/Landing/Header';
import { InterviewBlock } from '@/widgets/Landing/InterviewBlock';
import { InterviewModeBlock } from '@/widgets/Landing/InterviewModeBlock';
import { PlatformInterfaceBlock } from '@/widgets/Landing/PlatformInterfaceBlock';
import { ProgressBlock } from '@/widgets/Landing/ProgressBlock';
import { TrainingBlock } from '@/widgets/Landing/TrainingBlock';

import styles from './MainPage.module.css';

const MainPage = () => {
	return (
		<div className={styles.container}>
			<Header />
			<InterviewBlock />
			<TrainingBlock />
			<PlatformInterfaceBlock />
			<InterviewModeBlock />
			<ProgressBlock />
			<Footer />
		</div>
	);
};

export default MainPage;
