import { useNavigate } from 'react-router-dom';
import { Button, Icon } from 'yeahub-ui-kit';

import { useScreenSize } from '@/shared/hooks/useScreenSize';

import styles from './SkillsBlockHeader.module.css';

export const SkillsBlockHeader = () => {
	const navigate = useNavigate();
	const { isMobile, isTablet } = useScreenSize();

	const handleNavigate = () => {
		navigate('edit#skills');
	};

	return (
		<div className={styles['skills-header']}>
			<h3 className={styles['skills-title']}>Навыки</h3>
			<Button
				theme="link"
				fullWidth={true}
				className={styles['skills-edit']}
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
