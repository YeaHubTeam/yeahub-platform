import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { Topic, TopicForm } from '@/entities/topic/index';

import { useEditTopicMutation } from '../../api/editTopicApi';
import { topicEditSchema } from '../../lib/validation/topicEditSchema';
import { EditTopicFormValues } from '../../model/types/topicEditTypes';
import { TopicEditFormHeader } from '../TopicEditFormHeader/TopicEditFormHeader';

import styles from './TopicEditForm.module.css';

interface TopicEditFormProps {
	topic: Topic;
}

export const TopicEditForm = ({ topic }: TopicEditFormProps) => {
	const { title, skill, description, ...formattedTopics } = topic;

	const methods = useForm<EditTopicFormValues>({
		resolver: yupResolver(topicEditSchema),
		mode: 'onTouched',
		defaultValues: {
			...formattedTopics,
			title,
			skillId: skill.id,
			description: description,
		},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	const [editTopicMutation] = useEditTopicMutation();

	const onEditTopic = async (data: EditTopicFormValues) => {
		editTopicMutation(data);
	};

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<TopicEditFormHeader onSubmit={onEditTopic} />
					<Card className={styles.content}>
						<TopicForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
