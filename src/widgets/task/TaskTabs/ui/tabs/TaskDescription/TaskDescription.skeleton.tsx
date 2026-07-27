import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';
import { TextHtmlSkeleton } from '@/shared/ui/TextHtml';

import { CompanyCompactListSkeleton } from '@/entities/company';
import { ProgrammingLanguageListSkeleton } from '@/entities/programmingLanguage';
import {
	TaskCategoryChipSkeleton,
	TaskDifficultyChipSkeleton,
	TaskStatusChipSkeleton,
} from '@/entities/task';

import styles from './TaskDescription.module.css';

export const TaskDescriptionSkeleton = () => {
	return (
		<Flex direction="column" gap="20">
			<TextSkeleton variant="body6" width="100%" />

			<Flex gap="10" wrap="wrap">
				<TaskStatusChipSkeleton size="medium" />
				<TaskDifficultyChipSkeleton />
				<ProgrammingLanguageListSkeleton />
				<TaskCategoryChipSkeleton size="medium" />
				<CompanyCompactListSkeleton />
			</Flex>

			<TextHtmlSkeleton className={styles['texthtml-skeleton']} />
		</Flex>
	);
};
