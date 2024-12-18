import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { Button } from '@/shared/ui/Button';

import styles from './ProjectsBlockHeader.module.css';

export const ProjectsBlockHeader = () => {
	const navigate = useNavigate();

	return (
		<div className={styles['projects-header']}>
			<h3 className={styles['projects-title']}>Проекты</h3>
			<Button
				variant="link"
				className={styles['projects-edit']}
				onClick={() => navigate(`${ROUTES.profile.edit.page}#projects`)}
			>
				Редактировать
			</Button>
		</div>
	);
};
