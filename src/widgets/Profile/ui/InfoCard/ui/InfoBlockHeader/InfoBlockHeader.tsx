import { useNavigate } from 'react-router-dom';
import { Button, Icon } from 'yeahub-ui-kit';

import { useScreenSize } from '@/shared/hooks/useScreenSize';

import styles from './InfoBlockHeader.module.css';

export const InfoBlockHeader = () => {
	const navigate = useNavigate();
	const { isMobile, isTablet } = useScreenSize();

	const handleNavigate = () => {
		navigate('edit#about-me');
	};

	return (
		<div className={styles['info-header']}>
			<h3 className={styles['info-title']}>Обо мне</h3>
			<Button
				theme="link"
				fullWidth={true}
				size="small"
				className={styles['info-edit']}
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
