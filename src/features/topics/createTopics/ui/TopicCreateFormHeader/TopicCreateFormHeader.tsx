import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import { useCreateTopicMutation } from '../../api/createTopicApi';
import { CreateTopicFormValues } from '../../model/types/topicCreateTypes';

interface TopicCreateFormHeaderProps {
	onSuccess: () => void;
}

export const TopicCreateFormHeader = ({ onSuccess }: TopicCreateFormHeaderProps) => {
	const [createTopicMutation, { isLoading }] = useCreateTopicMutation();
	const { handleSubmit } = useFormContext<CreateTopicFormValues>();
	const { t } = useTranslation([i18Namespace.specialization, i18Namespace.translation]);

	const onCreateTopic = async (data: CreateTopicFormValues) => {
		try {
			await createTopicMutation(data).unwrap();
			onSuccess();
		} catch {
			return;
		}
	};

	return (
		<Flex align="center" gap="8" justify="between">
			<BackButton />
			<Flex gap="10" justify="between">
				<FormCancelButton disabled={isLoading} />
				<Button disabled={isLoading} onClick={handleSubmit(onCreateTopic)}>
					{t(Translation.SAVE, { ns: 'translation' })}
				</Button>
			</Flex>
		</Flex>
	);
};
