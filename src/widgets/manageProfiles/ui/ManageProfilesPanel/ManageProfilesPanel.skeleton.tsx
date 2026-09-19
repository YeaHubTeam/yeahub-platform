import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { CreateProfileButtonSkeleton } from '@/features/profile/createProfile';

import { ManageProfilesHeaderSkeleton } from '../ManageProfilesHeader/ManageProfilesHeader.skeleton';
import { ProfilesListSkeleton } from '../ProfilesList/ProfilesList.skeleton';
import { SwitchSpecializationInfoButtonSkeleton } from '../SwitchSpecializationInfoButton/SwitchSpecializationInfoButton.skeleton';

import styles from './ManageProfilesPanel.module.css';

export const ManageProfilesPanelSkeleton = () => {
	return (
		<CardSkeleton className={styles.container}>
			<ManageProfilesHeaderSkeleton className={styles.mb} />
			<ProfilesListSkeleton className={styles.mb} />
			<div>
				<Flex direction="row" justify="between" align="center" gap="20" wrap="wrap">
					<SwitchSpecializationInfoButtonSkeleton />
					<CreateProfileButtonSkeleton className={styles['create-button']} />
				</Flex>
			</div>
		</CardSkeleton>
	);
};
