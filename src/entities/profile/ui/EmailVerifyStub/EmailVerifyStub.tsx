import { useTranslation } from 'react-i18next';

import { i18Namespace, Profile } from '@/shared/config';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

import styles from './EmailVerifyStub.module.css';

interface EmailVerifyStubProps {
	username: string;
}

export const EmailVerifyStub = ({ username }: EmailVerifyStubProps) => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<Card
			className={styles.card}
			isActionPositionBottom
			withOutsideShadow
			title={t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_TITLE, { username })}
			actionTitle={t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK)}
			actionRoute={EMAIL_VERIFY_SETTINGS_TAB}
		>
			<Text variant="body2-accent" color="black-600">
				{t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_DESCRIPTION)}
			</Text>
		</Card>
	);
};
