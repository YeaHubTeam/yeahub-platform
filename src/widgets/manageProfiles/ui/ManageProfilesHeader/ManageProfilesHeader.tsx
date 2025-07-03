// src/pages/some-page/ui/ManageProfilesPanel/ManageProfilesHeader/ManageProfilesHeader.tsx

import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ProfilesCounter } from '../ProfilesCounter/ProfilesCounter';

import styles from './ManageProfilesHeader.module.css'; // Можно использовать стили родителя или создать свои

interface ManageProfilesHeaderProps {
	isMember: boolean;
	currentCount: number;
	maxCount: number;
	isReachedLimit: boolean;
	className?: string;
}

export const ManageProfilesHeader = ({
	isMember,
	currentCount,
	maxCount,
	isReachedLimit,
	className,
}: ManageProfilesHeaderProps) => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<Flex align="center" justify="between" className={className}>
			<Text className={styles.title} variant="head3">
				{t(Profile.MANAGE_PROFILES_TITLE)}
			</Text>
			<ProfilesCounter
				isMember={isMember}
				currentCount={currentCount}
				maxCount={maxCount}
				isReachedLimit={isReachedLimit}
			/>
		</Flex>
	);
};
