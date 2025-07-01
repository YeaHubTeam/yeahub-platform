import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { DeleteAccountButton } from '@/features/profile/deleteAccount';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { ManageProfilesPanel } from '@/widgets/manageProfiles';

import styles from './AccountTab.module.css';

export const AccountTab = () => {
	const { t } = useTranslation(i18Namespace.user);

	return (
		<Flex direction="column" gap="32">
			<ManageProfilesPanel />
			<Card>
				<Text variant="head3" isMainTitle className={styles.title}>
					{t(User.DELETE_TITLE)}
				</Text>
				<Text variant="body3" className={styles.description}>
					{t(User.DELETE_DESCRIPTION_MAIN)}
				</Text>
				<DeleteAccountButton />
			</Card>
		</Flex>
	);
};
