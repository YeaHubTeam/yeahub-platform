import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { Skeleton } from '@/shared/ui/Skeleton';

import { ProgrammingLanguageSelectSkeleton } from '@/entities/programmingLanguage/@x/task';

import styles from './TaskStructuresField.module.css';

export const TaskStructuresFieldSkeleton = () => {
	return (
		<Flex direction="column" gap="16">
			<CardSkeleton withOutsideShadow withBorder>
				<Flex gap="16" direction="column">
					<FormFieldSkeleton>
						<Skeleton width={48} height={24} borderRadius={12} />
					</FormFieldSkeleton>

					<FormFieldSkeleton>
						<ProgrammingLanguageSelectSkeleton />
					</FormFieldSkeleton>

					{Array.from({ length: 3 }).map((_, index) => (
						<FormFieldSkeleton key={index} direction="column">
							<Skeleton className={styles.editor} borderRadius={8} />
						</FormFieldSkeleton>
					))}
				</Flex>
			</CardSkeleton>

			<ButtonSkeleton className={styles.add} width={180} />
		</Flex>
	);
};
