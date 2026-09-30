import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { QuestionFormSkeleton } from '@/entities/question';

import { QuestionEditFormHeaderSkeleton } from '../QuestionEditFormHeader/QuestionEditFormHeaderSkeleton';

export const QuestionEditFormSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<QuestionEditFormHeaderSkeleton />

			<CardSkeleton>
				<QuestionFormSkeleton />
			</CardSkeleton>
		</Flex>
	);
};
