import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './InfoBlockHeader.module.css';

export const InfoBlockHeader = () => {
	const navigate = useNavigate();
	const { t } = useI18nHelpers(i18Namespace.profile);

	return (
		<div className={styles['info-header']}>
			<h3 className={styles['info-title']}>{t(Profile.PROFILEPAGE_ABOUTME_TITLE)}</h3>
			<Button
				theme="link"
				tagName="button"
				className={styles['info-edit']}
				onClick={() => navigate('edit#about-me')}
			>
				{t(Profile.PROFILEPAGE_EDITBUTTON)}
			</Button>
		</div>
	);
};
