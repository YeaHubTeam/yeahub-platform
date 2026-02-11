import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { Task, TaskForm } from '@/entities/task';

import { useEditTaskMutation } from '../../api/editTaskApi';
import { taskEditSchema } from '../../lib/validation/taskEditSchema';
import { EditTaskFormValues } from '../../model/types/taskEditTypes';
import { TaskEditFormHeader } from '../TaskEditFormHeader/TaskEditFormHeader';

import styles from './TaskEditForm.module.css';

interface TaskEditFormProps {
	task: Task;
}

export const TaskEditForm = ({ task }: TaskEditFormProps) => {
	const {
		name,
		description,
		taskStructures,
		difficulty,
		constraints,
		mainCategory,
		id,
		timeLimit,
		memoryLimit,
	} = task;

	const methods = useForm<EditTaskFormValues>({
		resolver: yupResolver(taskEditSchema),
		mode: 'onTouched',
		defaultValues: {
			name,
			description,
			taskStructures,
			difficulty,
			constraints,
			categoryCode: mainCategory,
			memoryLimit,
			timeLimit,
			id,
		},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	const [editTopicMutation] = useEditTaskMutation();

	const onEditTopic = async (data: EditTaskFormValues) => {
		editTopicMutation(data);
	};

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<TaskEditFormHeader onSubmit={onEditTopic} />
					<Card className={styles.content}>
						<TaskForm isEdit />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
