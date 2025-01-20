import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

import styles from './EmailVerifyStub.module.css';

interface EmailVerifyStubProps {
	firstName: string;
}

export const EmailVerifyStub = ({ firstName }: EmailVerifyStubProps) => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<Card
			className={styles.card}
			isActionPositionBottom
			withOutsideShadow
			title={t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_TITLE, { firstName })}
			actionTitle={t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK)}
			actionRoute={EMAIL_VERIFY_SETTINGS_TAB}
		>
			<Text variant="body2-accent" color="black-600">
				{t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_DESCRIPTION)}
			</Text>
		</Card>
	);
};
