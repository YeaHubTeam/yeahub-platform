import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

import { DeleteAccountButton } from '@/features/profile/deleteAccount';

import styles from './DeleteAccountSection.module.css';

export const DeleteAccountSection = () => {
	const { t } = useTranslation(i18Namespace.user);

	return (
		<Card>
			<Text variant="head3" isMainTitle className={styles.title}>
				{t(User.DELETE_TITLE)}
			</Text>
			<Text variant="body3" className={styles.description}>
				{t(User.DELETE_DESCRIPTION_MAIN)}
			</Text>
			<DeleteAccountButton />
		</Card>
	);
};
