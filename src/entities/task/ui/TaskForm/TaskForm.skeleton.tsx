import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { InputSkeleton } from '@/shared/ui/Input';
import { RadioSkeleton } from '@/shared/ui/Radio';
import { RangeSkeleton } from '@/shared/ui/Range';
import { TextSkeleton } from '@/shared/ui/Text';
import { TextEditorSkeleton } from '@/shared/ui/TextEditor';

import { TaskCategorySelectSkeleton } from '../TaskCategorySelect/TaskCategorySelect.skeleton';
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
					<TextEditorSkeleton />
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<FormControlSkeleton className={styles.select}>
						<TaskCategorySelectSkeleton />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<FormControlSkeleton className={styles.select}>
						<Flex gap="60">
							<RadioSkeleton />
							<RadioSkeleton />
						</Flex>
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<FormControlSkeleton className={styles.difficulty}>
						<RangeSkeleton />
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
