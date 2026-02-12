import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { TaskForm } from '@/entities/task';

import { taskCreateSchema } from '../../lib/validation/taskCreateSchema';
import { CreateTaskFormValues } from '../../model/types/taskCreateTypes';
import { TaskCreateFormHeader } from '../TaskCreateFormHeader/TaskCreateFormHeader';

import styles from './TaskCreateForm.module.css';

export const TaskCreateForm = () => {
	const taskMethods = useForm<CreateTaskFormValues>({
		resolver: yupResolver(taskCreateSchema),
		mode: 'onTouched',
		defaultValues: {
			constraints: [''],
			taskStructures: [{ languageId: 0, solutionStub: '', testFixture: '', isActive: true }],
			difficulty: 3,
		},
	});

	const { isDirty, isSubmitting, isSubmitted } = taskMethods.formState;

	return (
		<>
			<FormProvider {...taskMethods}>
				<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
					<Flex componentType="main" direction="column" gap="24">
						<TaskCreateFormHeader />
						<Card className={styles.content}>
							<TaskForm />
						</Card>
					</Flex>
				</LeavingPageBlocker>
			</FormProvider>
		</>
	);
};
