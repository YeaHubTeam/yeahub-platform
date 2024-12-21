import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Main, Specializations } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

import styles from './SpecializationEmptyStub.module.css';

export const SpecializationEmptyStub = () => {
	const { t } = useTranslation([i18Namespace.specialization, i18Namespace.main]);
	const navigate = useNavigate();

	const handleProfileRedirect = () => {
		navigate(ROUTES.profile.edit.page);
	};

	return (
		<Card className={styles.card} title={t(Specializations.STUB_EMPTY_TITLE)}>
			<div className={styles['card-content']}>
				<p className={styles['card-text']}>{t(Specializations.STUB_EMPTY_DESCRIPTION)}</p>
				<Button onClick={handleProfileRedirect} className={styles.button} size="L">
					{t(Main.FILL_PROFILE_LINK, { ns: i18Namespace.main })}
				</Button>
			</div>
		</Card>
	);
};
