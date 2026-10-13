import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { FeatureFlagFormSkeleton } from '@/entities/featureFlag';

import { FeatureFlagCreateFormHeaderSkeleton } from '../FeatureFlagCreateFormHeader/FeatureFlagCreateFormHeader.skeleton';

import styles from './FeatureFlagCreateForm.module.css';

export const FeatureFlagCreateFormSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<FeatureFlagCreateFormHeaderSkeleton />
			<CardSkeleton className={styles.content}>
				<FeatureFlagFormSkeleton />
			</CardSkeleton>
		</Flex>
	);
};
