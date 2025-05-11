import { InterviewMaterials } from '../InterviewMaterials/InterviewMaterials';
import { SkillsListTicker } from '../SkillsListTicker/SkillsListTicker';

import styles from './AboutQuestionsBlock.module.css';

export const AboutQuestionsBlock = () => {
	return (
		<section>
			<div className={styles.container}>
				<InterviewMaterials />
				<SkillsListTicker />
			</div>
		</section>
	);
};
