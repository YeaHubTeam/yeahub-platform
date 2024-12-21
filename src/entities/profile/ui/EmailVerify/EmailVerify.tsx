import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { Card } from '@/shared/ui/Card';

import styles from './EmailVerify.module.css';

interface EmailVerifyProps {
	firstName: string;
}

export const EmailVerify = ({ firstName }: EmailVerifyProps) => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<Card
			className={styles.card}
			isActionPositionBottom
			title={t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_TITLE, { firstName })}
			actionTitle={t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK)}
			actionRoute={EMAIL_VERIFY_SETTINGS_TAB}
		>
			<p className={styles['card-text']}>{t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_DESCRIPTION)}</p>
		</Card>
	);
};
