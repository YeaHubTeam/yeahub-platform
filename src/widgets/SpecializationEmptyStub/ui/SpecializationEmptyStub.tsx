import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Interview } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

import styles from './SpecializationEmptyStub.module.css';

export const SpecializationEmptyStub = () => {
	const { t } = useI18nHelpers(i18Namespace.interview);
	const navigate = useNavigate();

	const handleProfileRedirect = () => {
		navigate(ROUTES.profile.edit.page);
	};

	return (
		<Card className={styles.card} title={t(Interview.PREPARATION_STUB_TITLE)}>
			<div className={styles['card-content']}>
				<p className={styles['card-text']}>{t(Interview.PREPARATION_STUB_DESCRIPTION)}</p>
				<Button onClick={handleProfileRedirect} className={styles.button} size="L">
					{t(Interview.FILLPROFILE_BUTTON)}
				</Button>
			</div>
		</Card>
	);
};
