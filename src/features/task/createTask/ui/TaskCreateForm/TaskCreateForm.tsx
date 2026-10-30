import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';

import { useFormPersist } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { TaskForm } from '@/entities/task';

import { taskCreateSchema } from '../../lib/validation/taskCreateSchema';
import { CreateTaskFormValues } from '../../model/types/taskCreateTypes';
import { TaskCreateFormHeader } from '../TaskCreateFormHeader/TaskCreateFormHeader';

import styles from './TaskCreateForm.module.css';

const defaultValues: DefaultValues<CreateTaskFormValues> = {
	name: '',
	description: '',
	categoryCodes: [],
	constraints: [],
	taskStructures: [
		{ languageId: 0, solutionStub: '', testFixture: '', preloadedCode: '', isActive: true },
	],
	difficulty: 3,
	subscriptionLevel: 'free',
};

export const TaskCreateForm = () => {
	const taskMethods = useForm<CreateTaskFormValues>({
		resolver: yupResolver(taskCreateSchema),
		mode: 'onTouched',
		defaultValues,
	});

	const {
		formState: { isDirty, isSubmitting, isSubmitted },
		reset,
		watch,
	} = taskMethods;

	const { clearFormDraft } = useFormPersist<CreateTaskFormValues>({ watch, reset, defaultValues });

	return (
		<>
			<FormProvider {...taskMethods}>
				<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
					<Flex componentType="main" direction="column" gap="24">
						<TaskCreateFormHeader onSuccess={clearFormDraft} />
						<Card className={styles.content}>
							<TaskForm />
						</Card>
					</Flex>
				</LeavingPageBlocker>
			</FormProvider>
		</>
	);
};
