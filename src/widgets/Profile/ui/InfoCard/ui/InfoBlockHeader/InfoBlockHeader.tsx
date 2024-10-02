import { useNavigate } from 'react-router-dom';
import { Button, Icon } from 'yeahub-ui-kit';

import styles from './InfoBlockHeader.module.css';

export const InfoBlockHeader = () => {
	const navigate = useNavigate();

	return (
		<div className={styles['info-header']}>
			<h3 className={styles['info-title']}>Обо мне</h3>
			<Button
				theme="link"
				tagName="button"
				className={styles['info-edit']}
				onClick={() => navigate('edit#about-me')}
			>
				Редактировать
			</Button>
			<Icon
				icon="pencilSimpleLine"
				size={20}
				color="--palette-ui-purple-700"
				onClick={() => navigate('edit#personal-information')}
				className={styles['info-edit-icon']}
			/>
		</div>
	);
};
