import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { SpecializationFormSkeleton } from '@/entities/specialization';

import { SpecializationCreateFormHeaderSkeleton } from '../SpecializationCreateFormHeader/SpecializationCreateFormHeader.skeleton';

import styles from './SpecializationCreateForm.module.css';

export const SpecializationCreateFormSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<SpecializationCreateFormHeaderSkeleton />

			<CardSkeleton className={styles.content}>
				<SpecializationFormSkeleton />
			</CardSkeleton>
		</Flex>
	);
};
