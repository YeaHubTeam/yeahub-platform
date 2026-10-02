import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useCreateTestQuestionMutation } from '../../api/createTestQuestionApi';
import { CreateTestQuestionFormValues } from '../../model/types/testQuestionCreateTypes';

export const TestQuestionCreateFormHeader = () => {
	const { handleSubmit } = useFormContext<CreateTestQuestionFormValues>();
	const { t } = useTranslation(i18Namespace.translation);
	const [createTestQuestionMutation, { isLoading }] = useCreateTestQuestionMutation();

	const onCreateTestQuestion = async (data: CreateTestQuestionFormValues) => {
		await createTestQuestionMutation(data);
	};

	return (
		<Flex align="center" gap="8" justify="between">
			<BackButton />
			<Button disabled={isLoading} onClick={handleSubmit(onCreateTestQuestion)}>
				{t(Translation.SAVE, { ns: 'translation' })}
			</Button>
		</Flex>
	);
};
