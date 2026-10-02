import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';

import { useFormPersist } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { TopicForm } from '@/entities/topic';

import { topicCreateSchema } from '../../lib/validation/topicCreateSchema';
import { CreateTopicFormValues } from '../../model/types/topicCreateTypes';
import { TopicCreateFormHeader } from '../TopicCreateFormHeader/TopicCreateFormHeader';

import styles from './TopicCreateForm.module.css';

const defaultValues: DefaultValues<CreateTopicFormValues> = {
	title: '',
	description: '',
};

export const TopicCreateForm = () => {
	const methods = useForm<CreateTopicFormValues>({
		resolver: yupResolver(topicCreateSchema),
		mode: 'onTouched',
		defaultValues,
	});

	const {
		formState: { isDirty, isSubmitted, isSubmitting },
		reset,
		watch,
	} = methods;

	const { clearFormDraft } = useFormPersist<CreateTopicFormValues>({
		watch,
		reset,
		defaultValues,
	});

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<TopicCreateFormHeader onSuccess={clearFormDraft} />
					<Card className={styles.content}>
						<TopicForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
