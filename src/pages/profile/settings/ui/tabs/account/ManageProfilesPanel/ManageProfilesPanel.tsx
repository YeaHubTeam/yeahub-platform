import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Profile } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Tooltip } from '@/shared/ui/Tooltip';

import {
	getEmptySpecializationProfile,
	getHasPremiumAccess,
	getProfiles,
	getProfilesLength,
} from '@/entities/profile';

import {
	MEMBER_PROFILES_COUNT_LIMIT,
	NOT_MEMBER_PROFILES_COUNT_LIMIT,
} from '../../../../lib/constants/manageProfilesContants';
import { CreateProfileButton } from '../CreateProfileButton/CreateProfileButton';
import { ManageProfilesHeader } from '../ManageProfilesHeader/ManageProfilesHeader';
import { ProfilesList } from '../ProfilesList/ProfilesList';
import { SwitchSpecializationInfoButton } from '../SwitchSpecializationInfoButton/SwitchSpecializationInfoButton';

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
			<div>
				<Flex direction="row" justify="between" gap="20" align="center" wrap="wrap">
					<SwitchSpecializationInfoButton />
					<Tooltip title={t(tooltipEntry)} shouldShowTooltip={createProfileDisabled}>
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
