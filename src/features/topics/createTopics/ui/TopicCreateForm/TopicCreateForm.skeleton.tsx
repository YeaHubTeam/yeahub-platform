import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { TopicFormSkeleton } from '@/entities/topic';

import { TopicCreateFormHeaderSkeleton } from '../TopicCreateFormHeader/TopicCreateFormHeader.skeleton';

import styles from './TopicCreateForm.module.css';

export const TopicCreateFormSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<TopicCreateFormHeaderSkeleton />
			<CardSkeleton className={styles.content}>
				<TopicFormSkeleton />
			</CardSkeleton>
		</Flex>
	);
};
