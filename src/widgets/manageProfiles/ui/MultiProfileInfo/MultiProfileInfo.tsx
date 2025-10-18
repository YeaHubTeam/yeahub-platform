import { useTranslation } from 'react-i18next';

import multyProfile from '@/shared/assets/images/multyProfile.png';
import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './multiProfileInfo.module.css';

export const MultiProfileInfo = () => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<Card>
			<Flex align="center" gap="20">
				<img src={multyProfile} alt="Multi Profile" />
				<Text variant="body3-accent" className={styles.text}>
					{t(Profile.MANAGE_PROFILES_MULTIPROFILE)}
				</Text>
			</Flex>
		</Card>
	);
};
