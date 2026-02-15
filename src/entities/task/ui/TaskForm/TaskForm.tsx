import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { Radio } from '@/shared/ui/Radio';
import { Range } from '@/shared/ui/Range';
import { Text } from '@/shared/ui/Text';
import { TextEditor } from '@/shared/ui/TextEditor';

import { CreateOrEditTaskFormValues } from '../../model/types/task';
import { TaskCategorySelect } from '../TaskCategorySelect/TaskCategorySelect';
import { TaskConstraintsField } from '../TaskConstraintsField/TaskConstraintsField';
import { TaskStructuresField } from '../TaskStructuresField/TaskStructuresField';

import styles from './TaskForm.module.css';

interface TaskFormProps {
	isEdit?: boolean;
}

export const TaskForm = ({ isEdit }: TaskFormProps) => {
	const { t } = useTranslation(i18Namespace.task);

	const { control } = useFormContext<CreateOrEditTaskFormValues>();

	return (
		<>
			<Text variant="body5-strong" isMainTitle className={styles['main-title']}>
				{isEdit ? t(Tasks.EDIT_PAGE_TITLE) : t(Tasks.CREATE_PAGE_TITLE)}
			</Text>
			<Flex direction="column" gap="60">
				<FormField description={t(Tasks.NAME_SUBTITLE)} label={t(Tasks.NAME_TITLE)}>
					<FormControl name="name" control={control} className={`${styles['input-form']}`}>
						{(register, hasError) => <Input {...register} error={hasError} />}
					</FormControl>
				</FormField>
				<FormField
					direction="column"
					description={t(Tasks.DESCRIPTION_SUBTITLE)}
					label={t(Tasks.DESCRIPTION_TITLE)}
				>
					<FormControl name="description" control={control}>
						{(field) => (
							<TextEditor
								id="description"
								isInline
								// className={styles.input}
								data={field.value}
								{...field}
							/>
						)}
					</FormControl>
				</FormField>
				<FormField description={t(Tasks.CATEGORY_SUBTITLE)} label={t(Tasks.CATEGORY_TITLE)}>
					<FormControl className={styles.select} name="categoryCode" control={control}>
						{({ onChange, value }) => <TaskCategorySelect onChange={onChange} value={value} />}
					</FormControl>
				</FormField>
				<FormField
					description={t(Tasks.SUBSCRIPTION_LEVEL_SUBTITLE)}
					label={t(Tasks.SUBSCRIPTION_LEVEL_TITLE)}
				>
					<FormControl className={styles.select} name="subscriptionLevel" control={control}>
						{({ onChange, value }) => (
							<Flex gap="60">
								<Radio
									label={t(Tasks.SUBSCRIPTION_LEVEL_FREE)}
									checked={value === 'free'}
									onChange={() => onChange('free')}
								/>
								<Radio
									label={t(Tasks.SUBSCRIPTION_LEVEL_PREMIUM)}
									checked={value === 'premium'}
									onChange={() => onChange('premium')}
								/>
							</Flex>
						)}
					</FormControl>
				</FormField>
				<FormField
					description={t(Tasks.DESCRIPTION_SUBTITLE)}
					label={t(Tasks.DIFFICULTY_TITLE_SHORT)}
				>
					<FormControl name="difficulty" control={control} className={styles.difficulty}>
						{(field) => <Range min={1} max={5} step={1} hasScale {...field} />}
					</FormControl>
				</FormField>
				<FormField description={t(Tasks.MEMORY_LIMIT_SUBTITLE)} label={t(Tasks.MEMORY_LIMIT_TITLE)}>
					<FormControl name="memoryLimit" control={control} className={`${styles['input-form']}`}>
						{(register, hasError) => <Input {...register} error={hasError} type="number" min={0} />}
					</FormControl>
				</FormField>
				<FormField description={t(Tasks.TIME_LIMIT_SUBTITLE)} label={t(Tasks.TIME_LIMIT_TITLE)}>
					<FormControl name="timeLimit" control={control} className={`${styles['input-form']}`}>
						{(register, hasError) => <Input {...register} error={hasError} type="number" min={0} />}
					</FormControl>
				</FormField>
				<FormField description={t(Tasks.CONSTRAINTS_SUBTITLE)} label={t(Tasks.CONSTRAINTS_TITLE)}>
					<FormControl name="constraints" control={control} className={`${styles['input-form']}`}>
						{(_, hasError) => <TaskConstraintsField hasError={hasError} />}
					</FormControl>
				</FormField>
				<FormField
					description={t(Tasks.TASK_STRUCTURES_SUBTITLE)}
					label={t(Tasks.TASK_STRUCTURES_TITLE)}
					direction="column"
				>
					<FormControl name="taskStructures" control={control}>
						{() => <TaskStructuresField />}
					</FormControl>
				</FormField>
			</Flex>
		</>
	);
};
