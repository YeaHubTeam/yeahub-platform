import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { FeatureFlagFormSkeleton } from '@/entities/featureFlag';

import { FeatureFlagEditFormHeaderSkeleton } from '../FeatureFlagEditFormHeader/FeatureFlagEditFormHeader.skeleton';

import styles from './FeatureFlagEditForm.module.css';

export const FeatureFlagEditFormSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<FeatureFlagEditFormHeaderSkeleton />
			<CardSkeleton className={styles.content}>
				<FeatureFlagFormSkeleton />
			</CardSkeleton>
		</Flex>
	);
};
