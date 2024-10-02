import { useNavigate } from 'react-router-dom';
import { Button, Icon } from 'yeahub-ui-kit';

import styles from './UserEditButton.module.css';

export const UserEditButton = () => {
	const navigate = useNavigate();

	return (
		<div className={styles['card-edit-block']}>
			<Button
				theme="link"
				tagName="button"
				className={styles['card-edit']}
				onClick={() => navigate('edit#personal-information')}
			>
				Редактировать
			</Button>
			<Icon
				icon="pencilSimpleLine"
				size={20}
				color="--palette-ui-purple-700"
				onClick={() => navigate('edit#personal-information')}
				className={styles['card-edit-icon']}
			/>
		</div>
	);
};
