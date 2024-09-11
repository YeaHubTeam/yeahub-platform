import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import styles from './ProjectsBlockHeader.module.css';

export const ProjectsBlockHeader = () => {
	const navigate = useNavigate();

	return (
		<div className={styles['projects-header']}>
			<h3 className={styles['projects-title']}>Проекты</h3>
			<Button
				theme="link"
				tagName="button"
				className={styles['projects-edit']}
				onClick={() => navigate('edit#projects')}
			>
				Редактировать
			</Button>
		</div>
	);
};
