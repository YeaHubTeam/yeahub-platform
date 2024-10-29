import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BackButton } from '@/shared/ui/BackButton';
import { Flex } from '@/shared/ui/Flex';

import { useCreateQuestionMutation } from '../../api/createQuestionApi';
import {
	QuestionCreateFormValues,
	QuestionCreateSchema,
} from '../../model/types/questionCreatePageTypes';

export const QuestionCreateFormHeader = () => {
	const [createQuestionMutation, { isLoading, isSuccess }] = useCreateQuestionMutation();
	const { handleSubmit } = useFormContext<QuestionCreateSchema>();
	const navigate = useNavigate();
	const { t } = useI18nHelpers(i18Namespace.translation);

	const onCreateQuestion = async (data: QuestionCreateFormValues) => {
		await createQuestionMutation(data);
	};

	useEffect(() => {
		if (isSuccess) {
			navigate('/admin/questions');
		}
	}, [isSuccess, navigate]);

	return (
		<Flex align="center" gap="8" justify={'between'}>
			<BackButton />
			<Button disabled={isLoading} onClick={handleSubmit(onCreateQuestion)}>
				{t(Translation.SAVE, { ns: 'translation' })}
			</Button>
		</Flex>
	);
};
