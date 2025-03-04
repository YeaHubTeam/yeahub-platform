import { useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Button } from '@/shared/ui/Button';

import styles from './UserEditButton.module.css';

export const UserEditButton = () => {
	const navigate = useNavigate();
	const { isMobile, isTablet } = useScreenSize();

	const handleNavigate = () => {
		navigate(`${ROUTES.profile.edit.page}#personal-information`);
	};

	return (
		<div className={styles['card-edit-block']}>
			<Button
				variant="link"
				fullWidth={true}
				className={styles['card-edit']}
				onClick={handleNavigate}
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
