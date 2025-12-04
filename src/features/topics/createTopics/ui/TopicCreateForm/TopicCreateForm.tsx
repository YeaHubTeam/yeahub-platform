import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { TopicForm } from '@/entities/topic';

import { topicCreateSchema } from '../../model/lib/validation/topicCreateSchema';
import { CreateTopicFormValues } from '../../model/types/topicCreateTypes';
import { TopicCreateFormHeader } from '../TopicCreateFormHeader/TopicCreateFormHeader';

import styles from './TopicCreateForm.module.css';

export const TopicCreateForm = () => {
	const methods = useForm<CreateTopicFormValues>({
		resolver: yupResolver(topicCreateSchema),
		mode: 'onTouched',
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<TopicCreateFormHeader />
					<Card className={styles.content}>
						<TopicForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
