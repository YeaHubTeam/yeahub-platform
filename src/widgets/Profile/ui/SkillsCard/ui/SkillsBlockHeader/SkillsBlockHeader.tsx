import { useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Button } from '@/shared/ui/Button';

import styles from './SkillsBlockHeader.module.css';

export const SkillsBlockHeader = () => {
	const navigate = useNavigate();
	const { isMobile, isTablet } = useScreenSize();

	const handleNavigate = () => {
		navigate(`${ROUTES.profile.edit.page}#skills`);
	};
	const { t } = useI18nHelpers(i18Namespace.profile);

	return (
		<div className={styles['skills-header']}>
			<h3 className={styles['skills-title']}>{t(Profile.PROFILEPAGE_SKILLS_TITLE)}</h3>
			<Button
				variant="link"
				className={styles['skills-edit']}
				onClick={handleNavigate}
				preffix={
					isMobile || isTablet ? (
						<Icon icon="pencilSimpleLine" size={20} color="--palette-ui-purple-700" />
					) : undefined
				}
			>
				{!(isMobile || isTablet) ? t(Profile.PROFILEPAGE_EDITBUTTON) : ''}
			</Button>
		</div>
	);
};
