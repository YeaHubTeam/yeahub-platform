import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { QuestionFormSkeleton } from '@/entities/question';

import { QuestionCreateFormHeaderSkeleton } from '../QuestionCreateFormHeader/QuestionCreateFormHeader.skeleton';

import styles from './QuestionCreateForm.module.css';

export const QuestionCreateFormSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<QuestionCreateFormHeaderSkeleton />
			<Card className={styles.content}>
				<QuestionFormSkeleton />
			</Card>
		</Flex>
	);
};
