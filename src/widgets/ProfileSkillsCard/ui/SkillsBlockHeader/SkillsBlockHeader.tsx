import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import styles from './SkillsBlockHeader.module.css';

export const SkillsBlockHeader = () => {
	const navigate = useNavigate();

	return (
		<div className={styles['skills-header']}>
			<h3 className={styles['skills-title']}>Навыки</h3>
			<Button
				theme="link"
				tagName="button"
				className={styles['skills-edit']}
				onClick={() => navigate('edit#skills')}
			>
				Редактировать
			</Button>
		</div>
	);
};
