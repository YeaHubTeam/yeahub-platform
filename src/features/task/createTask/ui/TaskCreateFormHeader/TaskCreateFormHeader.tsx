import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import { useCreateTaskMutation } from '../../api/createTaskApi';
import { CreateTaskFormValues } from '../../model/types/taskCreateTypes';

interface TaskCreateFormHeaderProps {
	onSuccess: () => void;
}

export const TaskCreateFormHeader = ({ onSuccess }: TaskCreateFormHeaderProps) => {
	const [createTaskMutation, { isLoading }] = useCreateTaskMutation();
	const { handleSubmit } = useFormContext<CreateTaskFormValues>();
	const { t } = useTranslation(i18Namespace.translation);

	const onCreateTask = async (data: CreateTaskFormValues) => {
		try {
			await createTaskMutation(data).unwrap();
			onSuccess();
		} catch {
			return;
		}
	};

	return (
		<Flex align="center" gap="8" justify="between">
			<BackButton />
			<Flex gap="10" justify="between">
				<FormCancelButton disabled={isLoading} size="medium" />
				<Button disabled={isLoading} onClick={handleSubmit(onCreateTask)}>
					{t(Translation.SAVE)}
				</Button>
			</Flex>
		</Flex>
	);
};
