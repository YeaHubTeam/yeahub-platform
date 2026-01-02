import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useCreateTopicMutation } from '../../api/createTopicApi';
import { CreateTopicFormValues } from '../../model/types/topicCreateTypes';

export const TopicCreateFormHeader = () => {
	const [createTopicMutation, { isLoading }] = useCreateTopicMutation();
	const { handleSubmit } = useFormContext<CreateTopicFormValues>();
	const { t } = useTranslation([i18Namespace.specialization, i18Namespace.translation]);

	const onCreateTopic = async (data: CreateTopicFormValues) => {
		await createTopicMutation(data);
	};

	return (
		<Flex align="center" gap="8" justify="between">
			<BackButton />
			<Button disabled={isLoading} onClick={handleSubmit(onCreateTopic)}>
				{t(Translation.SAVE, { ns: 'translation' })}
			</Button>
		</Flex>
	);
};
