import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import { useCreateQuestionMutation } from '../../api/createQuestionApi';
import { CreateQuestionFormValues } from '../../model/types/questionCreateTypes';

export const QuestionCreateFormHeader = () => {
	const [createQuestionMutation, { isLoading }] = useCreateQuestionMutation();
	const { handleSubmit } = useFormContext<CreateQuestionFormValues>();
	const { t } = useTranslation(i18Namespace.translation);

	const onCreateQuestion = async (data: CreateQuestionFormValues) => {
		await createQuestionMutation(data);
	};

	return (
		<Flex align="center" gap="8" justify="between">
			<BackButton />
			<Flex gap="10" justify="between">
				<FormCancelButton disabled={isLoading} />
				<Button disabled={isLoading} onClick={handleSubmit(onCreateQuestion)}>
					{t(Translation.SAVE, { ns: 'translation' })}
				</Button>
			</Flex>
		</Flex>
	);
};
