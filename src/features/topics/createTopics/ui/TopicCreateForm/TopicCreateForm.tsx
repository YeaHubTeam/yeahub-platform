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

const defaultValues = {
	title: '',
	description: '',
} satisfies DefaultValues<CreateTopicFormValues>;

export const TopicCreateForm = () => {
	const methods = useForm<CreateTopicFormValues>({
		resolver: yupResolver(topicCreateSchema),
		mode: 'onTouched',
		defaultValues,
	});

	const { clearFormDraft } = useFormPersist<CreateTopicFormValues>({
		watch: methods.watch,
		reset: methods.reset,
		defaultValues,
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

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
