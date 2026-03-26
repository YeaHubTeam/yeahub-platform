import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useCreateMultipleQuestionsMutation } from '../../api/createMultipleQuestionsApi';
import {
	CreateMultipleQuestionsBodyRequest,
	CreateMultipleQuestionsFormValues,
} from '../../model/types/createMultipleQuestionsTypes';

interface QuestionCreateMultipleFormHeaderProps {
	handleOpenGeneratedQuestionsWidget: () => void;
}

export const QuestionCreateMultipleFormHeader = ({
	handleOpenGeneratedQuestionsWidget,
}: QuestionCreateMultipleFormHeaderProps) => {
	const [createMultipleQuestionsMutation, { isLoading }] = useCreateMultipleQuestionsMutation();
	const { handleSubmit } = useFormContext<CreateMultipleQuestionsFormValues>();
	const { t } = useTranslation(i18Namespace.translation);

	const onCreateMultipleQuestions = async (data: CreateMultipleQuestionsFormValues) => {
		const body: CreateMultipleQuestionsBodyRequest = {
			questions: data.questions,
			specializationId: Number(data.specializationId),
		};

		await createMultipleQuestionsMutation(body);
		handleOpenGeneratedQuestionsWidget();
	};

	return (
		<Flex align="center" gap="8" justify="between">
			<BackButton />
			<Button disabled={isLoading} onClick={handleSubmit(onCreateMultipleQuestions)}>
				{t(Translation.SAVE, { ns: 'translation' })}
			</Button>
		</Flex>
	);
};
