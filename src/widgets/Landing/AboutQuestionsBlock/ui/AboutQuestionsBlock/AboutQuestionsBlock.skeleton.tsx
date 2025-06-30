import { InterviewMaterialsSkeleton } from '../InterviewMaterials/InterviewMaterials.skeleton';
import { SkillsListTickerSkeleton } from '../SkillsListTicker/SkillsListTicker.skeleton';

import styles from './AboutQuestionsBlock.module.css';

export const AboutQuestionsBlockSkeleton = () => {
	return (
		<section>
			<div className={styles.container}>
				<InterviewMaterialsSkeleton />
				<SkillsListTickerSkeleton />
			</div>
		</section>
	);
};
