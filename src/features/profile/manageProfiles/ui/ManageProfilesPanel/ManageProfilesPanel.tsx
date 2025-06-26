import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import {
	getProfiles,
	getEmptySpecializationProfile,
	getHasSubscriptions,
	getProfilesLength,
} from '@/entities/profile';

import { profilesCountLimit } from '../../model/constants/manageProfilesContants';
import { CreateProfileButton } from '../CreateProfileButton/CreateProfileButton';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { ProfilesCounter } from '../ProfilesCounter/ProfilesCounter';

import styles from './ManageProfilesPanel.module.css';

export const ManageProfilesPanel = () => {
	const { t } = useTranslation(i18Namespace.profile);

	const profiles = useAppSelector(getProfiles);
	const profilesCount = useAppSelector(getProfilesLength);

	const emptySpecializationProfile = useAppSelector(getEmptySpecializationProfile);

	const isEmptySpecialization = (id: number) => id === emptySpecializationProfile?.specializationId;
	const hasEmptySpecialization = Boolean(emptySpecializationProfile);

	const hasSubscription = useAppSelector(getHasSubscriptions);

	if (!profiles) {
		return null;
	}

	const isReachedProfilesLimit = profilesCount === profilesCountLimit;

	const createProfileDisabled =
		isReachedProfilesLimit || (hasSubscription && hasEmptySpecialization) || !hasSubscription;

	return (
		<Card className={styles.container}>
			<Flex align="center" justify="between" className={styles.mb}>
				<Text className={styles.title} variant="head3">
					{t(Profile.MANAGE_PROFILES_TITLE)}
				</Text>
				<ProfilesCounter
					isMember={hasSubscription}
					currentCount={profiles.length}
					maxCount={profilesCountLimit}
					isReachedLimit={isReachedProfilesLimit}
				/>
			</Flex>
			<Flex direction="column" gap="14" className={styles.mb}>
				{profiles.map((profile) => {
					return (
						<ProfileCard
							key={profile.id}
							isActive={Boolean(profile.isActive)}
							profileId={profile.id}
							specializationId={profile.specializationId}
							isEmptySpecialization={isEmptySpecialization(profile.specializationId)}
						/>
					);
				})}
			</Flex>
			<CreateProfileButton className={styles['create-button']} disabled={createProfileDisabled} />
		</Card>
	);
};
