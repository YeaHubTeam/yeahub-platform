import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import styles from './ExperienceBlockHeader.module.css';

export const ExperienceBlockHeader = () => {
	const navigate = useNavigate();

	return (
		<div className={styles['experience-header']}>
			<h3 className={styles['experience-title']}>Опыт работы</h3>
			<span className={styles['experience-time']}>{'4 года 7 месяцев'}</span>
			<Button
				theme="link"
				tagName="button"
				className={styles['experience-edit']}
				onClick={() => navigate('edit#experience')}
			>
				Редактировать
			</Button>
		</div>
	);
};
