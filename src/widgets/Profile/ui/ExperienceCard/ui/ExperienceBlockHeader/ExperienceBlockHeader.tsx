import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { Button } from '@/shared/ui/Button';

import styles from './ExperienceBlockHeader.module.css';

export const ExperienceBlockHeader = () => {
	const navigate = useNavigate();

	return (
		<div className={styles['experience-header']}>
			<h3 className={styles['experience-title']}>Опыт работы</h3>
			<span className={styles['experience-time']}>{'4 года 7 месяцев'}</span>
			<Button
				variant="link"
				className={styles['experience-edit']}
				onClick={() => navigate(`${ROUTES.profile.edit.page}#experience`)}
			>
				Редактировать
			</Button>
		</div>
	);
};
