import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useCreateTaskMutation } from '../../api/createTaskApi';
import { CreateTaskFormValues } from '../../model/types/taskCreateTypes';

export const TaskCreateFormHeader = () => {
	const [createTaskMutation, { isLoading }] = useCreateTaskMutation();
	const { handleSubmit } = useFormContext<CreateTaskFormValues>();
	const { t } = useTranslation(i18Namespace.translation);

	const onCreateTask = async (data: CreateTaskFormValues) => {
		await createTaskMutation(data);
	};

	return (
		<Flex align="center" gap="8" justify="between">
			<BackButton />
			<Button disabled={isLoading} onClick={handleSubmit(onCreateTask)}>
				{t(Translation.SAVE)}
			</Button>
		</Flex>
	);
};
