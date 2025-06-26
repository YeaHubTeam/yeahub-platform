import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import styles from './ProfilesCounter.module.css';

interface ProfilesCounterProps {
	isReachedLimit: boolean;
	currentCount: number;
	isMember: boolean;
	maxCount: number;
}

export const ProfilesCounter = ({
	isReachedLimit,
	currentCount,
	maxCount,
	isMember,
}: ProfilesCounterProps) => {
	const { t } = useTranslation(i18Namespace.profile);

	const counter = (
		<div className={styles.container}>
			<Text variant="body5-accent" color="white-900">
				{currentCount}/{maxCount}
			</Text>
		</div>
	);

	if (!isMember) {
		return (
			<Tooltip
				title={t(Profile.MANAGE_PROFILES_TOOLTIP_NOT_MEMBER)}
				color="violet"
				placement="bottom-start"
			>
				{counter}
			</Tooltip>
		);
	}

	if (isMember && isReachedLimit) {
		return (
			<Tooltip
				title={t(Profile.MANAGE_PROFILES_TOOLTIP_MAX_COUNT)}
				color="violet"
				placement="bottom-start"
			>
				{counter}
			</Tooltip>
		);
	}

	return counter;
};
