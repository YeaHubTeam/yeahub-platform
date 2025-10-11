import { InterviewMaterials } from '../InterviewMaterials/InterviewMaterials';
import { SkillsListTicker } from '../SkillsListTicker/SkillsListTicker';

import styles from './AboutQuestionsBlock.module.css';

export const AboutQuestionsBlock = () => {
	return (
		<section className={styles.container} data-testid={'AboutQuestionsBlock_Section'}>
			<InterviewMaterials />
			<SkillsListTicker />
		</section>
	);
};
