import { Button } from 'yeahub-ui-kit';

import styles from './SkillsBlockHeader.module.css';

export const SkillsBlockHeader = () => {
	return (
		<div className={styles['skills-header']}>
			<h3 className={styles['skills-title']}>Навыки</h3>
			<Button theme="link" tagName="button" className={styles['skills-edit']}>
				Редактировать
			</Button>
		</div>
	);
};
