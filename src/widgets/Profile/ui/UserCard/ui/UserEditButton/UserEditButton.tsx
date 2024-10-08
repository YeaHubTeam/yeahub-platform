import { useNavigate } from 'react-router-dom';
import { Button, Icon } from 'yeahub-ui-kit';

import { useScreenSize } from '@/shared/hooks/useScreenSize';

import styles from './UserEditButton.module.css';

export const UserEditButton = () => {
	const navigate = useNavigate();
	const { isMobile, isTablet } = useScreenSize();

	const handleNavigate = () => {
		navigate('edit#personal-information');
	};

	return (
		<div className={styles['card-edit-block']}>
			<Button
				theme="link"
				fullWidth={true}
				className={styles['card-edit']}
				onClick={handleNavigate}
				size="small"
				preffix={
					isMobile || isTablet ? (
						<Icon icon="pencilSimpleLine" size={20} color="--palette-ui-purple-700" />
					) : undefined
				}
			>
				{!(isMobile || isTablet) ? 'Редактировать' : ''}
			</Button>
		</div>
	);
};
