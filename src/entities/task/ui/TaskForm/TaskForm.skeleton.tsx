import { DropdownSkeleton } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { InputSkeleton } from '@/shared/ui/Input';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import { TaskStructuresFieldSkeleton } from '../TaskStructuresField/TaskStructuresField.skeleton';

import styles from './TaskForm.module.css';

export const TaskFormSkeleton = () => {
	return (
		<>
			<TextSkeleton variant="body5-strong" width={260} className={styles['main-title']} />

			<Flex direction="column" gap="60">
				<FormFieldSkeleton>
					<FormControlSkeleton className={styles['input-form']}>
						<InputSkeleton />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton direction="column">
					<Skeleton className={styles.editor} borderRadius={16} />
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<FormControlSkeleton className={styles.select}>
						<DropdownSkeleton />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<FormControlSkeleton className={styles.select}>
						<Flex gap="60">
							<Skeleton width={120} height={24} borderRadius={12} />
							<Skeleton width={150} height={24} borderRadius={12} />
						</Flex>
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<FormControlSkeleton className={styles.difficulty}>
						<Skeleton width={360} height={32} borderRadius={16} />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton direction="column">
					<FormControlSkeleton>
						<TaskStructuresFieldSkeleton />
					</FormControlSkeleton>
				</FormFieldSkeleton>
			</Flex>
		</>
	);
};
