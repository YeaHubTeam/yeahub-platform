import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Button } from '@/shared/ui/Button';

import styles from './SkillsBlockHeader.module.css';

export const SkillsBlockHeader = () => {
	const navigate = useNavigate();
	const { isMobile, isTablet } = useScreenSize();

	const handleNavigate = () => {
		if (location.pathname.startsWith('/admin')) {
			navigate(`${ROUTES.admin.profile.edit.page}#skills`);
			return;
		}
		navigate(`${ROUTES.profile.edit.page}#skills`);
	};
	const { t } = useTranslation([i18Namespace.profile, i18Namespace.translation]);

	return (
		<div className={styles['skills-header']}>
			<h3 className={styles['skills-title']}>{t(Profile.TABS_SKILLS)}</h3>
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
				{!(isMobile || isTablet) ? t(Translation.EDIT, { ns: i18Namespace.translation }) : ''}
			</Button>
		</div>
	);
};
