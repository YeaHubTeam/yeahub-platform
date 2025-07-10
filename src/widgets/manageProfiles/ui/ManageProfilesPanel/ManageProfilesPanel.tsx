import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';

import {
	getEmptySpecializationProfile,
	getHasAdminRole,
	getHasPremiumAccess,
	getProfiles,
	getProfilesLength,
} from '@/entities/profile';

import { CreateProfileButton } from '@/features/profile/createProfile';

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

	const hasPremiumAccess = useAppSelector(getHasPremiumAccess);
	const hasAdminRole = useAppSelector(getHasAdminRole);

	const isCreateProfileEnabled = hasPremiumAccess || hasAdminRole;

	if (!profiles) {
		return null;
	}

	const countLimit = isCreateProfileEnabled
		? MEMBER_PROFILES_COUNT_LIMIT
		: NOT_MEMBER_PROFILES_COUNT_LIMIT;

	const isReachedProfilesLimit = profilesCount === countLimit;

	const createProfileDisabled =
		isReachedProfilesLimit ||
		(isCreateProfileEnabled && hasEmptySpecialization) ||
		!isCreateProfileEnabled;

	return (
		<Card className={styles.container}>
			<ManageProfilesHeader
				currentCount={profilesCount}
				maxCount={countLimit}
				isMember={isCreateProfileEnabled}
				isReachedLimit={isReachedProfilesLimit}
				className={styles.mb}
			/>
			<ProfilesList
				profiles={profiles}
				isEmptySpecialization={isEmptySpecialization}
				className={styles.mb}
			/>
			<CreateProfileButton className={styles['create-button']} disabled={createProfileDisabled} />
		</Card>
	);
};
