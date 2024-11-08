import { useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Button } from '@/shared/ui/Button';

import styles from './InfoBlockHeader.module.css';

export const InfoBlockHeader = () => {
	const navigate = useNavigate();
	const { t } = useI18nHelpers(i18Namespace.profile);
	const { isMobile, isTablet } = useScreenSize();

	const handleNavigate = () => {
		navigate(`${ROUTES.profile.edit.page}#about-me`);
	};

	return (
		<div className={styles['info-header']}>
			<h3 className={styles['info-title']}>{t(Profile.PROFILEPAGE_ABOUTME_TITLE)}</h3>
			<Button
				variant="link"
				className={styles['info-edit']}
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
