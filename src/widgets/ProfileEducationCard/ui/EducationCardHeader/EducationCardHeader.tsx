import { Button } from 'yeahub-ui-kit';

import styles from './EducationCardHeader.module.css';

export const EducationCardHeader = () => {
	return (
		<div className={styles['education-header']}>
			<h3 className={styles['education-title']}>Образование</h3>
			<Button theme="link" tagName="button" className={styles['education-edit']}>
				Редактировать
			</Button>
		</div>
	);
};
