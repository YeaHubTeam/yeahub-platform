import { Button } from 'yeahub-ui-kit';

import styles from './ProjectsBlockHeader.module.css';

export const ProjectsBlockHeader = () => {
	return (
		<div className={styles['projects-header']}>
			<h3 className={styles['projects-title']}>Проекты</h3>
			<Button theme="link" tagName="button" className={styles['projects-edit']}>
				Редактировать
			</Button>
		</div>
	);
};
