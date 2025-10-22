import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Tooltip } from '@/shared/ui/Tooltip';

import {
	getEmptySpecializationProfile,
	getHasPremiumAccess,
	getProfiles,
	getProfilesLength,
} from '@/entities/profile';

import { CreateProfileButton } from '@/features/profile/createProfile';

import { SwitchSpecializationInfoButton } from '@/widgets/manageProfiles/ui/SwitchSpecializationInfoButton';

import {
	MEMBER_PROFILES_COUNT_LIMIT,
	NOT_MEMBER_PROFILES_COUNT_LIMIT,
} from '../../model/constants/manageProfilesContants';
import { ManageProfilesHeader } from '../ManageProfilesHeader/ManageProfilesHeader';
import { ProfilesList } from '../ProfilesList/ProfilesList';

import styles from './ManageProfilesPanel.module.css';

export const ManageProfilesPanel = () => {
	const profiles = useAppSelector(getProfiles);
	const profilesCount = useAppSelector(getProfilesLength);

	const emptySpecializationProfile = useAppSelector(getEmptySpecializationProfile);

	const isEmptySpecialization = (id: number) => id === emptySpecializationProfile?.specializationId;
	const hasEmptySpecialization = Boolean(emptySpecializationProfile);

	const { t } = useTranslation(i18Namespace.profile);

	const hasPremiumAccess = useAppSelector(getHasPremiumAccess);

	const countLimit = hasPremiumAccess
		? MEMBER_PROFILES_COUNT_LIMIT
		: NOT_MEMBER_PROFILES_COUNT_LIMIT;

	const isReachedProfilesLimit = profilesCount === countLimit;

	const tooltipEntry = useMemo(() => {
		switch (true) {
			case isReachedProfilesLimit:
				return Profile.TOOLTIP_CREATE_PROFILE_BUTTON_LIMIT_REACHED;
			case hasPremiumAccess && hasEmptySpecialization:
				return Profile.TOOLTIP_CREATE_PROFILE_BUTTON_EMPTY_SPECIALIZATION;
			default:
				return '';
		}
	}, [isReachedProfilesLimit, hasPremiumAccess, hasEmptySpecialization]);

	const createProfileDisabled = Boolean(tooltipEntry);

	if (!profiles) {
		return null;
	}

	return (
		<Card className={styles.container}>
			<ManageProfilesHeader
				currentCount={profilesCount}
				maxCount={countLimit}
				isMember={hasPremiumAccess}
				isReachedLimit={isReachedProfilesLimit}
				className={styles.mb}
			/>
			<ProfilesList
				profiles={profiles}
				isEmptySpecialization={isEmptySpecialization}
				className={styles.mb}
			/>
			<div className={styles.tooltip}>
				<Flex direction="row" justify="between">
					<SwitchSpecializationInfoButton />
					<Tooltip
						title={t(tooltipEntry)}
						className={styles.tooltip}
						shouldShowTooltip={createProfileDisabled}
					>
						<CreateProfileButton
							className={styles['create-button']}
							disabled={createProfileDisabled}
						/>
					</Tooltip>
				</Flex>
			</div>
		</Card>
	);
};
