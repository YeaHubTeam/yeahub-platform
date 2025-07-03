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

	const tooltipText = !isMember
		? t(Profile.MANAGE_PROFILES_TOOLTIP_NOT_MEMBER)
		: t(Profile.MANAGE_PROFILES_TOOLTIP_MAX_COUNT);

	return (
		<Tooltip
			title={tooltipText}
			shouldShowTooltip={!isMember || (isMember && isReachedLimit)}
			color="violet"
			placement="bottom-start"
		>
			<div className={styles.container}>
				<Text variant="body5-accent" color="white-900">
					{currentCount}/{maxCount}
				</Text>
			</div>
		</Tooltip>
	);
};
