import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { TopicFormSkeleton } from '@/entities/topic';

import { TopicEditFormHeaderSkeleton } from '../TopicEditFormHeader/TopicEditFormHeader.skeleton';

import styles from './TopicEditForm.module.css';

export const TopicEditFormSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<TopicEditFormHeaderSkeleton />

			<Card className={styles.content}>
				<TopicFormSkeleton />
			</Card>
		</Flex>
	);
};
