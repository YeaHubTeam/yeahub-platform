import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Interview } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { Card } from '../Card';

import styles from './RedirectToProfile.module.css';

export const RedirectToProfile = () => {
	const { t } = useI18nHelpers(i18Namespace.interview);
	const navigate = useNavigate();

	const handleProfileRedirect = () => {
		navigate(ROUTES.profile.edit.page);
	};

	return (
		<Card className={styles.card}>
			<div className={styles['card-wrapper']}>
				<div className={styles['card-content']}>
					<h2 className={styles['card-title']}>{t(Interview.PREPARATION_STUB_TITLE)}</h2>
					<p className={styles['card-text']}>{t(Interview.PREPARATION_STUB_DESCRIPTION)}</p>
					<Button onClick={handleProfileRedirect} className={styles.button} size="large">
						{t(Interview.FILLPROFILE_BUTTON)}
					</Button>
				</div>
			</div>
		</Card>
	);
};
