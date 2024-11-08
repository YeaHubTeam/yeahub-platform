import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { Button } from '@/shared/ui/Button';

import styles from './EducationBlockHeader.module.css';

export const EducationBlockHeader = () => {
	const navigate = useNavigate();

	return (
		<div className={styles['education-header']}>
			<h3 className={styles['education-title']}>Образование</h3>
			<Button
				variant="link"
				className={styles['education-edit']}
				onClick={() => navigate(`${ROUTES.profile.edit.page}#education`)}
			>
				Редактировать
			</Button>
		</div>
	);
};
