import { useNavigate } from 'react-router-dom';
import { Button, Icon } from 'yeahub-ui-kit';

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
			<Icon
				icon="pencilSimpleLine"
				size={20}
				color="--palette-ui-purple-700"
				onClick={() => navigate('edit#personal-information')}
				className={styles['skills-edit-icon']}
			/>
		</div>
	);
};
