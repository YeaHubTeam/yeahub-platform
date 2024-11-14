import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';

import styles from './EmailVerify.module.css';

interface EmailVerifyProps {
	firstName: string;
}

export const EmailVerify = ({ firstName }: EmailVerifyProps) => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	return (
		<Card
			className={styles.card}
			isActionPositionBottom
			title={`${firstName}, ${t(Profile.PROFILE_EMAIL_VERIFICATION_TITLE)}`}
			actionTitle={t(Profile.PROFILE_EMAIL_VERIFICATION_VERIFY_LINK)}
			actionRoute={EMAIL_VERIFY_SETTINGS_TAB}
		>
			<p className={styles['card-text']}>{t(Profile.PROFILE_EMAIL_VERIFICATION_DESCRIPTION)}</p>
		</Card>
	);
};
