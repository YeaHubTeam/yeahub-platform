import { useNavigate } from 'react-router-dom';
import { Button, Icon } from 'yeahub-ui-kit';

import styles from './UserEditButton.module.css';

export const UserEditButton = () => {
	const navigate = useNavigate();
	const navigateToEdit = () => navigate('edit#personal-information');

	return (
		<div className={styles['card-edit-block']}>
			<Button
				theme="link"
				tagName="button"
				className={styles['card-edit']}
				onClick={navigateToEdit}
			>
				Редактировать
			</Button>
			<Icon
				icon="pencilSimpleLine"
				size={20}
				color="--palette-ui-purple-700"
				onClick={navigateToEdit}
				className={styles['card-edit-icon']}
			/>
		</div>
	);
};
