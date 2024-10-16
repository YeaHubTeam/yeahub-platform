import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import styles from './EducationBlockHeader.module.css';

export const EducationBlockHeader = () => {
	const navigate = useNavigate();

	return (
		<div className={styles['education-header']}>
			<h3 className={styles['education-title']}>Образование</h3>
			<Button
				theme="link"
				tagName="button"
				className={styles['education-edit']}
				onClick={() => navigate('edit#education')}
			>
				Редактировать
			</Button>
		</div>
	);
};
